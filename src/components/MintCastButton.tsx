"use client";

import { useApp } from "@/Context/AppContext";
import { useState, type FC } from "react";
import SignIn from "./SignIn";

interface MintCastButtonProps {
  hash: string;
}

export const MintCastButton: FC<MintCastButtonProps> = ({ hash }) => {
  const { userData } = useApp();
  const [loading, setLoading] = useState(false);

  const mintCast = async () => {
    setLoading(true);
    try {
      const req = await fetch("/api/mint-cast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: userData?.verifications[0],
          hash,
        }),
      });

      if (req.ok) {
        alert("Minted cast");
      }

      if (!req.ok) {
        alert("Error minting cast");
      }
    } catch (err) {
      alert("Error minting cast");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {userData ? (
        <button onClick={mintCast} disabled={loading}>
          {loading ? "loading" : "Mint Cast"}
        </button>
      ) : (
        <SignIn />
      )}
    </>
  );
};
