'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react'; // Import icons

export default function HomePage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const router = useRouter();

  const handleSubmit = () => {
    // Access the password from environment variables
    if (password === process.env.PASSWORD) {
      router.push('/talk');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <p className="mt-3 text-2xl">
          Enter the password to continue
        </p>

        <div className="flex flex-col items-center mt-8 space-y-4">
          <div className="relative w-80">
            <Input
              type={showPassword ? 'text' : 'password'} // Toggle input type
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="pr-10" // Add padding for the icon
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0 flex items-center justify-center h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </Button>
          </div>
          <Button onClick={handleSubmit} className="w-80">
            Enter
          </Button>
        </div>
      </main>
    </div>
  );
}
