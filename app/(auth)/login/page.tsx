import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { UserAuthForm } from "@/features/auth/components/user-auth-form";
import { buttonVariants } from "@/components/ui/button";

import authImage from "/public/images/auth-left.png";

export const metadata: Metadata = {
  title: "Login to quikBills Invoicing",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  return (
    <div className="container relative hidden flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/signup"
        className={cn(
          buttonVariants({ variant: "default" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Signup
      </Link>
      <Image src={authImage} alt="Authentication" className="" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            Login to quikBills Invoicing
          </h1>
          <UserAuthForm context="login" />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
