import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Book,
  Calendar,
  Search,
  ArrowUpDown,
  Grid,
  List,
  FileText,
  Eye,
  Clock,
  Loader2,
} from "lucide-react";
import { useWorks } from "@/context/WorkContext";
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

export default function Works() {
  const { works, getAllWorks } = useWorks();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [sortOption, setSortOption] = useState("date");
  const [isListView, setIsListView] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!works || works?.length === 0) {
      getAllWorks();
    }
  }, [works, getAllWorks]);

  const filterAndSortWorks = useCallback(() => {
    if (works) {
      const filtered = works.filter(
        (work) =>
          work.completionStatus === "completed" &&
          (work.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            work.synopsis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            work.tags?.some((tag) =>
              tag?.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
      return sortWorks(filtered);
    }
    return [];
  }, [works, searchTerm]);

  useEffect(() => {
    setIsSearching(true);
    const debounceTimer = setTimeout(() => {
      setFilteredWorks(filterAndSortWorks());
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [works, searchTerm, sortOption, filterAndSortWorks]);

  const sortWorks = (works) => {
    switch (sortOption) {
      case "date":
        return [...works].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "title":
        return [...works].sort((a, b) => a.title.localeCompare(b.title));
      case "status":
        return [...works].sort((a, b) =>
          a.completionStatus.localeCompare(b.completionStatus)
        );
      case "views":
        return [...works].sort((a, b) => b.viewCount - a.viewCount);
      default:
        return works;
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="px-8 max-sm:px-4 mb-12">
      <div className="mb-4">
        <div className="flex gap-2 justify-between items-center">
          <div className="w-full">
            <Input
              type="search"
              placeholder="Search works..."
              className="bg100 text900 placeholder700"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
          <Button className="flex items-center md:px-12" disabled={true}>
            {isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            {isSearching ? "" : "Find"}
          </Button>
        </div>
      </div>
      <div className="mb-6 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" />
          <span className="text-sm font-medium text-nowrap">Sort by:</span>
          <div className="hidden md:flex gap-2">
            {["date", "title", "popularity"].map((option) => (
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
                {["date", "title", "popularity"].map((option) => (
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
      {works ? (
        <div
          className={`${
            isListView
              ? "space-y-4"
              : "grid gap-8 max-md:gap-4 max-sm:gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5"
          } animate-in fade-in-100 slide-in-from-bottom-10 duration-300`}
        >
          {filteredWorks.map((work) => (
            <Card
              key={work.id}
              className={`relative ${
                isListView ? "flex p-3" : "flex flex-col max-md:p-3"
              } items-start justify-start gap-4`}
            >
              <Image
                src={work.coverImage}
                alt={work.title}
                width={300}
                height={200}
                className={`${
                  isListView ? "w-28 h-44" : "w-full aspect-[0.7]"
                } object-cover rounded-sm relative z-20`}
              />
              <div className="w-full flex flex-col gap-2 justify-between h-full text-foreground">
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold line-clamp-1">
                    {work.title}
                  </h3>
                  {work?.datePublished && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-xs">{work.datePublished}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    <span className="text-xs">
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
    </section>
  );
}
