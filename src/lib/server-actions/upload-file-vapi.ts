"use server"

import { VapiClient } from "@vapi-ai/server-sdk";
import * as fs from "fs";

const client = new VapiClient({ token: process.env.VAPI_PRIVATE_KEY! });

const uploadFile = async (file: fs.ReadStream) => {
    try {
        const response = await client.files.create(file);
        return response;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("File upload failed");
    }
}

export { uploadFile }