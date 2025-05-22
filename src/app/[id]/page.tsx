"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const router = useRouter();

    // Handle exit button click
    const handleExit = () => {
        router.push('/'); // Navigate back to the home page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
            <div className="max-w-md w-full rounded-lg bg-zinc-900 p-8 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-10">Talk with your Doc</h1>

                <div className="w-20 h-20 rounded-full bg-indigo-900/20 border-2 border-indigo-500 flex items-center justify-center mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-indigo-400"
                    >
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="22"></line>
                    </svg>
                </div>

                <p className="text-center mb-8">Press the microphone to start </p>

                <Button
                    variant="outline"
                    className="border-red-500 hover:bg-red-500/20 text-red-500 hover:text-red-400"
                    onClick={handleExit}
                >
                    Exit
                </Button>
            </div>
        </div>
    );
}