import { useWorks } from "@/context/WorkContext";
import { Calendar, FileText, Eye } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import Loading from "../Loading";

const PopularWorks = () => {
  const [popularWorks, setPopularWorks] = React.useState([]);
  const { works, getAllWorks } = useWorks();

  useEffect(() => {
    if (!works || works.length === 0) {
      console.log("Fetching works");
      getAllWorks();
    } else {
      const topWorks = works
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, 2);

      setPopularWorks(topWorks);
    }
  }, [works, getAllWorks]);

  return (
    <section className="px-8 max-sm:px-4 py-12">
      <h2 className="text-2xl font-semibold mb-5">Popular Works</h2>
      {popularWorks.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {popularWorks.map((work) => (
            <Card
              key={work.id}
              className="relative flex items-start justify-start gap-4 p-3"
            >
              <Image
                src={work.coverImage}
                alt={work.title}
                width={300}
                height={200}
                className="w-28 h-44 object-cover rounded-sm relative z-20"
              />
              <div className="w-full flex flex-col gap-2 justify-between h-full text-foreground">
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold">{work.title}</h3>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-xs">{work.datePublished}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    <span className="text-xs">
                      {" "}
                      {work?.content
                        ? work.content
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
                  <p className="text-sm line-clamp-2">
                    <span className="text-sm font-medium">Synopsis: </span>
                    <br />
                    <span className="text-sm text-foreground/70">
                      {work.synopsis}
                    </span>
                  </p>
                </div>
                <Link href={`/works/${work.id}`} className="mt-1 w-fit">
                  <Button variant="outline" size="sm">
                    Read More
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
        <Link href={"/works"}>
          <Button className="mt-6" variant="outline">
            View All Works
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PopularWorks;
