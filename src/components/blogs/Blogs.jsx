import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Book,
  Star,
  Feather,
  Calendar,
  Search,
  ArrowUpDown,
  Grid,
  List,
} from "lucide-react";
import { useBlogs } from "@/context/BlogContext";
import { useEffect, useState } from "react";
import { formatTime } from "@/lib/formatTime";
import Link from "next/link";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import Loading from "../Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Main() {
  const { blogs, getAllBlogs } = useBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [sortOption, setSortOption] = useState("date");
  const [isListView, setIsListView] = useState(true);

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
      <div className="mb-4">
        <form
          onSubmit={handleSearch}
          className="flex gap-2 justify-between items-center"
        >
          <div className="w-full">
            <Input
              type="search"
              placeholder="Search reviews..."
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
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" />
          <span className="text-sm font-medium text-nowrap">Sort by:</span>
          <div className="hidden md:flex gap-2">
            {["date", "rating", "title"].map((option) => (
              <Button
                key={option}
                size="sm"
                variant={sortOption === option ? "secondary" : "outline"}
                onClick={() => setSortOption(option)}
                className="h-8 p-3"
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Button>
            ))}
          </div>
          <div className="md:hidden">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {["date", "rating", "title"].map((option) => (
                  <SelectItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Grid size={20} />
          <Switch
            checked={isListView}
            onCheckedChange={setIsListView}
            aria-label="Toggle view"
          />
          <List size={20} />
        </div>
      </div>
      {blogs ? (
        <div
          className={`${
            isListView
              ? "space-y-4"
              : "grid gap-8 max-md:gap-4 max-sm:gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5"
          } animate-in fade-in-100 slide-in-from-bottom-10 duration-300`}
        >
          {filteredBlogs.slice(0, 6).map((post) => (
            <Card
              key={post.id}
              className={`relative ${
                isListView ? "flex p-3" : "flex flex-col max-md:p-3"
              } items-start justify-start gap-4`}
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                width={300}
                height={200}
                className={`${
                  isListView ? "w-32 h-48" : "w-full aspect-[0.7]"
                } object-cover rounded-sm relative z-20`}
              />
              <div className="w-full flex flex-col gap-2 justify-between h-full text-foreground">
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold line-clamp-1">
                    {post.title}
                  </h3>
                  <div className="flex items-center mt-1">
                    <Book className="w-4 h-4 mr-2" />
                    <span className="text-xs">{post.bookName}</span>
                  </div>
                  <div className="flex items-center">
                    <Feather className="w-4 h-4 mr-2" />
                    <span className="text-xs">{post.bookAuthor}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-xs">
                      {formatTime(post.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">
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
                </div>
                <Link href={`/reviews/${post.id}`} className="mt-1">
                  <Button variant="outline">Read Review</Button>
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
