"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { logout } from "@/features/auth/actions/logout";

const LogoutButton = () => {
  return (
    <Button onClick={logout}>
      <LogOutIcon /> Logout
    </Button>
  );
};

export default LogoutButton;
