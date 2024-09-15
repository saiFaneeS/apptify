import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollText, Book, Star, Feather, Calendar } from "lucide-react";
import { useBlogs } from "@/context/BlogContext";
import { useEffect } from "react";
import { formatTime } from "@/lib/formatTime";
import Link from "next/link";
import { Card } from "../ui/card";

export default function Main() {
  const { blogs, getAllBlogs } = useBlogs();

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      <>
        <div className="p-12 bg100">
          {/* Recent Posts */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-8">Recent Reviews</h2>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              {blogs?.slice(0, 3).map((post) => (
                <Card
                  key={post.id}
                  className="relative flex items-center justify-start gap-6"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-32 h-48 object-cover rounded-sm relative z-20"
                  />
                  <div className="w-full flex flex-col gap-2 text-foreground">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <div className="flex items-center">
                      <Book className="w-4 h-4 mr-2" />
                      <span className="text-sm">{post.bookName}</span>
                    </div>
                    <div className="flex items-center">
                      <Feather className="w-4 h-4 mr-2" />
                      <span className="text-sm">{post.bookAuthor}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {formatTime(post.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">
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
                    {/* <p className="">{post.excerpt}</p> */}
                    <Link href={`/reviews/${post.id}`}>
                      <Button
                        className="w-full"
                        size="sm"
                        variant="outline"
                      >
                        Read Review
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </>
    </>
  );
}
