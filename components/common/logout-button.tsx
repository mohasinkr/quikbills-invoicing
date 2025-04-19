"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth/logout";

const LogoutButton = () => {
  return (
    <Button onClick={logout}>
      <LogOutIcon /> Logout
    </Button>
  );
};

export default LogoutButton;
