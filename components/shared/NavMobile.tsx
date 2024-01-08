"use client";

import { usePathname } from "next/navigation";
import { ThemeToggler } from "../ThemeToggler";
import { UserButton } from "@clerk/nextjs";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Hourglass, MoveLeft, MoveRight } from "lucide-react";
import { headerLinks } from "@/constants";
import Link from "next/link";

function NavMobile() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden flex flex-row gap-5 items-center">
      <div className="flex space-x-3 items-center">
        <ThemeToggler />
        <div className="border border-indigo-500 rounded-full p-1 flex items-center justify-center">
          <UserButton afterSignOutUrl="/sign-in" />
        </div>

        <Sheet>
          <SheetTrigger
            className="flex flex-col gap-1.5 items-end"
            aria-label="Menu"
          >
            <div className="bg-white w-[27px] h-[3px] rounded-xl" />
            <div className="bg-white w-[30px] h-[3px] rounded-xl" />
            <div className="bg-white w-[22px] h-[3px] rounded-xl" />
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-10 bg-neutral-100 dark:bg-neutral-800">
            <SheetHeader>
              <SheetTitle className="flex flex-row gap-2 items-center text-3xl text-indigo-700 dark:text-indigo-500">
                <Hourglass className="mt-0.5" /> TimeIt
              </SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col justify-between h-full w-full max-h-[50vh]">
              {headerLinks.map((link) => {
                const isActive = pathname === link.route;

                return (
                  <li key={link.route} className="flex max-w-[80%]">
                    <SheetClose asChild>
                      <Link
                        href={link.route}
                        className={`bg-neutral-800 dark:bg-neutral-200 py-3 px-4 w-full text-neutral-100 dark:text-neutral-800 rounded-md flex flex-row items-center justify-between ${
                          isActive && "!bg-indigo-600 !text-white"
                        }`}
                      >
                        {link.label}{" "}
                        <MoveRight
                          size={20}
                          className={`!block ${isActive && "!hidden"}`}
                        />{" "}
                        <MoveLeft
                          size={20}
                          className={`hidden ${isActive && "!block"}`}
                        />
                      </Link>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default NavMobile;
