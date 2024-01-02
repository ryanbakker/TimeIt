import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TimeIt - Task Manager",
  description: "Manage your education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
