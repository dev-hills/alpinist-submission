"use client";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import Image from "next/image";
import logo from "../../public/alpinist-logo.png";

type formType = {
  slackUsername: string;
  githubUsername: string;
  linkToRepo: string;
  liveUrl: string;
  learnt: string;
};

const Submit = () => {
  const [details, setDetails] = useState<formType>({
    slackUsername: "",
    githubUsername: "",
    linkToRepo: "",
    liveUrl: "",
    learnt: "",
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2024-11-11T12:00:00");
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setRemainingTime({ hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      !details.slackUsername ||
      !details.githubUsername ||
      !details.linkToRepo ||
      !details.liveUrl ||
      !details.learnt
    ) {
      setIsOpen(false);
      return toast.error("Please fill all the fields, you should know better");
    }

    const data = {
      slack_username: details.slackUsername,
      github_username: details.githubUsername,
      repository_link: details.linkToRepo,
      live_url: details.liveUrl,
      learn: details.learnt,
    };

    try {
      setLoading(true);
      const res = await axios.post("/api/form", data);

      console.log(res);
      setIsOpen(false);
      toast.success("Submission successful");
      setDetails({
        slackUsername: "",
        githubUsername: "",
        linkToRepo: "",
        liveUrl: "",
        learnt: "",
      });
    } catch (error) {
      toast.error("Submission failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-[40%] sm:w-[30%] h-screen bg-purple-600 fixed">
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-[10px]">
            <div className="w-[150px] sm:w-[100px]">
              <Image
                src={logo}
                alt="alpinist logo"
                className="brightness-200"
              />
            </div>

            <div className="sm:hidden">
              <h1 className="animate-pulse text-[30px] text-center text-white font-bold">
                Alpinist Frontend
                <br /> Submission
              </h1>
            </div>

            <div className="sm:hidden flex gap-[35px] justify-center mt-4 bg-purple-700 p-4 rounded-lg shadow-lg">
              <div className="flex flex-col items-center text-white">
                <span className="text-[40px] font-bold">
                  {remainingTime.hours}
                </span>
                <span className="text-sm">Hours</span>
              </div>
              <div className="flex flex-col items-center text-white">
                <span className="text-[40px] font-bold">
                  {remainingTime.minutes}
                </span>
                <span className="text-sm">Minutes</span>
              </div>
              <div className="flex flex-col items-center text-white">
                <span className="text-[40px] font-bold">
                  {remainingTime.seconds}
                </span>
                <span className="text-sm">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[60%] sm:w-[70%] ml-[40%] sm:ml-[33%] h-screen overflow-auto px-[80px] sm:px-[10px] py-[60px] flex flex-col gap-[45px] sm:gap-[39px]">
        <div>
          <p className="text-[17px] mb-[15px]">Slack Username</p>
          <input
            type="text"
            className="w-[70%] sm:w-[100%] border-[3px] border-purple-600 border-x-0 border-t-0 outline-none font-semibold text-[20px]"
            value={details.slackUsername}
            onChange={(e) =>
              setDetails({ ...details, slackUsername: e.target.value })
            }
          />
        </div>

        <div>
          <p className="text-[17px] mb-[15px]">Github Username</p>
          <input
            type="text"
            className="w-[70%] sm:w-[100%] border-[3px] border-purple-600 border-x-0 border-t-0 outline-none font-semibold text-[20px]"
            value={details.githubUsername}
            onChange={(e) =>
              setDetails({ ...details, githubUsername: e.target.value })
            }
          />
        </div>

        <div>
          <p className="text-[17px] mb-[15px]">Link to Repository</p>
          <input
            type="text"
            className="w-[70%] sm:w-[100%] border-[3px] border-purple-600 border-x-0 border-t-0 outline-none font-semibold text-[20px]"
            value={details.linkToRepo}
            onChange={(e) =>
              setDetails({ ...details, linkToRepo: e.target.value })
            }
          />
        </div>

        <div>
          <p className="text-[17px] mb-[15px]">Live Url</p>
          <input
            type="text"
            className="w-[70%] sm:w-[100%] border-[3px] border-purple-600 border-x-0 border-t-0 outline-none font-semibold text-[20px]"
            value={details.liveUrl}
            onChange={(e) =>
              setDetails({ ...details, liveUrl: e.target.value })
            }
          />
        </div>

        <div>
          <p className="text-[17px] mb-[15px]">
            What did you learn when building this project?
          </p>
          <textarea
            rows={1}
            className="w-[70%] sm:w-[100%] border-[3px] border-purple-600 border-x-0 border-t-0 outline-none font-semibold text-[20px] resize-none"
            value={details.learnt}
            onChange={(e) => setDetails({ ...details, learnt: e.target.value })}
          />
        </div>

        <div className="sm:px-3">
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger
              className="w-[50%] sm:w-[100%] bg-purple-600 text-white py-[15px] rounded-[20px]"
              onClick={() => setIsOpen(true)}
            >
              Submit
            </AlertDialogTrigger>
            <AlertDialogContent className=" border-[3px] border-purple-900">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-purple-900">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This submission cannot be undone and cannot be edited. This
                  will permanently submit your project and further submissions
                  will not be acknowledged.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-green-500 hover:bg-green-500">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-500"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <PulseLoader color="#ffffff" size={8} />
                  ) : (
                    "Submit"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="sm:block hidden">
          <div className="flex gap-[35px] justify-center mt-4 bg-purple-700 p-4 rounded-lg shadow-lg">
            <div className="flex flex-col items-center text-white">
              <span className="text-[40px] font-bold">
                {remainingTime.hours}
              </span>
              <span className="text-sm">Hours</span>
            </div>
            <div className="flex flex-col items-center text-white">
              <span className="text-[40px] font-bold">
                {remainingTime.minutes}
              </span>
              <span className="text-sm">Minutes</span>
            </div>
            <div className="flex flex-col items-center text-white">
              <span className="text-[40px] font-bold">
                {remainingTime.seconds}
              </span>
              <span className="text-sm">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
