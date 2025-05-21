'use client';
import { createAuthClient } from "better-auth/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Mail } from "lucide-react";

const authClient = createAuthClient();

export default function SignInPage() {
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
      router.push("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await authClient.signIn.social({ provider: "github" });
      router.push("/");
    } catch (error) {
      console.error("GitHub Sign-In Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Choose your preferred sign-in method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
          >
            <Mail className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGitHubSignIn}
          >
            <Github className="mr-2 h-5 w-5" />
            Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
