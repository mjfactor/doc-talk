"use client";

import { useState, ChangeEvent } from "react";
// import Image from "next/image"; // No longer used directly, but kept for potential future use
import { UploadCloud, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button"; // Import Shadcn Button

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setFileName(file.name);
      } else {
        setSelectedFile(null);
        setFileName(null);
        // Consider using a Shadcn Toast component here for better UX
        alert("Please upload a PDF file.");
      }
    }
  };

  const handleTalkClick = () => {
    if (selectedFile) {
      // Placeholder for talk functionality
      // Consider using a Shadcn Toast component here
      alert(`Starting chat with ${selectedFile.name}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-3">DocTalk</h1>
        <p className="text-xl text-muted-foreground">
          Upload your PDF and start a conversation.
        </p>
      </header>

      <main className="w-full max-w-2xl bg-card text-card-foreground shadow-2xl rounded-xl p-8">
        <div className="flex flex-col items-center gap-8">
          <label
            htmlFor="pdf-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors duration-300 bg-card hover:bg-accent"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-12 h-12 mb-4 text-primary" />
              <p className="mb-2 text-lg text-card-foreground">
                <span className="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-sm text-muted-foreground">PDF only</p>
              {fileName && (
                <p className="mt-4 text-md text-primary">{fileName}</p>
              )}
            </div>
            <input
              id="pdf-upload"
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </label>

          {selectedFile && (
            <Button
              onClick={handleTalkClick}
              disabled={!selectedFile}
              size="lg" // Using Shadcn button size prop
              className="w-full sm:w-auto" // Keep responsive width
            >
              <MessageCircle className="w-5 h-5 mr-2" /> {/* Adjusted icon size and margin */}
              Talk to PDF
            </Button>
          )}
        </div>

        {/* Placeholder for chat interface - consider Shadcn Card or other layout components */}
        {/* <div className="mt-12 w-full h-96 bg-muted rounded-lg p-4">
          <p className="text-muted-foreground text-center">Chat interface will appear here...</p>
        </div> */}
      </main>

      <footer className="mt-12 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} DocTalk. All rights reserved.</p>
        <p className="mt-1">
          Powered by{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Next.js
          </a>{" "}
          &{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Tailwind CSS
          </a>
          {" "}
          &{" "}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Shadcn/UI
          </a>
        </p>
      </footer>
    </div>
  );
}
