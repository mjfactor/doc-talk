import Vapi from "@vapi-ai/web";

// Check if the API key is available
if (!process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
    console.error("VAPI Public Key is missing. Make sure NEXT_PUBLIC_VAPI_PUBLIC_KEY is set in your .env.local file.");
}

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "");