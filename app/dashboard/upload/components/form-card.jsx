'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { extractComplaints, readJsonFile } from '@/lib/utils';
import { sendAudio, sendComplaints, sendImage } from '@/lib/http';
import { storeComplaints as storeToDb } from '../../../../lib/http';
import Link from 'next/link';

export function FormCard() {
  const [dataType, setDataType] = useState('json');
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [summaries, setSummaries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSummaries([]);
    try {
      if (dataType === 'text') {
        try {
          const summaries = await sendComplaints({ complaints: [text] });
          setSummaries([...summaries]);
        } catch (error) {
          console.error('Error sending text:', error);
          setError('An error occurred during submission.');
        }
        setIsSubmitting(false);
      } else if (file) {
        console.log('File:', file);
        if (dataType === 'json') {
          if (file.type !== 'application/json') {
            setError('Invalid file type');
            setIsSubmitting(false);
            return;
          }

          try {
            const rawData = await readJsonFile(file);
            const complaints = extractComplaints(rawData);
            const summaries = await sendComplaints({ complaints });
            setSummaries([...summaries]);

            await storeToDb(summaries);
          } catch (error) {
            console.log('Error parsing JSON:', error);
          }

          setIsSubmitting(false);
        } else if (dataType === 'video') {
          if (file.type !== 'video/mp4' && file.type !== 'video/mpeg') {
            setError('Invalid file type');
            setIsSubmitting(false);
            return;
          }
          console.log(`Correct file type (${file.type})`);
        } else if (dataType === 'image') {
          if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            setError('Invalid file type');
            setIsSubmitting(false);
            return;
          }
          try {
            const summaries = await sendImage(file);
            setSummaries([...summaries]);
            console.log(summaries);
            await storeToDb(summaries);
            setIsSubmitting(false);
          } catch (error) {
            console.log('Error parsing image:', error);
            setError('An error occurred during submission.');
            setIsSubmitting(false);
          }
        } else if (dataType === 'audio') {
          if (file.type !== 'audio/mpeg' && file.type !== 'audio/wav') {
            setError('Invalid file type');
            setIsSubmitting(false);
            return;
          }
          try {
            const response = await sendAudio(file);
            const audioTranscript = response.transcript.text;
            const summaries = await sendComplaints({
              complaints: [audioTranscript],
            });
            setSummaries([...summaries]);
            console.log(summaries);

            await storeToDb(summaries); // Store complaints to database
            setIsSubmitting(false);
          } catch (error) {
            console.error('Error sending audio:', error);
            setError('An error occurred during submission.');
            setIsSubmitting(false);
          }
        }
      } else {
        console.log('No file selected');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      setError('An error occurred during submission.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-4 md:pt-8 flex flex-col items-center">
      <Card className="w-[95%] md:w-[40rem]">
        <CardHeader>
          <CardTitle>Upload data</CardTitle>
          <CardDescription>Upload customer complaint data</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 grid gap-2">
              <Label htmlFor="area">Data type</Label>
              <Select
                defaultValue="json"
                onValueChange={(value) => setDataType(value)}
              >
                <SelectTrigger id="area">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>

                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {dataType !== 'text' ? (
            <div className="grid gap-2">
              <Label htmlFor="file">File</Label>
              <Input id="file" type="file" onChange={handleFileChange} />
            </div>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="description">Complaint Text</Label>
              <Textarea
                id="description"
                placeholder="Please include all information relevant to your issue."
                className="h-32"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter className="justify-between space-x-2">
          <Link href="/dashboard">
            <Button variant="ghost">Cancel</Button>
          </Link>
          <Button disabled={isSubmitting} onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
      {/* TO BE DELETED */}
      {summaries.map((summary, index) => (
        <Card key={index} className="w-[95%] md:w-[40rem]">
          <CardHeader>
            <CardTitle>{summary.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{summary.insight}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
