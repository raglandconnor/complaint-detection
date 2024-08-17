const axios = require('axios');

// Set up the API key and audio URL
const apiKey = 'eb48ff1cff8d47c4ba8ecfe38853ae93';
const audioUrl = "C:\\Users\\ozari\\OneDrive\\Desktop\\coding\\xy.mp3";

// Define the AssemblyAI API endpoints
const transcriptEndpoint = 'https://api.assemblyai.com/v2/transcript';

// Function to transcribe audio using AssemblyAI
async function transcribeAudio(audioUrl) {
  try {
    // Request to start the transcription
    const response = await axios.post(
      transcriptEndpoint,
      { audio_url: audioUrl },
      {
        headers: {
          'authorization': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
    
    // Get the transcription ID from the response
    const transcriptId = response.data.id;
    
    // Poll for the transcription result
    let transcriptResult = null;
    while (!transcriptResult || transcriptResult.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before checking again
      const result = await axios.get(`${transcriptEndpoint}/${transcriptId}`, {
        headers: {
          'authorization': apiKey,
        },
      });
      transcriptResult = result.data;
    }

    // Output the transcribed text
    console.log(transcriptResult.text);

  } catch (error) {
    console.error('Error during transcription:', error.message);
  }
}

// Run the transcription function
transcribeAudio(audioUrl);
