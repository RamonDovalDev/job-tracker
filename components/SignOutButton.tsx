"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "@/lib/better-auth/auth-client";

const SignOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    const result = await signOut();
    if (result.data) {
      router.push("/sign-in");
    } else {
      alert("Error signing out");
    }
  };

  return (
    <DropdownMenuItem
      onClick={handleSignOut}
      className="font-semibold text-primary cursor-pointer"
    >
      Log Out
    </DropdownMenuItem>
  );
};

export default SignOutButton;
