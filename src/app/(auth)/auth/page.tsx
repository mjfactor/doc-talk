'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createAuthClient } from "better-auth/client"; // Added import
import { useRouter } from "next/navigation"; // Added import

// Placeholder for actual icons - recommend using a library like lucide-react
const GoogleIcon = () => <span className="mr-2">G</span>;
const GitHubIcon = () => <span className="mr-2">GH</span>;
const authClient = createAuthClient(); // Added authClient initialization

export default function SignInPage() {
  const router = useRouter(); // Added router initialization
  const handleGoogleSignIn = async () => { // Changed to async
    try {
      await authClient.signIn.social({ provider: "google" });
      router.push("/"); // Redirect to home page after sign-in
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      // Handle error appropriately in a real app (e.g., show a notification)
    }
  };

  const handleGitHubSignIn = async () => { // Changed to async
    try {
      await authClient.signIn.social({ provider: "github" });
      router.push("/"); // Redirect to home page after sign-in
    } catch (error) {
      console.error("GitHub Sign-In Error:", error);
      // Handle error appropriately in a real app
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Sign In
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Choose your preferred provider to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGitHubSignIn}
          >
            <GitHubIcon />
            Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
