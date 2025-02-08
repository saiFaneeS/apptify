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
  Loader2,
} from "lucide-react";
import { useBlogs } from "@/context/BlogContext";
import { useEffect, useState, useCallback } from "react";
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
import { Separator } from "../ui/separator";

export default function Main() {
  const { blogs, getAllBlogs } = useBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [sortOption, setSortOption] = useState("date");
  const [isListView, setIsListView] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!blogs || blogs?.length === 0) {
      getAllBlogs();
    }
  }, [blogs, getAllBlogs]);

  const filterAndSortBlogs = useCallback(() => {
    if (blogs) {
      const filtered = blogs.filter(
        (blog) =>
          blog.isPublished &&
          (blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.bookName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.bookAuthor?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      return sortBlogs(filtered);
    }
    return [];
  }, [blogs, searchTerm, sortOption]);

  useEffect(() => {
    setIsSearching(true);
    const debounceTimer = setTimeout(() => {
      setFilteredBlogs(filterAndSortBlogs());
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [blogs, searchTerm, sortOption, filterAndSortBlogs]);

  const sortBlogs = (blogs) => {
    switch (sortOption) {
      case "date":
        return [...blogs].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "title":
        return [...blogs].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return blogs;
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="p-page-sides">
      <div className="mb-4">
        <div className="flex gap-2 justify-between items-center">
          <div className="w-full">
            <Input
              type="search"
              placeholder="Search blogs..."
              className="bg100 text900 placeholder700"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
          <Button className="flex items-center md:px-12">
            {isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            {isSearching ? "" : "Find"}
          </Button>
        </div>
      </div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" />
          <span className="text-sm font-medium text-nowrap">Sort by:</span>
          <div className="hidden md:flex gap-2">
            {["date", "title"].map((option) => (
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
                {["date", "title"].map((option) => (
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
              : "grid gap-8 max-md:gap-4 max-sm:gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {filteredBlogs.map((post) => (
            <>
              <div
                key={post.id}
                className={`relative ${
                  isListView ? "flex p-3 flex-col sm:flex-row" : "flex flex-col max-md:p-3"
                } items-start justify-start gap-4 animate-in fade-in-50 slide-in-from-bottom-10 duration-300`}
              >
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={300}
                  height={200}
                  className={`${
                    isListView ? "aspect-video" : "aspect-video"
                  } object-cover rounded relative z-20`}
                />
                <div className="w-full flex flex-col gap-2 justify-between h-full text-foreground">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold line-clamp-2">
                      {post.title}
                    </h3>
                    {post?.content && (
                      <div
                        className="text-xs line-clamp-1 text-foreground/60"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    )}

                    {/* {post?.bookAuthor && (
                    <div className="flex items-center">
                      <Feather className="w-4 h-4 mr-2" />
                      <span className="text-xs">{post.bookAuthor}</span>
                    </div>
                  )} */}
                    <div className="flex items-center">
                      <span className="ml-1 w-2 h-2 mr-2 bg-primary rounded-full" />
                      <span className="text-xs">
                        {formatTime(post.createdAt)}
                      </span>
                    </div>
                  </div>
                  <Link href={`/blogs/${post.id}`} className="mt-1 w-fit">
                    <Button
                      variant="outline"
                      className="text-sm w-fit hover:underline"
                    >
                      View Post
                    </Button>
                  </Link>
                </div>
              </div>
              <Separator className={`${!isListView ? "hidden" : ""}`} />
            </>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
}
