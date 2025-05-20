"use client";

import { useState, ChangeEvent } from "react";
import { UploadCloud, MessageCircle, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createAuthClient } from "better-auth/client";
import { useRouter } from "next/navigation";
import supabase from "@/lib/superbase"; // Import the Supabase client from your lib file

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const router = useRouter(); // Initialized useRouter
  const authClient = createAuthClient(); // Initialize auth client

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

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileName(null);
  };

  const handleTalkClick = async () => {
    if (selectedFile) {

      // Get current user session
      const { data: session, error: sessionError } = await authClient.getSession();

      if (sessionError) {
        console.error('Error getting session:', sessionError);
        alert('Error getting user session. Please try again.');
        return;
      }

      if (session && session.user) {
        try {
          const { data, error } = await supabase
            .from('talk_sessions')
            .insert([
              { user_id: session.user.id, pdf_name: selectedFile.name },
            ]);

          if (error) {
            console.error('Error inserting data into Supabase:', error);
            // Handle error appropriately, e.g., show a toast notification
            alert('Error saving session data.');
            return;
          }

          console.log('Data inserted into Supabase:', data);
          // Proceed with Vapi AI integration here
        } catch (error) {
          console.error('Error interacting with Supabase:', error);
          alert('An unexpected error occurred while saving session data.');
        }
      } else {
        // Handle case where user is not available or session is null
        alert('User not authenticated or session not found. Please sign in.');
        router.push('/auth');
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth"); // Redirect to auth page after sign-out
          },
        },
      });
    } catch (error) {
      console.error("Sign-out error:", error);
      // Handle error appropriately
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 font-sans">
      <Button variant="outline" onClick={handleSignOut} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <LogOut className="h-5 w-5 mr-2" />
        Logout
      </Button>

      <header className="mb-12 w-full max-w-2xl flex flex-col items-center text-center pt-8 sm:pt-12">
        <div>
          <h1 className="text-5xl font-bold mb-3">DocTalk</h1>
          <p className="text-xl text-muted-foreground">
            Upload your PDF and start a conversation.
          </p>
        </div>
      </header>

      <main className="w-full max-w-2xl bg-card text-card-foreground shadow-2xl rounded-xl p-8">
        <div className="flex flex-col items-center gap-6"> {/* Adjusted gap from gap-8 to gap-6 */}
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
                <div className="mt-4 flex items-center gap-2 bg-accent p-2 rounded-md">
                  <p className="text-md text-primary">{fileName}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent label click-through
                      handleRemoveFile();
                    }}
                    className="h-6 w-6" // Smaller remove button
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
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
    </div>
  );
}
