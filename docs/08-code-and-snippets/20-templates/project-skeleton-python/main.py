# main.py

import os
from openai import OpenAI
from dotenv import load_dotenv
from typing import List, Dict

# Load environment variables from .env file
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sk-your-openai-api-key")
LOCAL_LLM_ENDPOINT = os.getenv("LOCAL_LLM_ENDPOINT", "http://localhost:11434/v1") # Default to Ollama

# Initialize the OpenAI client
# For local LLM servers, api_key can be a dummy value.
client = OpenAI(
    api_key=OPENAI_API_KEY,
    base_url=LOCAL_LLM_ENDPOINT,
)

def get_llm_response(user_message: str, system_message: str = "You are a helpful assistant.") -> str:
    """
    Sends a chat completion request to the configured LLM endpoint.
    """
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_message}
    ]

    try:
        response = client.chat.completions.create(
            model="llama3", # Model name. Use what's available on your local server or OpenAI.
            messages=messages,
            temperature=0.7,
            max_tokens=150,
            stream=False # Set to True for streaming responses
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error during LLM call: {e}")
        print("Please ensure your local LLM server is running and accessible at the specified endpoint,")
        print("and that the model (e.g., llama3) is available.")
        return "Error: Failed to get response from LLM."

if __name__ == "__main__":
    print("--- Python LLM Skeleton ---")
    print(f"Using LLM endpoint: {LOCAL_LLM_ENDPOINT}")

    # Example 1: Simple Question
    response_1 = get_llm_response("What is the capital of Canada?")
    print("\n--- Response 1 ---")
    print(response_1)

    # Example 2: With a specific system message
    response_2 = get_llm_response("Recommend a good book.", system_message="You are a librarian who loves fantasy novels.")
    print("\n--- Response 2 ---")
    print(response_2)
