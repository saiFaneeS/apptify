import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Scroll,
  Book,
  Calendar,
  User,
  Star,
  Pen,
} from "lucide-react";
import Layout from "../Layout";
import { useBlogs } from "@/context/BlogContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formatTime } from "@/lib/formatTime";
import Comments from "@/components/blog/Comments";
import { useUser } from "@/context/UserContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function SinglePostPage() {
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const { incrementViewCount, getBlogById, getAllBlogs, blog, blogs } =
    useBlogs();
  const { userProfile } = useUser();

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    getBlogById(slug);

    const timer = setTimeout(() => {
      incrementViewCount(slug);
    }, 1000);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      if (!blogs || blogs.length === 0) {
        await getAllBlogs();
      }

      if (blog && blogs && blogs.length > 0) {
        const related = blogs
          .filter((b) => b.id !== blog.id)
          .sort((a, b) => {
            const aRelevance = getRelevanceScore(a, blog);
            const bRelevance = getRelevanceScore(b, blog);
            return bRelevance - aRelevance;
          })
          .slice(0, 3);

        setRelatedBlogs(related);
      }
    };

    fetchRelatedBlogs();
  }, [blog, blogs]);

  const getRelevanceScore = (blogA, blogB) => {
    let score = 0;
    if (blogA.category === blogB.category) score += 2;
    if (blogA.bookAuthor === blogB.bookAuthor) score += 3;

    return score;
  };

  const shareOnSocialMedia = (platform) => {
    const url = window.location.href;
    const text = `Check out this book review: ${blog?.title}`;

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
          )}&title=${encodeURIComponent(blog?.title)}`,
          "_blank"
        );
        break;
      default:
        console.error("Unsupported platform");
    }
  };

  const handleShare = () => {
    const subject = "Check out this awesome review!";
    const body = "I found this great review. You should take a look!";
    shareViaEmail(subject, body);
  };

  function shareViaEmail(subject, body) {
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  return (
    <Layout>
      <div className="min-h-screen pb-12">
        {/* Hero */}
        <div className="relative min-h-[80vh] overflow-hidden">
          <Image
            src={blog?.coverImage}
            alt={blog?.title}
            width={300}
            height={200}
            className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-30 blur-sm scale-[101%]"
          />
          <Image
            src={blog?.coverImage}
            alt={blog?.title}
            width={300}
            height={200}
            className="absolute left-1/2 -translate-x-1/2 w-4/5 top object-cover -z-10 opacity-30 blur-md rounded-lg"
          />

          <div className="absolute inset-0 flex gap-12 max-md:gap-6 items-center justify-center pt-20 max-md:flex-col">
            {blog?.coverImage ? (
              <Image
                src={blog?.coverImage}
                alt={blog?.title}
                width={300}
                height={200}
                className="h-40 w-28 top object-cover shadow-xl"
              />
            ) : (
              <div className="h-40 w-28 bg-gray-400 dark:bg-neutral-800 rounded-lg shadow-xl animate-pulse"></div>
            )}
            <div className="flex flex-col justify-center items-start max-md:items-center max-md:px-4">
              {blog?.title ? (
                <h1 className="text-3xl md:text-4xl font-semibold mb-4 max-md:text-center">
                  {blog?.title}
                </h1>
              ) : (
                <div className="h-10 w-64 bg-gray-400 dark:bg-neutral-800 rounded mb-4 animate-pulse"></div>
              )}
              <div className="flex items-center space-x-4 flex-wrap max-md:justify-center gap-2">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {blog?.createdAt && (
                    <span>{formatTime(blog?.createdAt)}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <Book className="w-5 h-5 mr-2" />
                  <span>{blog?.bookName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 max-sm:px-4 mt-12">
          <div className="mb-8">
            <div className="content-styles mb-8">
              <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </div>
            <Separator />
            {/* Rating */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Rating</h2>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < blog?.rating
                        ? "text-yellow-500 fill-current"
                        : "text300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Scribe</h2>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={userProfile?.avatarUrl} alt={"VC"} />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">Violet Clough</p>
                </div>
              </div>
            </div>
          </div>

          {/* Share */}
          <Card className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Share this Review</h2>
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
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        <section className="grid grid-cols-3 max-md:grid-cols-1 px-8 gap-8 max-sm:px-4">
          {/* Comments */}
          <div className="md:col-span-2 max-md:order-2">
            <Comments />
          </div>
          {/* More */}
          <div>
            <h2 className="text-2xl font-semibold mb-8">Related Scrolls</h2>
            <div className="grid grid-cols-1 gap-4">
              {relatedBlogs?.map((review) => (
                <Link href={`/reviews/${review.id}`} key={review.id}>
                  <Card
                    key={review.id}
                    className="flex items-center hover:bg-foreground/5"
                  >
                    <Image
                      src={review.coverImage}
                      alt={review.title}
                      width={100}
                      height={150}
                      className="rounded mr-4"
                    />
                    <div className="flex flex-col gap-1">
                      <Badge className="mb-2 w-fit capitalize">
                        {review.category}
                      </Badge>
                      <h3 className="text-lg font-bold mb-1">{review.title}</h3>
                      <p className="flex items-center gap-1 text-sm mb-1 font-medium">
                        <Book className="h-4 w-4" />
                        {review.bookName}
                      </p>
                      <p className="flex items-center gap-2 text-sm mb-1 font-medium">
                        <Pen className="h-4 w-4" />
                        {review.bookAuthor}
                      </p>
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
          </div>{" "}
        </section>
      </div>
    </Layout>
  );
}
