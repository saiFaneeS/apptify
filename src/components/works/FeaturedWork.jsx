import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Book, Calendar, Feather, FileText, View } from "lucide-react";
import Image from "next/image";
import { useWorks } from "@/context/WorkContext";
import { Badge } from "../ui/badge";
import { formatTime } from "@/lib/formatTime";
import { Card } from "../ui/card";
import Link from "next/link";
import Loading from "../Loading";

const FeaturedWork = () => {
  const { featuredWork, works, getAllWorks, setFeaturedWork } = useWorks();

  useEffect(() => {
    if (!works || works?.length === 0) {
      getAllWorks().then(() => {
        if (works?.length > 0) {
          setFeaturedWork(works[0]);
        }
      });
    }
  }, [works, getAllWorks, setFeaturedWork]);

  return (
    <section className="px-8 max-sm:px-4 pb-12 ">
      <h2 className="text-2xl font-semibold mb-5">Featured Composition</h2>
      <Card>
        {featuredWork && featuredWork.completionStatus === "completed" ? (
          <div className="flex items-center gap-6 max-sm:flex-wrap">
            <div className="max-sm:w-full w-52 h-80 flex justify-center gap-4 items-center shrink-0">
              <Image
                src={featuredWork?.coverImage}
                alt={featuredWork?.title}
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="rounded-full">
                <Badge className="font-medium bg-amber-600 hover:bg-amber-700">
                  Featured Composition
                </Badge>
              </span>
              <h3 className="text-lg font-semibold">{featuredWork?.title}</h3>
              {featuredWork?.datePublished && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{featuredWork?.datePublished}</span>
                </div>
              )}
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                <span className="text-xs">
                  {featuredWork?.content
                    ? featuredWork.content
                        .replace(/<p>/g, " ")
                        .replace(/<\/p>/g, " ")
                        .replace(/<[^>]+>/g, "")
                        .trim()
                        .split(/\s+/)
                        .filter((word) => word.length > 0).length
                    : 0}{" "}
                  words
                </span>
              </div>
              <div className="flex items-center">
                <View className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {featuredWork?.viewCount || 0} views
                </span>
              </div>
              <div className="text-sm">
                <p className="text-sm mb-1 font-medium">Synopsis: </p>

                <p className="text-sm line-clamp-3 text-foreground/70">
                  {featuredWork?.synopsis}
                </p>
              </div>{" "}
              <Link href={`/works/${featuredWork?.id}`}>
                <Button variant={"outline"}>Read More</Button>
              </Link>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </Card>
    </section>
  );
};

export default FeaturedWork;
