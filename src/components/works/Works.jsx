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
} from "lucide-react";
import { useWorks } from "@/context/WorkContext";
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

export default function Works() {
  const { works, getAllWorks } = useWorks();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [sortOption, setSortOption] = useState("date");
  const [isListView, setIsListView] = useState(true);

  useEffect(() => {
    if (!works || works?.length === 0) {
      getAllWorks();
    }
  }, [works, getAllWorks]);

  useEffect(() => {
    if (works) {
      const filtered = works.filter(
        (work) =>
          work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          work.synopsis.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWorks(sortWorks(filtered));
    }
  }, [works, searchTerm, sortOption]);

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
              placeholder="Search works..."
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
            {["date", "title", "status", "popularity"].map((option) => (
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
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {["date", "title", "status", "popularity"].map((option) => (
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
          className={
            isListView
              ? "space-y-4"
              : "grid gap-8 grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5"
          }
        >
          {filteredWorks.map((work) => (
            <Card
              key={work.id}
              className={`relative ${
                isListView ? "flex p-3" : "flex flex-col"
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
                  <h3 className="text-base font-semibold">{work.title}</h3>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-xs">{work.datePublished}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    <span className="text-xs">{work.wordCount} words</span>
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
