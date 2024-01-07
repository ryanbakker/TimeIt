"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

function BackButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="flex flex-row gap-1 items-center rounded-md py-2 px-5 bg-slate-500 text-white hover:bg-slate-600"
    >
      <ChevronLeft size={18} /> Back
    </Button>
  );
}

export default BackButton;
