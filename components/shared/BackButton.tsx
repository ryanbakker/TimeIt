"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function BackButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} className="hover:bg-indigo-700">
      Back
    </Button>
  );
}

export default BackButton;
