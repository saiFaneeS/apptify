import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollText, Book, Filter, Star } from "lucide-react";
import Layout from "../Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import Hero from "@/components/blogs/Hero";
import Blogs from "@/components/blogs/Blogs";
import FeaturedBlogs from "@/components/blogs/FeaturedBlogs";

const posts = [
  {
    id: 1,
    title: "The Arthurian Legends: Fact or Fiction?",
    excerpt:
      "Delve into the mythical world of King Arthur and his Knights of the Round Table...",
    date: "1242 AD",
    author: "Sir Galahad the Wise",
    type: "blog",
    image: "/cp.png",
  },
  {
    id: 2,
    title: "Review: 'Beowulf' - A Tale of Heroism",
    excerpt:
      "An in-depth analysis of the Old English epic poem 'Beowulf' and its enduring legacy...",
    date: "1256 AD",
    author: "Lady Aethelflaed of Mercia",
    type: "review",
    image: "/cp.png",
  },
  {
    id: 3,
    title: "The Black Death: A Firsthand Account",
    excerpt:
      "A chilling narrative of the plague that swept through Europe in the 14th century...",
    date: "1349 AD",
    author: "Brother Cadfael",
    type: "blog",
    image: "/cp.png",
  },
];

const featuredReview = {
  id: 5,
  title: "The Divine Comedy: A Journey Through the Afterlife",
  author: "Dante Alighieri",
  reviewer: "Friar Lawrence",
  excerpt:
    "Dante's masterpiece takes readers on an allegorical journey through Hell, Purgatory, and Paradise. This epic poem is a cornerstone of Italian literature and Western canon...",
  image: "/hp1.webp",
};

const currentlyReading = [
  {
    id: 1,
    title: "Le Morte d'Arthur",
    author: "Sir Thomas Malory",
    progress: 65,
    image: "/tr.png",
  },
  {
    id: 2,
    title: "The Book of Margery Kempe",
    author: "Margery Kempe",
    progress: 30,
    image: "/tr.png",
  },
];

const popularReviews = [
  {
    id: 1,
    title: "Sir Gawain and the Green Knight",
    author: "Unknown",
    rating: 5,
    image: "/cp.png",
  },
  {
    id: 2,
    title: "The Decameron",
    author: "Giovanni Boccaccio",
    rating: 4,
    image: "/cp.png",
  },
  {
    id: 3,
    title: "Piers Plowman",
    author: "William Langland",
    rating: 4,
    image: "/cp.png",
  },
];

export default function ReviewsPage() {
  return (
    <Layout>
      <div className="bg100 min-h-screen pt-20">
        {/* <Hero /> */}
        <div className="">
          <Blogs />
          <FeaturedBlogs />

          {/* Currently Reading Section */}
          <section className="p-12 bg50">
            <h2 className="text-3xl font-bold font-serif text900 mb-6">
              Currently Perusing
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {currentlyReading.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center bg100 rounded-lg p-4 shadow-md"
                >
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={100}
                    height={150}
                    className="rounded mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold font-serif text900 mb-1">
                      {book.title}
                    </h3>
                    <p className="text800 text-sm mb-2">By {book.author}</p>
                    <Progress value={book.progress} className="mb-2" />
                    <p className="text700 text-sm">{book.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Reviews Section */}
          <section className="p-12 bg50">
            <h2 className="text-3xl font-bold font-serif text900 mb-6">
              Popular Tome Reviews
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {popularReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex items-center bg100 rounded-lg p-4 shadow-md"
                >
                  <Image
                    src={review.image}
                    alt={review.title}
                    width={100}
                    height={150}
                    className="rounded mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-bold font-serif text900 mb-1">
                      {review.title}
                    </h3>
                    <p className="text800 text-sm mb-2">By {review.author}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-500 fill-current"
                              : "text300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
