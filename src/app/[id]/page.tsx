"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";

export default function InterviewPage() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);

    // Handle exit button click
    const handleExit = () => {
        router.push('/'); // Navigate back to the home page
    };

    // Handle microphone click
    const handleClickMic = () => {
        setIsActive(!isActive);
        console.log('Microphone clicked, session ID:', id);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
            <div className="max-w-md w-full rounded-lg bg-zinc-900 p-8 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-10">Talk with your Doc</h1>                  <div 
                    className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 cursor-pointer
                    transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
                    ${isActive 
                        ? 'bg-indigo-600/30 border-2 border-indigo-400 animate-pulse' 
                        : 'bg-indigo-900/20 border-2 border-indigo-500 hover:bg-indigo-800/30 hover:border-indigo-400'
                    }`}
                    onClick={handleClickMic}
                >
                    <Mic 
                        size={24}
                        className={`transition-colors duration-300 ${isActive ? 'text-indigo-300' : 'text-indigo-400'}`}
                    />
                </div>

                <p className="text-center mb-8">
                    {isActive ? 'Listening... Click again to stop.' : 'Press the microphone to start'}
                </p>

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