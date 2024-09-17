import React from "react";
import { Button } from "../ui/button";
import { Book, Calendar, Feather, ScrollText, Star } from "lucide-react";
import Image from "next/image";
import { useBlogs } from "@/context/BlogContext";
import { Badge } from "../ui/badge";
import { formatTime } from "@/lib/formatTime";
import { Card } from "../ui/card";
import Link from "next/link";

const FeaturedBlogs = () => {
  const { featuredBlog, blogs } = useBlogs();

  if (!blogs || blogs.length === 0) return null;
  return (
    <section className="px-8 max-sm:px-4 mb-8">
      <h2 className="text-2xl font-semibold mb-8">Featured Review</h2>
      <Card>
        <div className="flex items-center gap-8 flex-wrap">
          <div className="max-sm:w-full w-52 h-80 flex justify-center gap-4 items-center shrink-0">
            <Image
              src={featuredBlog?.coverImage}
              alt={featuredBlog?.title}
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
          <div className="md:w-1/2 flex flex-col gap-3">
            <span className="rounded-full">
              <Badge variant={"secondary"}>Featured Review</Badge>
            </span>
            <h3 className="text-3xl font-bold text900">
              {featuredBlog?.title}
            </h3>
            <div className="flex items-center">
              <Book className="w-4 h-4 mr-2" />
              <span className="text-sm">{featuredBlog?.bookName}</span>
            </div>
            <div className="flex items-center">
              <Feather className="w-4 h-4 mr-2" />
              <span className="text-sm">{featuredBlog?.bookAuthor}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {formatTime(featuredBlog?.createdAt)}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 inline ${
                      index < featuredBlog?.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </span>
            </div>
            <p className="">{featuredBlog?.excerpt}</p>
            <Link href={`/reviews/${featuredBlog?.id}`}>
              <Button className="max-w-80">
                <ScrollText className="mr-2 h-4 w-4 shrink-0" />
                Read Full Review
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default FeaturedBlogs;
