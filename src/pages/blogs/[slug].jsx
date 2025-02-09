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
  Instagram,
  Link as LinkIcon,
  MoreHorizontal,
  Copy,
  MessageCircle,
  Share2,
  ArrowLeftToLine,
  Loader2,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export default function SinglePostPage() {
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [blog, setBlog] = useState([]);
  const { incrementViewCount, getAllBlogs, blogs } = useBlogs();
  const { userProfile } = useUser();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchBlog = () => {
      if (blogs && blogs.length > 0) {
        const foundBlog = blogs.find((blog) => blog.id === slug);
        console.log(foundBlog);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
        }
      }
    };

    fetchBlog();

    const timer = setTimeout(() => {
      incrementViewCount(slug);
    }, 1000);
    return () => clearTimeout(timer);
  }, [slug, blogs]);

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
          .slice(0, 1);

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
    const text = `Check this out: ${blog?.title}`;

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
      case "instagram":
        window.open(
          `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
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
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(
            text + " " + url
          )}`,
          "_blank"
        );
        break;
      default:
        console.error("Unsupported platform");
    }
  };

  const handleShare = () => {
    const subject = "Check out this out!";
    const body = "I found this great post. You should take a look!";
    shareViaEmail(subject, body);
  };

  function shareViaEmail(subject, body) {
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        toast({
          title: "Link copied!",
          description: "The link has been copied to your clipboard.",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <Layout>
      <div className="min-h-screen pb-12">
        {/* Hero */}
        <div className="relative min-h-[80vh] overflow-hidden border-b border-border">
          <Image
            src={blog?.coverImage}
            alt={blog?.title}
            width={700}
            height={500}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-20 scale-[101%]"
          />
          {/* <Image
            src={blog?.coverImage}
            alt={blog?.title}
            width={300}
            height={200}
            className="absolute left-1/2 -translate-x-1/2 w-4/5 top object-cover opacity-20 blur-sm rounded-lg"
          /> */}

          <div className="max-w-4xl mx-auto absolute inset-0 flex gap-12 max-md:gap-6 items-center justify-center pt-24 pb-8 max-md:flex-col">
            {blog?.coverImage ? (
              <Image
                src={blog?.coverImage}
                alt={blog?.title}
                width={300}
                height={200}
                className="aspect-video top object-cover shadow-xl"
              />
            ) : (
              <div className="aspect-video h-40 max-sm:w-64 bg-gray-300 dark:bg-neutral-800 rounded-lg shadow-xl animate-pulse"></div>
            )}
            <div className="flex flex-col justify-center items-start max-md:items-center max-md:px-4">
              {blog?.title ? (
                <h1 className="text-2xl md:text-3xl font-semibold mb-4 max-md:text-center">
                  {blog?.title}
                </h1>
              ) : (
                <div className="h-10 w-64 bg-gray-300 dark:bg-neutral-800 rounded mb-4 animate-pulse"></div>
              )}
              <div className="text-sm flex items-center space-x-4 flex-wrap max-md:justify-center gap-2">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  {blog?.createdAt && (
                    <span>{formatTime(blog?.createdAt)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 max-sm:px-4 mt-12 max-w-screen-lg mx-auto">
          <div className="mb-8">
            <div className="content-styles mb-8">
              <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </div>
            <Separator />
            <div className="flex justify-between items-center gap-4 mt-8 flex-wrap gap-y-8">
              <div className="flex max-md:justify-end max-md:w-full">
                <Link href={`/blogs`}>
                  <Button variant="" className="flex items-center gap-2">
                    <ArrowLeftToLine size={16} />
                    Back to all posts
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Share */}
          <Card className="mb-12 p-4 flex gap-4 justify-between items-center flex-wrap max-w-screen-lg mx-auto">
            <h2 className="text-lg font-medium text-left">Spread the Word!</h2>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={copyLinkToClipboard}
                className="hover:bg-foreground/20 dark:hover:bg-foreground/20 transition-colors"
              >
                <LinkIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareOnSocialMedia("facebook")}
                className="hover:bg-blue-600 dark:hover:bg-blue-600  hover:text-white transition-colors max-sm:hidden"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareOnSocialMedia("twitter")}
                className="hover:bg-blue-400 dark:hover:bg-blue-400 hover:text-white transition-colors max-sm:hidden"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Dialog
                open={isShareModalOpen}
                onOpenChange={setIsShareModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Share2 size={20} /> Share this Post
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <Button
                      variant="outline"
                      onClick={copyLinkToClipboard}
                      className="flex flex-col items-center justify-center h-20 p-2 pt-3 text-sm"
                    >
                      <Copy className="h-6 w-6 mb-2" />
                      Copy Link
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => shareOnSocialMedia("facebook")}
                      className="flex flex-col items-center justify-center h-20 p-2 pt-3 text-sm"
                    >
                      <Facebook className="h-6 w-6 mb-2" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => shareOnSocialMedia("twitter")}
                      className="flex flex-col items-center justify-center h-20 p-2 pt-3 text-sm"
                    >
                      <Twitter className="h-6 w-6 mb-2" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => shareOnSocialMedia("linkedin")}
                      className="flex flex-col items-center justify-center h-20 p-2 pt-3 text-sm"
                    >
                      <Linkedin className="h-6 w-6 mb-2" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleShare}
                      className="flex flex-col items-center justify-center h-20 p-2 pt-3 text-sm"
                    >
                      <Mail className="h-6 w-6 mb-2" />
                      Gmail
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => shareOnSocialMedia("whatsapp")}
                      className="flex flex-col items-center justify-center h-20 p-2 pt-3 text-sm"
                    >
                      <MessageCircle className="h-6 w-6 mb-2" />
                      WhatsApp
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </div>

        <section className="grid  px-8 gap-8 max-sm:px-4 max-w-screen-lg mx-auto">
          {/* Comments */}
          <div
            className={`${
              relatedBlogs?.length > 0
                ? "md:col-span-2 max-md:order-2"
                : "md:col-span-3"
            }`}
          >
            <Comments />
          </div>
          {/* More */}
          {/* {relatedBlogs?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Related Scroll</h2>
              <div className="grid grid-cols-1 gap-4">
                {relatedBlogs?.map((review) => (
                  <Link href={`/blogs/${review.id}`} key={review.id}>
                    <Card
                      key={review.id}
                      className="flex gap-4 items-center hover:bg-foreground/5"
                    >
                      <Image
                        src={review.coverImage}
                        alt={review.title}
                        width={300}
                        height={200}
                        className="w-32 h-48 object-cover rounded-sm relative z-20"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="text-base font-semibold line-clamp-2">
                          {review.title}
                        </h3>
                        {review?.content && (
                          <div
                            className="text-xs line-clamp-1"
                            dangerouslySetInnerHTML={{
                              __html: review?.content,
                            }}
                          />
                        )}
                        {review.bookName && (
                          <p className="flex items-center gap-1 text-sm mb-1 font-medium">
                            <Book className="h-4 w-4" />
                            {review.bookName}
                          </p>
                        )}
                        {review.bookAuthor && (
                          <p className="flex items-center gap-2 text-sm mb-1 font-medium">
                            <Pen className="h-4 w-4" />
                            {review.bookAuthor}
                          </p>
                        )}
                        {review.rating && (
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
                        )}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )} */}
        </section>
      </div>
    </Layout>
  );
}
