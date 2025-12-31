// src/index.ts

import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-your-openai-api-key';
const LOCAL_LLM_ENDPOINT = process.env.LOCAL_LLM_ENDPOINT || 'http://localhost:11434/v1'; // Default to Ollama

// Initialize the OpenAI client
const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: LOCAL_LLM_ENDPOINT,
});

async function main() {
  console.log('--- Node.js LLM Skeleton ---');
  console.log(`Using LLM endpoint: ${LOCAL_LLM_ENDPOINT}`);

  try {
    const chatCompletion = await client.chat.completions.create({
      model: 'llama3', // Or gpt-3.5-turbo if using OpenAI API directly
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'What is the capital of Canada?' },
      ],
      temperature: 0.7,
      max_tokens: 100,
      stream: true, // Enable streaming for better UX
    });

    process.stdout.write('Assistant: ');
    for await (const chunk of chatCompletion) {
      process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }
    process.stdout.write('\n');
  } catch (error: any) {
    console.error('Error during LLM call:', error.message);
    if (error.status === 404) {
      console.error(
        'Check if your local LLM server is running and accessible at the specified endpoint,',
        'and if the model (e.g., llama3) is available.'
      );
    }
  }
}

main();
