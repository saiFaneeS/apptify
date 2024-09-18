import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Book,
  Star,
  Feather,
  Calendar,
  Search,
  ArrowUpDown,
  Loader2,
} from "lucide-react";
import { useBlogs } from "@/context/BlogContext";
import { useEffect, useState } from "react";
import { formatTime } from "@/lib/formatTime";
import Link from "next/link";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import Loading from "../Loading";

export default function Main() {
  const { blogs, getAllBlogs } = useBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    if (!blogs || blogs?.length === 0) {
      getAllBlogs();
    }
  }, [blogs, getAllBlogs]);

  useEffect(() => {
    if (blogs) {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(sortBlogs(filtered));
    }
  }, [blogs, searchTerm, sortOption]);

  const sortBlogs = (blogs) => {
    switch (sortOption) {
      case "date":
        return [...blogs].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "rating":
        return [...blogs].sort((a, b) => b.rating - a.rating);
      case "title":
        return [...blogs].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return blogs;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // The search is already handled by the useEffect above
  };

  return (
    <section className="px-8 max-sm:px-4 mb-12">
      <h2 className="text-2xl font-semibold mb-6">All Reviews</h2>
      {/* Search bar */}
      <div className="mb-4">
        <form
          onSubmit={handleSearch}
          className="flex gap-2 justify-between items-center"
        >
          <div className="w-full">
            <Input
              type="search"
              placeholder="Search tomes..."
              className="bg100 text900 placeholder700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" className="flex items-center md:px-12">
            <Search className="mr-2 h-4 w-4" />
            Find
          </Button>
        </form>
      </div>
      {/* Sort options */}
      <div className="mb-6 flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4" />
        <span className="text-sm font-medium">Sort by:</span>
        <div className="flex gap-2">
          {["date", "rating", "title"].map((option) => (
            <Button
              key={option}
              size="sm"
              variant={sortOption === option ? "default" : "outline"}
              onClick={() => setSortOption(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      {/* Books */}
      {blogs ? (
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {filteredBlogs.slice(0, 6).map((post) => (
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
                  <span className="text-sm">{formatTime(post.createdAt)}</span>
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
                  <Button className="w-full" size="sm" variant="outline">
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
    </section>
  );
}
