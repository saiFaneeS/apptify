import Link from "next/link";
import { Scroll, Calendar, PenTool, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function RecentBlogs() {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    setRecentPosts([
      {
        id: 1,
        title: "The Dragon's Hoard: Myths and Legends",
        excerpt:
          "Uncover the truth behind the most fearsome creatures in medieval lore...",
        date: "1247 AD",
        author: "Sir Galahad the Scribe",
      },
      {
        id: 2,
        title: "Alchemy: Turning Lead into Gold",
        excerpt:
          "Discover the secrets of the ancient alchemists and their quest for the Philosopher's Stone...",
        date: "1298 AD",
        author: "Merlin the Wise",
      },
      {
        id: 3,
        title: "The Black Plague: A Dark Chapter",
        excerpt:
          "Chronicles of survival and resilience in the face of history's deadliest pandemic...",
        date: "1352 AD",
        author: "Brother Cadfael",
      },
    ]);
  }, []);
  return (
    <section className="py-12 px-12 bg100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text900 mb-8">
          Recent Chronicles
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts?.map((post) => (
            <article
              key={post?.id}
              className="bg50 border-2 border900 rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text900 mb-2">
                  {post?.title}
                </h3>
                <p className="text800 mb-4">{post?.excerpt}</p>
                <div className="flex items-center text700 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post?.date}</span>
                </div>
                <div className="flex items-center text700 text-sm mb-4">
                  <PenTool className="w-4 h-4 mr-2" />
                  <span>{post?.author}</span>
                </div>
                <Link
                  href={`/chronicles/${post?.id}`}
                  className="inline-flex items-center px-4 py-2 border border900 text-sm font-medium rounded-md text900 bg200 hover:bg300 transition-colors duration-300"
                >
                  <Scroll className="mr-2 h-4 w-4" />
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="text-center mt-8">
        <Button className="bg700 hover:bg600 text100">
          View All Chronicles
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
