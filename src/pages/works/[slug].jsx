import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Facebook,
  Twitter,
  Linkedin,
  Calendar,
  FileText,
  Eye,
  BookOpen,
} from "lucide-react";
import Layout from "../Layout";
import { useWorks } from "@/context/WorkContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formatTime } from "@/lib/formatTime";
import { useUser } from "@/context/UserContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Comments from "@/components/works/Comments";

export default function SingleWorkPage() {
  const [relatedWorks, setRelatedWorks] = useState([]);
  const { incrementViewCount, getWorkById, getAllWorks, work, works } =
    useWorks();
  const { userProfile } = useUser();

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    getWorkById(slug);

    const timer = setTimeout(() => {
      incrementViewCount(slug);
    }, 1000);
    return () => clearTimeout(timer);
  }, [slug, getWorkById, incrementViewCount]);

  useEffect(() => {
    const fetchRelatedWorks = async () => {
      if (!works || works.length === 0) {
        await getAllWorks();
      }

      if (work && works && works.length > 0) {
        const related = works
          .filter((w) => w.id !== work.id)
          .sort((a, b) => {
            const aRelevance = getRelevanceScore(a, work);
            const bRelevance = getRelevanceScore(b, work);
            return bRelevance - aRelevance;
          })
          .slice(0, 3);

        setRelatedWorks(related);
      }
    };

    fetchRelatedWorks();
  }, [work, works, getAllWorks]);

  const getRelevanceScore = (workA, workB) => {
    let score = 0;
    if (workA.genre === workB.genre) score += 2;
    if (workA.completionStatus === workB.completionStatus) score += 1;
    return score;
  };

  const shareOnSocialMedia = (platform) => {
    const url = window.location.href;
    const text = `Check out this work: ${work?.title}`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(text)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            url
          )}&title=${encodeURIComponent(work?.title)}`,
          "_blank"
        );
        break;
      default:
        console.error("Unsupported platform");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen pb-12">
        {/* Hero */}
        <div className="relative min-h-[80vh] overflow-hidden">
          <Image
            src={work?.coverImage}
            alt={work?.title}
            layout="fill"
            objectFit="cover"
            className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 blur-sm scale-[101%]"
          />
          <div className="absolute inset-0 flex gap-12 max-md:gap-12 items-center justify-center pt-20 max-md:flex-col">
            <Image
              src={work?.coverImage}
              alt={work?.title}
              width={600}
              height={500}
              className="h-96 w-64 rounded-sm object-cover shadow-xl"
            />
            <div className="flex flex-col justify-center items-start max-md:items-center">
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                {work?.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{formatTime(work?.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  <span>{work?.wordCount} words</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  <span>{work?.viewCount || 0} views</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {work?.tags?.map((tag) => {
                  return <Badge variant="secondary">{tag}</Badge>;
                })}
              </div>
              {/* <Badge variant="outline" className="mb-4">
              {work?.completionStatus}
              </Badge> */}
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="px-8 max-sm:px-4 mt-12">
          <div className="mb-8">
            <div className="prose prose-amber max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ __html: work?.content }} />
            </div>
            <Separator />
            <h2 className="text-lg font-normal mt-8">
              Written by <span className="font-semibold">Violet Clough</span>
            </h2>
          </div>

          {/* Share */}
          <Card className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Share with others</h2>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareOnSocialMedia("facebook")}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareOnSocialMedia("twitter")}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareOnSocialMedia("linkedin")}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
        <section className="grid grid-cols-3 max-md:grid-cols-1 px-8 gap-8 max-sm:px-4">
          {/* Comments */}
          <div className="md:col-span-2 max-md:order-2">
            <Comments workId={slug} />
          </div>
          {/* Related Works */}
          {relatedWorks && relatedWorks.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-8">Related Works</h2>
              <div className="grid grid-cols-1 gap-4">
                {relatedWorks?.map((relatedWork) => (
                  <Link href={`/works/${relatedWork.id}`} key={relatedWork.id}>
                    <Card className="flex items-center hover:bg-muted p-4">
                      <Image
                        src={relatedWork.coverImage}
                        alt={relatedWork.title}
                        width={100}
                        height={150}
                        className="rounded mr-4"
                      />
                      <div className="flex flex-col gap-1">
                        {/* <Badge variant="secondary" className="mb-2 w-fit">
                        {relatedWork.genre}
                      </Badge>{" "}
                       */}
                        <h3 className="text-lg font-bold mb-1">
                          {relatedWork.title}
                        </h3>
                        {/* <p className="flex items-center gap-1 text-sm mb-1 font-medium">
                        <BookOpen className="h-4 w-4" />
                        {relatedWork.completionStatus}
                      </p> */}
                        <p className="flex items-center gap-2 text-sm mb-1 font-medium">
                          <FileText className="h-4 w-4" />
                          {relatedWork.wordCount} words
                        </p>
                        {/* <p className="flex items-center gap-2 text-sm mb-1 font-medium">
                        <Eye className="h-4 w-4" />
                        {relatedWork.viewCount || 0} views
                      </p> */}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
