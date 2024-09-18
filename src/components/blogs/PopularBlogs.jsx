import { useBlogs } from "@/context/BlogContext";
import { Loader2, Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import Loading from "../Loading";

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
      <h2 className="text-2xl font-semibold mb-8">Popular Reviews</h2>
      {popularReviews ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularReviews?.map((review) => (
            <Link href={`/reviews/${review.id}`} key={review.id}>
              <Card
                key={review.id}
                className="flex items-center hover:bg-foreground/5"
              >
                <Image
                  src={review?.coverImage}
                  alt={review.title}
                  width={100}
                  height={150}
                  className="rounded mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold mb-1">{review.title}</h3>
                  <p className="text-sm mb-1 font-medium">{review.bookName}</p>
                  <p className="text-sm mb-2">By {review.bookAuthor}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-500 fill-current"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
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
