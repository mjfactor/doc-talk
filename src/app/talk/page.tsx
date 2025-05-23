"use client";

import { useState, useEffect } from "react";
import { Mic, MessageSquareText } from "lucide-react"; // Added MessageSquareText
import { vapi } from "@/lib/vapi-ai";

// Define an interface for the transcript message
interface TranscriptMessage {
  type: string;
  role: "user" | "assistant";
  transcript: string;
  timestamp: Date;
  transcriptType: "partial" | "final"; // Added transcriptType
}

export default function InterviewPage() {
  const [isTalking, setIsTalking] = useState(false);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [transcriptMessages, setTranscriptMessages] = useState<TranscriptMessage[]>([]); // State for transcript messages

  // VAPI Assistant ID
  const ASSISTANT_ID = "e27c1962-fde2-4491-8da3-f80807515b9c";

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
      setTranscriptMessages([]); // Clear previous transcript on new call
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setCallActive(false);
      setIsTalking(false);
    };

    // Handler for transcript messages
    const handleMessage = (message: TranscriptMessage) => {
      console.log("Message received:", message);
      if (message.type === "transcript" && message.transcript) {
        setTranscriptMessages((prevMessages) => {
          const newMessage: TranscriptMessage = {
            type: message.type,
            role: message.role,
            transcript: message.transcript,
            timestamp: new Date(message.timestamp),
            transcriptType: message.transcriptType, // Make sure to pass this from the event
          };

          if (newMessage.transcriptType === "partial") {
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (lastMessage && lastMessage.role === newMessage.role && lastMessage.transcriptType === "partial") {
              // Update the last partial message
              const updatedMessages = [...prevMessages];
              updatedMessages[prevMessages.length - 1] = newMessage;
              return updatedMessages;
            } else {
              // If last message is not partial or different role, add new partial
              return [...prevMessages, newMessage];
            }
          } else {
            // It's a final transcript
            // Check if the last message was a partial from the same role, if so, replace it
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (lastMessage && lastMessage.role === newMessage.role && lastMessage.transcriptType === "partial") {
              const updatedMessages = [...prevMessages];
              updatedMessages[prevMessages.length - 1] = newMessage; // Replace with final
              return updatedMessages;
            }
            // Otherwise, add the new final message
            return [...prevMessages, newMessage];
          }
        });
      }
    };

    // Register event listeners
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("message", handleMessage); // Register message handler

    // Cleanup event listeners
    return () => {
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("message", handleMessage); // Unregister message handler
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl w-full rounded-lg bg-zinc-900 p-8 flex flex-col items-center"> {/* Increased max-w */}
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 cursor-pointer
                    transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
                    ${isTalking
              ? "bg-red-600/30 border-2 border-red-400 animate-pulse"
              : "bg-indigo-900/20 border-2 border-indigo-500 hover:bg-indigo-800/30 hover:border-indigo-400"
            }`} // Increased size
          onClick={handleTalk}
        >
          <Mic
            size={32} // Increased size
            className={`transition-colors duration-300 ${isTalking ? "text-red-500" : "text-indigo-400"
              }`}
          />
        </div>

        <p className="text-center mb-8 text-lg"> {/* Increased text size */}
          {isTalking
            ? isAssistantSpeaking
              ? "Assistant is speaking..."
              : "Listening... Click mic to stop."
            : "Press the microphone to start"}
        </p>

        {/* Transcript Display Area */}
        {callActive && transcriptMessages.length > 0 && (
          <div className="w-full max-h-96 overflow-y-auto bg-zinc-800 rounded-lg p-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800">
            {transcriptMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-xl ${msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-zinc-700 text-zinc-200 rounded-bl-none"
                    }`}
                >
                  <p className="text-sm">{msg.transcript}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}