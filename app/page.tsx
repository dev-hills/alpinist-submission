"use client";

import Image from "next/image";
import logo from "../public/alpinist-logo.png";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const SplashScreen = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prev) => {
  //       if (prev < 100) {
  //         return prev + 1;
  //       } else {
  //         clearInterval(interval);
  //         return 100;
  //       }
  //     });
  //   }, 100);

  //   setTimeout(() => {
  //     router.replace("/submit");
  //   }, 10000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    router.replace(pathname);
  }, [progress, router, pathname]);

  return (
    <div className="overflow-hidden relative">
      <div className="absolute w-[500px] h-[500px] bg-purple-700 rounded-full blur-2xl opacity-40 left-[80%] bottom-[40%] animate-pulse duration-1000"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-700 rounded-full blur-2xl opacity-40 right-[75%] top-[25%] animate-pulse duration-1000"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-700 rounded-full blur-2xl opacity-40 left-[33%] bottom-[80%] animate-pulse duration-1000"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-700 rounded-full blur-2xl opacity-40 left-[33%] top-[60%] animate-pulse duration-1000"></div>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="animate-bounce">
          <Image src={logo} alt="" />
        </div>
        <div>
          {/* <h1 className="animate-pulse text-[30px] text-center font-bold">
            Alpinist Frontend
            <br /> Submission
          </h1> */}
          <h1 className="animate-pulse text-[30px] text-center font-bold">
            Submission is closed
            <br />
          </h1>
        </div>

        {/* <div className="w-[100px] mt-4 h-2 bg-gray-300 rounded ">
          <div
            className="h-full bg-purple-600 rounded transition-all"
            style={{ width: `${progress}%` }}
          ></div>
          <h3 className="font-bold text-center mt-[10px]">{progress}%</h3>
        </div> */}
      </div>
    </div>
  );
};

export default SplashScreen;
