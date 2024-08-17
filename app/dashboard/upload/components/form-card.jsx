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

export function FormCard() {
  const [dataType, setDataType] = useState('json');
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (dataType === 'text') {
      console.log('Text:', text);
    } else if (file) {
      console.log('File:', file);
      if (dataType === 'pdf') {
        if (file.type !== 'application/pdf') {
          setError('Invalid file type');
        } else {
          console.log(`Correct file type (${file.type})`);
        }
      } else if (dataType === 'json') {
        if (file.type !== 'application/json') {
          setError('Invalid file type');
        } else {
          console.log(`Correct file type (${file.type})`);
        }
      } else if (dataType === 'video') {
        if (file.type !== 'video/mp4' && file.type !== 'video/mpeg') {
          setError('Invalid file type');
        } else {
          console.log(`Correct file type (${file.type})`);
        }
      } else if (dataType === 'image') {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
          setError('Invalid file type');
        } else {
          console.log(`Correct file type (${file.type})`);
        }
      } else if (dataType === 'audio') {
        if (file.type !== 'audio/mpeg' && file.type !== 'audio/wav') {
          setError('Invalid file type');
        } else {
          console.log(`Correct file type (${file.type})`);
        }
      }
    } else {
      console.log('No file selected');
    }
  };

  return (
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
                <SelectItem value="pdf">PDF</SelectItem>
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="ghost">Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
