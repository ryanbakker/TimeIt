"use client";

import { useEffect, useState } from "react";

function WelcomeHeading() {
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
    <div className="wrapper z-50">
      <div className="bg-white rounded-xl w-fit py-6 px-7">
        <div className="relative w-fit flex flex-row items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900">Dashboard</h1>
            <div className="h-[3px] w-full bg-indigo-900 rounded-full" />
          </div>
        </div>
        <h2 className="pt-2 text-slate-600 dark:text-slate-600 font-light">
          <span className="font-semibold">{greeting} person,</span> take control
          and manage your <br /> tasks to get the most out of your education.
        </h2>
      </div>
    </div>
  );
}

export default WelcomeHeading;
