"use client";

import { logout } from "@/features/auth/actions/logout";

const LogoutButton = () => {
  return <button onClick={() => logout()}>Logout</button>;
};

export default LogoutButton;
