// Import necessary libraries
const {VertexAI} = require('@google-cloud/vertexai');
const fs = require('fs');
require('dotenv').config();
const path = require('path');

// Set the path to your service account key file
const credentialsPath = path.join(__dirname, 'principal-lane-423410-p3-47760941546b.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

// Check if GOOGLE_APPLICATION_CREDENTIALS is set and the file exists
console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

fs.access(credentialsPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`Error: The service account key file at ${credentialsPath} does not exist.`);
    process.exit(1);
  } else {
    console.log(`The service account key file at ${credentialsPath} exists.`);

    // Initialize VertexAI and make the request
    async function createNonStreamingMultipartContent(
      projectId = 'principal-lane-423410-p3',
      location = 'us-central1',
      model = 'gemini-1.0-pro-vision-001',
      image = 'gs://generativeai-downloads/images/scones.jpg',
      mimeType = 'image/jpeg'
    ) {
      const vertexAI = new VertexAI({ project: projectId, location: location });
      const generativeVisionModel = vertexAI.getGenerativeModel({ model: model });

      const filePart = {
        fileData: {
          fileUri: image,
          mimeType: mimeType,
        },
      };

      const textPart = {
        text: 'What is shown in this image?',
      };

      const request = {
        contents: [{ role: 'user', parts: [filePart, textPart] }],
      };

      console.log('Prompt Text:');
      console.log(request.contents[0].parts[1].text);
      console.log('Streaming Response Text:');

      const responseStream = await generativeVisionModel.generateContentStream(request);
      for await (const item of responseStream.stream) {
        process.stdout.write(item.candidates[0].content.parts[0].text);
      }
    }

    createNonStreamingMultipartContent().catch(err => {
      console.error(err.message);
      process.exitCode = 1;
    });
  }
});
