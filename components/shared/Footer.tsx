"use client";

import { headerLinks } from "@/constants";
import { Hourglass } from "lucide-react";
import { Noto_Sans } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const noto = Noto_Sans({ subsets: ["latin"] });

function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t z-50 bg-white">
      <div className="wrapper flex flex-row justify-between items-center">
        <div>
          <h2
            className={`${noto.className} font-semibold text-indigo-950 dark:text-indigo-100 text-2xl flex flex-row gap-1 items-center`}
          >
            <Hourglass size={19} className="mt-0.5" /> TimeIt.
          </h2>
          <p className="text-xs font-light text-slate-600">
            2024 All Rights Reserved
          </p>
        </div>

        <Link
          href="https://github.com/ryanbakker/TimeIt"
          target="_blank"
          className="hover:text-indigo-700 transition-all"
        >
          Visit the GitHub Repo
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
