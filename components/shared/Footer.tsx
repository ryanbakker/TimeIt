"use client";

import { headerLinks } from "@/constants";
import { Noto_Sans } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const noto = Noto_Sans({ subsets: ["latin"] });

function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t">
      <div className="wrapper flex flex-row justify-between items-center">
        <div>
          <h2
            className={`${noto.className} font-semibold text-indigo-950 dark:text-indigo-100 text-2xl`}
          >
            TimeIt.
          </h2>
          <p className="text-xs font-light text-slate-600">
            2024 All Rights Reserved
          </p>
        </div>

        <ul className="flex flex-row gap-10">
          {headerLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.route}
                className="text-slate-400 hover:text-slate-900 hover:dark:text-slate-50 transition-all"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
