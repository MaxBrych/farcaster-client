import { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import Image from "next/image";
import { ReactElement } from "react";
import { MintCastButton } from "./MintCastButton";

export default function Cast({
  cast,
  author,
}: {
  cast: CastWithInteractions | undefined;
  author?: any;
}): ReactElement {
  return (
    <div
      className={`border-[#272B30] border-2 rounded-md p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-400`}
    >
      <div className="flex gap-2 items-center">
        {(cast?.author.pfp_url || author?.pfp.url) && (
          <Image
            src={cast?.author.pfp_url || author?.pfp.url}
            alt={
              cast?.author.display_name ||
              author?.display_name ||
              cast?.author.username
            }
            width={36}
            height={36}
            className="rounded-full"
          />
        )}
        <p className="font-semibold  text-lg">
          {cast?.author.display_name ||
            cast?.author.username ||
            author?.display_name ||
            author?.username}
        </p>
      </div>
      <p className="text-[#646D7A] mt-8">{cast?.text}</p>
    </div>
  );
}
