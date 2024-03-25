"use client";

import { useApp } from "@/Context/AppContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useLocalStorage from "@/hooks/use-local-storage-state";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type FC } from "react";
import { UserInfo } from "../types";
import SignIn from "./SignIn";
import { SignInButton } from "@farcaster/auth-kit";

export const Header: FC = () => {
  const { userData } = useApp();
  const [user, _1, removeItem] = useLocalStorage<UserInfo>("user");
  const [isOpened, setIsOpened] = useState(false);
  const [text, setText] = useState("");

  const handleSignout = () => {
    removeItem();
    window.location.reload();
  };

  const createCast = async () => {
    if (!user.signerUuid) {
      return;
    }

    const req = await fetch("/api/casts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signerUid: user.signerUuid,
        text,
      }),
    });

    if (req.ok) {
      alert("Cast created");

      setText("");
    } else {
      alert("Failed to create cast");
    }

    setIsOpened(false);
  };

  return (
    <nav className={cn("flex justify-between items-center py-4 px-20")}>
      <div className={cn("flex items-center gap-4")}>
        <Link href="/">
          <p>MintCast</p>
        </Link>
      </div>

      <div className={cn("flex items-center gap-4")}>
        {userData?.displayName ? (
          <div className={cn("flex items-center gap-4")}>
            {userData?.pfp.url && (
              <Image
                src={userData?.pfp.url}
                alt="User profile picture"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <p className="text-sm font-semibold">{userData?.displayName}</p>

            <Dialog open={isOpened} onOpenChange={setIsOpened}>
              <DialogTrigger asChild>
                <button className="bg-[#0091FF] text-white gap-2 rounded-lg h-8 w-28 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                  <PlusIcon width={24} height={24} />
                  New Cast
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-[#131417] border-[0.5px] border-[#2B2B2B]">
                <DialogHeader>
                  <DialogTitle className="text-white font-semibold text-lg text-center">
                    New cast
                  </DialogTitle>
                </DialogHeader>

                <div className="flex items-center gap-4 p-4">
                  <Image
                    src={userData?.pfp.url}
                    alt="User profile picture"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />

                  <input
                    type="text"
                    placeholder="What's happening?"
                    className="w-full h-12 p-4 bg-[#1A1C1F] border-[1px] border-[#2B2B2B] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <DialogFooter className="border-t-2 border-[#2B2B2B] justify-end pt-4 align-end">
                  <DialogClose asChild>
                    <button className="border-[#2B2B2B] text-white hover:bg-[#2B2B2B] hover:text-white">
                      Cancel
                    </button>
                  </DialogClose>
                  <button
                    className="bg-[#0091FF] text-white hover:bg-blue-700"
                    onClick={createCast}
                  >
                    Post
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <button onClick={handleSignout}>Sign out</button>
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </nav>
  );
};
