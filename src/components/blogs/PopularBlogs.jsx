import { useBlogs } from "@/context/BlogContext";
import { Book, Calendar, Feather, Loader2, Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import Loading from "../Loading";
import { formatTime } from "@/lib/formatTime";

const PopularBlogs = () => {
  const [popularReviews, setPopularReviews] = React.useState([]);
  const { blogs, getAllBlogs } = useBlogs();

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      console.log("Fetching blogs");
      getAllBlogs();
    } else {
      const topBlogs = blogs
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, 3);

      setPopularReviews(topBlogs);
    }
  }, [blogs, getAllBlogs]);

  return (
    <section className="px-8 max-sm:px-4 mb-12">
      <h2 className="text-2xl font-semibold mb-5">Popular Reviews</h2>
      {popularReviews ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularReviews?.map((post) => (
            <Card
              key={post.id}
              className="relative flex items-start justify-start gap-6"
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                width={300}
                height={200}
                className="w-32 h-48 object-cover rounded-sm relative z-20"
              />
              <div className="w-full flex flex-col gap-2 justify-between h-full text-foreground">
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold">{post.title}</h3>
                  <div className="flex items-center mt-1">
                    <Book className="w-4 h-4 mr-2" />
                    <span className="text-xs">{post.bookName}</span>
                  </div>
                  {/* <div className="flex items-center">
                  <Feather className="w-4 h-4 mr-2" />
                  <span className="text-xs">{post.bookAuthor}</span>
                </div> */}
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-xs">
                      {formatTime(post.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 inline ${
                            index < post.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                </div>

                {/* <p className="">{post.excerpt}</p> */}
                <Link href={`/reviews/${post.id}`} className="mt-1">
                  <Button size="sm" variant="outline">
                    Read Review
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Loading />
      )}
      <div className="flex justify-center">
        <Link href={"/reviews"}>
          <Button className="mt-6" variant="outline">
            View All
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PopularBlogs;
