"use client";

import { useState } from "react";

function PriorityLabel({ label }: { label: string }) {
  return (
    <p
      className={`${label === "Casual" && "bg-green-400/10 text-green-700"} ${
        label === "Important" && "bg-orange-400/10 text-orange-700"
      } ${
        label === "Urgent" && "bg-red-400/10 text-red-700"
      } py-1 px-3 rounded-sm font-medium text-sm`}
    >
      {label}
    </p>
  );
}

export default PriorityLabel;
