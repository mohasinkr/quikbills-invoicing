"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "../actions/signup";
import { login } from "../actions/login";
import { handleAuthProvider } from "../actions/login-provider";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import FormSubmitButton from "@/components/common/form-submit-button";
import { useTransition } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  context?: "login" | "signup";
}

export function UserAuthForm({
  context = "login",
  className,
  ...props
}: UserAuthFormProps) {
  const [isGithubAuthPending, startTransition] = useTransition();

  async function onSubmit(data: FormData) {
    if (context === "login") {
      const { errorMessage } = await login(data);
      if (errorMessage) toast.error(errorMessage);
    } else {
      const signupData = await signup(data);
      if (signupData?.user)
        toast.success(
          "A confirmation mail has been sent to your email address."
        );
      else toast.error("Failed to sign up. Please try again.");
    }
  }

  return (
    <form className={cn("space-y-5", className)} {...props}>
      <div className="grid gap-5">
        <div className="grid gap-1">
          <Label className="mb-2" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            required
          />
        </div>
        <div className="grid gap-1">
          <Label className="mb-2" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="******"
            type="password"
            autoCapitalize="none"
            required
          />
        </div>
        <FormSubmitButton onSubmit={onSubmit} label="Continue" />
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="w-full"
        disabled={isGithubAuthPending}
        onClick={() => startTransition(() => handleAuthProvider("github"))}
      >
        {isGithubAuthPending ? (
          <LoadingSpinner spinnerClassName="text-black" />
        ) : (
          <>
            <GitHubLogoIcon className="mr-2 h-4 w-4" /> Github
          </>
        )}
      </Button>
    </form>
  );
}
