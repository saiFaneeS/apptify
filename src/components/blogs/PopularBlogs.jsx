import { useBlogs } from "@/context/BlogContext";
import {
  Book,
  Calendar,
  ChartBar,
  ChevronRight,
  Circle,
  Dot,
  Feather,
  Loader2,
  Star,
  Text,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import Loading from "../Loading";
import { formatTime } from "@/lib/formatTime";
import { Separator } from "../ui/separator";

const PopularBlogs = () => {
  const [popularReviews, setPopularReviews] = React.useState([]);
  const { blogs, getAllBlogs } = useBlogs();

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      console.log("Fetching blogs");
      getAllBlogs();
    } else {
      const topBlogs = blogs
        .filter((blog) => blog.isPublished)
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, 6);

      setPopularReviews(topBlogs);
    }
  }, [blogs, getAllBlogs]);

  return (
    <section className="p-page-sides pb-12">
      <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2">
        <ChartBar />
        Popular Blogs
      </h2>{" "}
      {popularReviews ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularReviews?.map((post) => (
            <Card
              key={post.id}
              className="relative flex items-start justify-start gap-4 flex-col max-md:p-3"
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                width={300}
                height={200}
                className="aspect-video w-full object-cover rounded-lg relative z-20"
              />
              <div className="w-full flex flex-col ga-2 justify-between h-full text-foreground">
                <div className="flex flex-col gap-3">
                  <h3 className="text-base font-semibold line-clamp-2">
                    {post.title}
                  </h3>
                  {post?.content && (
                    <div className="flex items-center">
                      <Text className="w-4 h-4 mr-2 shrink-0" />{" "}
                      <div
                        className="text-xs line-clamp-1"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-xs">
                      {formatTime(post.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Dot
                      className="w-4 h-4 mr-2 text-primary"
                      strokeWidth={4}
                    />
                    <span className="text-xs">
                      {post.content.split(" ").length} words
                    </span>
                  </div>
                </div>

                {/* <p className="">{post.excerpt}</p> */}
                <Link href={`/blogs/${post.id}`} className="mt-3 w-fit">
                  <Button variant="outline">View Post</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Loading />
      )}
      <div className="flex justify-center">
        {/* <Link href={"/blogs"}>
          <Button className="mt-6" variant="outline">
            View All
          </Button>
        </Link> */}
        <Link href={`/blogs`} className="inline-block mt-6">
          <button className="group flex items-center justify-center px-4 py-1.5 bg-primary/80 text-primary-foreground rounded-full transition-all hover:bg-primary/90">
            <span className="text-sm font-">{"View All"}</span>
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PopularBlogs;
