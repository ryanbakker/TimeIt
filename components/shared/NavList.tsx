"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavList() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-row gap-4">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li key={link.route}>
            <Link
              href={link.route}
              className={`
                ${isActive && "!text-indigo-900 dark:!text-indigo-900 bg-white"}
                bg-transparent text-white py-2 px-5 rounded font-medium
                `}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavList;
