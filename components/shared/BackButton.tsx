"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

function BackButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      size="lg"
      className="flex flex-row gap-1 items-center pr-10 w-fit opacity-60 hover:opacity-100 transition-all"
    >
      <ChevronLeft size={18} /> Back
    </Button>
  );
}

export default BackButton;
