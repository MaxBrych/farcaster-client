import Image from "next/image";
import neynarClient from "@/clients/neynar";
import Cast from "@/components/Cast";
import { FeedType, FilterType } from "@neynar/nodejs-sdk";

async function getFeed() {
  const feed = await neynarClient.fetchFeed(FeedType.Filter, {
    filterType: FilterType.GlobalTrending,
    withReplies: false,
  });

  return { feed };
}

export default async function Home() {
  const feed = await getFeed();

  return (
    <div className="min-h-screen bg-background font-sans antialiased container mx-auto px-4 py-32 w-full h-full">
      {feed && (
        <div className="grid grid-cols-3 gap-6 mt-10">
          {feed.feed.casts.map((cast) => {
            return <Cast key={cast.thread_hash} cast={cast} />;
          })}
        </div>
      )}
    </div>
  );
}
