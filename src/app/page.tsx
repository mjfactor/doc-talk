"use client";

import { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import { vapi } from "@/lib/vapi-ai";
import { Card, CardContent } from "@/components/ui/card";

// Define types for transcript messages
interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export default function InterviewPage() {
  const [isTalking, setIsTalking] = useState(false);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // VAPI Assistant ID
  const ASSISTANT_ID = "e27c1962-fde2-4491-8da3-f80807515b9c";

  // Scroll to bottom of transcript when it updates
  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcript]);

  // Set up event listeners for VAPI
  useEffect(() => {
    // Handler functions for events
    const handleSpeechStart = () => {
      console.log("Assistant started speaking");
      setIsAssistantSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log("Assistant stopped speaking");
      setIsAssistantSpeaking(false);
    };

    const handleCallStart = () => {
      console.log("Call started");
      setCallActive(true);
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setCallActive(false);
      setIsTalking(false);
    };

    // Handle transcript messages
    const handleMessage = (msg: any) => {
      console.log("Message received:", msg);
      if (msg.type === "transcript") {
        // Only add final transcripts to avoid flooding the UI with partial updates
        if (msg.transcriptType === "final") {
          setTranscript((prev) => [
            ...prev,
            {
              role: "user",
              text: msg.transcript,
              timestamp: new Date(),
            },
          ]);
        }
      } else if (msg.type === "assistant-message") {
        // Add assistant messages to the transcript
        setTranscript((prev) => [
          ...prev,
          {
            role: "assistant",
            text: msg.text,
            timestamp: new Date(),
          },
        ]);
      }
    };

    // Register event listeners
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("message", handleMessage);

    // Cleanup event listeners
    return () => {
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("message", handleMessage);
    };
  }, []);

  // Handle microphone click - toggles
  const handleTalk = async () => {
    setIsTalking((prevIsTalking) => {
      const newIsTalking = !prevIsTalking;

      if (newIsTalking) {
        // Start VAPI call
        console.log("Starting VAPI call with assistant ID:", ASSISTANT_ID);
        try {
          vapi.start(ASSISTANT_ID);
        } catch (error) {
          console.error("Error starting VAPI call:", error);
          setIsTalking(false);
        }
      } else {
        // Stop VAPI call
        console.log("Stopping VAPI call");
        try {
          vapi.stop();
        } catch (error) {
          console.error("Error stopping VAPI call:", error);
        }
      }

      return newIsTalking;
    });
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-black text-white p-4 md:p-6">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Talk with your Doc
        </h1>

        {/* Transcript area */}
        <div className="h-[400px] mb-6 overflow-y-auto rounded-xl bg-zinc-900 p-4 border border-zinc-800 shadow-lg">
          {transcript.length > 0 ? (
            <div className="space-y-4">
              {transcript.map((message, index) => (
                <Card
                  key={index}
                  className={`border-0 ${message.role === "assistant"
                      ? "bg-indigo-950/40 text-indigo-100"
                      : "bg-zinc-800/50 text-zinc-100"
                    }`}
                >
                  <CardContent className="p-3">
                    <div className="text-xs font-medium mb-1 opacity-70">
                      {message.role === "assistant" ? "Assistant" : "You"}
                    </div>
                    <div>{message.text}</div>
                  </CardContent>
                </Card>
              ))}
              <div ref={transcriptEndRef} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-zinc-500">
              {callActive
                ? "Waiting for conversation to begin..."
                : "Press the microphone button to start a conversation"}
            </div>
          )}
        </div>

        {/* Status message */}
        <p className="text-center mb-6 text-sm font-medium text-zinc-400">
          {isTalking
            ? isAssistantSpeaking
              ? "Assistant is speaking..."
              : "Listening... Click mic to stop."
            : "Press the microphone to start"}
        </p>

        {/* Mic button */}
        <div className="flex justify-center">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 cursor-pointer
                      transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
                      ${isTalking
                ? "bg-red-600/30 border-2 border-red-400 animate-pulse shadow-lg shadow-red-900/20"
                : "bg-indigo-900/20 border-2 border-indigo-500 hover:bg-indigo-800/30 hover:border-indigo-400"
              }`}
            onClick={handleTalk}
          >
            <Mic
              size={28}
              className={`transition-colors duration-300 ${isTalking ? "text-red-500" : "text-indigo-400"
                }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}