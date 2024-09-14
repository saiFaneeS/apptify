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
} from "lucide-react";
import Layout from "../Layout";
import { useBlogs } from "@/context/BlogContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { formatTime } from "@/lib/formatTime";
import Comments from "@/components/blog/Comments";

const currentPost = {
  id: 1,
  title: "The Divine Comedy: A Journey Through the Afterlife",
  author: "Dante Alighieri",
  reviewer: "Friar Lawrence",
  date: "1321 AD",
  type: "review",
  content: `
    <p>In this masterpiece of Italian literature, Dante Alighieri takes readers on an allegorical journey through Hell, Purgatory, and Paradise. The Divine Comedy is not merely a tale of the afterlife, but a profound exploration of medieval Christian theology, philosophy, and politics.</p>
    
    <h2 style="font-weight: 700; font-size: 1.5rem; margin: 1rem 0 0.5rem 0;">The Structure of the Afterlife</h2>
    
    <p>Dante's vision of the afterlife is meticulously structured. Hell is depicted as nine concentric circles, each dedicated to punishing increasingly severe sins. Purgatory is a mountain with seven terraces, each corresponding to one of the seven deadly sins. Paradise is composed of nine celestial spheres, culminating in the Empyrean, where God resides.</p>
    
    <h2 style="font-weight: 700; font-size: 1.5rem; margin: 1rem 0 0.5rem 0;">Themes and Symbolism</h2>
    
    <p>Throughout the poem, Dante employs rich symbolism and allegory. The number three, representing the Holy Trinity, is a recurring motif. The journey itself symbolizes the soul's progression towards God, with Dante serving as an Everyman figure for humanity.</p>
    
    <h2 style="font-weight: 700; font-size: 1.5rem; margin: 1rem 0 0.5rem 0;">Literary and Historical Significance</h2>
    
    <p>The Divine Comedy is a cornerstone of the Western canon, influencing literature, art, and popular culture for centuries. It's also a valuable historical document, providing insights into medieval Italian politics and the state of Christian theology in the 14th century.</p>
    
    <h2 style="font-weight: 700; font-size: 1.5rem; margin: 1rem 0 0.5rem 0;">Conclusion</h2>
    
    <p>Dante's Divine Comedy remains a timeless masterpiece, as relevant today as it was 700 years ago. Its exploration of human nature, morality, and the divine continues to resonate with readers, making it an essential read for anyone interested in literature, philosophy, or theology.</p>
  `,
  image: "/hp1.webp",
  rating: 5,
};

const relatedPosts = [
  {
    id: 2,
    title: "Beowulf: The Heroic Epic",
    excerpt:
      "Explore the Old English epic poem of heroism and monster-slaying...",
    image: "/cp.png",
    type: "review",
  },
  {
    id: 3,
    title: "The Canterbury Tales: Chaucer's Masterpiece",
    excerpt:
      "A collection of stories that paint a vivid picture of medieval English society...",
    image: "/tr.png",
    type: "review",
  },
  {
    id: 4,
    title: "Medieval Illuminated Manuscripts: Art and Literature",
    excerpt:
      "Discover the intricate artistry behind medieval book production...",
    image: "/bg1.jpg",
    type: "blog",
  },
];

export default function SinglePostPage() {
  const { incrementViewCount, getBlogById, blog } = useBlogs();

  const router = useRouter();

  const { slug } = router.query;

  useEffect(() => {
    getBlogById(slug);

    const timer = setTimeout(() => {
      incrementViewCount(slug);
      console.log("incrementing view count");
    }, 1000);
    console.log(blog);
    return () => clearTimeout(timer);
  }, [slug]);

  return (
    <Layout>
      <div className="bg50 min-h-screen pb-12">
        {/* Hero Section */}
        <div className="relative h-96 bg800">
          <Image
            src={currentPost.image}
            alt={currentPost.title}
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text100">
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 text-center px-4">
              {blog?.title}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatTime(blog?.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>
                  {currentPost.type === "review"
                    ? currentPost.reviewer
                    : currentPost.author}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="container mx-auto px-4 py-8">
          <article className="bg100 rounded-lg shadow-lg p-6 mb-8">
            <div className="prose prose-amber max-w-none">
              <div dangerouslySetInnerHTML={{ __html: currentPost?.content }} />
            </div>

            {currentPost?.type === "review" && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold font-serif text900 mb-2">
                  Rating
                </h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < currentPost.rating
                          ? "text-yellow-500 fill-current"
                          : "text300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-2xl font-bold font-serif text900 mb-2">
                About the {currentPost.type === "review" ? "Author" : "Scribe"}
              </h3>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage
                    src="/placeholder.svg?height=50&width=50"
                    alt={
                      currentPost.type === "review"
                        ? currentPost.author
                        : currentPost.reviewer
                    }
                  />
                  <AvatarFallback>
                    {currentPost.type === "review"
                      ? currentPost.author[0]
                      : currentPost.reviewer[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">
                    {currentPost.type === "review"
                      ? currentPost.author
                      : currentPost.reviewer}
                  </p>
                  <p className="text-sm text700">
                    Renowned{" "}
                    {currentPost.type === "review" ? "Author" : "Scholar"} of
                    the Medieval Era
                  </p>
                </div>
              </div>
            </div>
          </article>

          <div className="bg100 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold font-serif text900 mb-4">
              Share this{" "}
              {currentPost.type === "review" ? "Review" : "Chronicle"}
            </h2>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg100 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold font-serif text900 mb-4">
              Related Scrolls
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg50 border border200 rounded-lg overflow-hidden shadow-md"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold font-serif text900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text700 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center">
                      {post.type === "blog" ? (
                        <Scroll className="w-5 h-5 text700 mr-2" />
                      ) : (
                        <Book className="w-5 h-5 text700 mr-2" />
                      )}
                      <span className="text-sm font-medium text700">
                        {post.type === "blog" ? "Chronicle" : "Tome Review"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        <Comments />
      </div>
    </Layout>
  );
}
