"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "../actions/signup";
import { login } from "../actions/login";
import { handleGithubAuth } from "../actions/login-provider";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  context?: "login" | "signup";
}

export function UserAuthForm({
  context = "login",
  className,
  ...props
}: UserAuthFormProps) {
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);

  function onSubmit(data: FormData) {
    if (context === "login") {
      login(data);
    } else {
      signup(data);
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
          />
        </div>
        <Button
          formAction={onSubmit}
          // disabled={isLoading}
        >
          {/* {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />} */}
          Continue
        </Button>
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
        // disabled={isLoading}
        className="w-full"
        formAction={() => handleGithubAuth("github")}
      >
        {/* {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : ( */}
        <GitHubLogoIcon className="mr-2 h-4 w-4" />
        {/* )}{" "} */}
        GitHub
      </Button>
    </form>
  );
}
