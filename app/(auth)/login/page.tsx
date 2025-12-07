import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import { buttonVariants } from "@/components/ui/button";
import authImage from "../../../public/images/auth-left.png";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login to quikBills Invoicing",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  return (
    <div className="relative container hidden flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/signup"
        className={cn(
          buttonVariants({ variant: "default" }),
          "absolute top-4 right-4 md:top-8 md:right-8"
        )}
      >
        Signup
      </Link>
      <Image src={authImage} alt="Authentication" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <h1 className="text-center text-2xl font-semibold tracking-tight">
            Login to quikBills Invoicing
          </h1>
          <Suspense fallback={<div>Loading...</div>}>
            <UserAuthForm context="login" />
          </Suspense>
          <p className="text-muted-foreground px-8 text-center text-sm">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-primary underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-primary underline underline-offset-4"
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
