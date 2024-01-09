"use client";

import { Hourglass } from "lucide-react";
import { useEffect, useState } from "react";

type WelcomeHeadingProps = {
  userFirstName?: string;
  userLastName?: string;
};

function WelcomeHeading({ userFirstName, userLastName }: WelcomeHeadingProps) {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const getCurrentTime = () => {
      const currentTime = new Date().getHours();

      if (currentTime >= 5 && currentTime < 12) {
        setGreeting("Good morning");
      } else if (currentTime >= 12 && currentTime < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    getCurrentTime();
  }, []);

  return (
    <div className="wrapper z-50 relative">
      <div className="bg-white dark:bg-slate-700 rounded-xl w-fit py-6 px-7">
        <div className="relative w-fit flex flex-row items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-50">
              Dashboard
            </h1>
            <div className="h-[3px] w-full bg-indigo-900 dark:bg-indigo-50 rounded-full" />
          </div>
        </div>
        <h2 className="pt-2 text-slate-600 dark:text-slate-300 font-light max-w-[400px]">
          <span className="font-semibold">
            {greeting} {userFirstName} {userLastName},
          </span>{" "}
          take control and manage your tasks to get the most out of your
          education.
        </h2>
      </div>

      <Hourglass
        className="absolute right-0 -bottom-[140px] text-indigo-300 dark:text-indigo-800 fill-[#a5b4fc] dark:fill-[#3730a3] hidden md:block"
        size={300}
        fill="#a5b4fc"
      />
    </div>
  );
}

export default WelcomeHeading;
