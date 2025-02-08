import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Book,
  Calendar,
  Dot,
  Feather,
  ScrollText,
  Star,
  Text,
} from "lucide-react";
import Image from "next/image";
import { useBlogs } from "@/context/BlogContext";
import { Badge } from "../ui/badge";
import { formatTime } from "@/lib/formatTime";
import { Card } from "../ui/card";
import Link from "next/link";
import Loading from "../Loading";

const FeaturedBlogs = () => {
  const { featuredBlog, blogs, getAllBlogs, setFeaturedBlog } = useBlogs();

  useEffect(() => {
    if (!blogs || blogs?.length === 0) {
      getAllBlogs().then(() => {
        if (blogs?.length > 0) {
          setFeaturedBlog(blogs[0]);
        }
      });
    }
  }, [blogs, getAllBlogs, setFeaturedBlog]);

  return (
    <section className="p-page-sides py-12">
      {/* <h2 className="text-2xl font-semibold mb-5">Featured</h2> */}
      {featuredBlog && featuredBlog.isPublished ? (
        <Card className="animate-in fade-in-50 slide-in-from-bottom-10 duration-300">
          <div className="flex items-center gap-6 max-md:flex-col">
            <div className="max-md:w-full aspect-video md:h-52 lg:h-60 flex justify-center gap-4 items-center shrink-0">
              <Image
                src={featuredBlog?.coverImage}
                alt={featuredBlog?.title}
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="rounded-full">
                <Badge className="font-medium text-background">Featured</Badge>
              </span>
              <h3 className="text-lg font-semibold">{featuredBlog?.title}</h3>
              <div className="flex items-center">
                <Text className="w-4 h-4 mr-2 shrink-0" />
                <span
                  className="text-sm line-clamp-1"
                  dangerouslySetInnerHTML={{ __html: featuredBlog?.content }}
                ></span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {formatTime(featuredBlog?.createdAt)}
                </span>
              </div>
              <div className="flex items-center">
                <Dot className="w-4 h-4 mr-2 text-primary" strokeWidth={4} />
                <span className="text-xs">
                  {featuredBlog?.content.split(" ").length} words
                </span>
              </div>

              <p className="">{featuredBlog?.excerpt}</p>
              <Link href={`/blogs/${featuredBlog?.id}`}>
                <Button variant={"outline"} className="hover:underline">
                  View Post
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default FeaturedBlogs;
