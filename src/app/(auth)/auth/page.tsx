'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Placeholder for actual icons - recommend using a library like lucide-react
const GoogleIcon = () => <span className="mr-2">G</span>;
const GitHubIcon = () => <span className="mr-2">GH</span>;

export default function SignInPage() {
  const handleGoogleSignIn = () => {
    console.log("Attempting Google Sign-In (mock)");
    // In a real app, you would redirect to your Google OAuth endpoint
  };

  const handleGitHubSignIn = () => {
    console.log("Attempting GitHub Sign-In (mock)");
    // In a real app, you would redirect to your GitHub OAuth endpoint
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
