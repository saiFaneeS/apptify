import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLibrary } from "@/context/LibraryContext";
import AddNewBook from "./AddNewBook";
import BookCard from "./BookCard";
import {
  Loader2,
  Book,
  Heart,
  BookCheck,
  BookMarked,
  LucideGlasses,
  Grid,
  List,
  LibraryBig,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BookLibrary = () => {
  const { books, getAllBooks, fetchingBooks } = useLibrary();
  const [activeTab, setActiveTab] = useState("all");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!books || books.length === 0) {
      getAllBooks();
    }
  }, [books, getAllBooks]);

  const filterAndSortBooks = useCallback(() => {
    if (books) {
      return books.filter((book) =>
        activeTab === "all"
          ? book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchTerm.toLowerCase())
          : book.status === activeTab &&
            (book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              book.author?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return [];
  }, [books, activeTab, searchTerm]);

  useEffect(() => {
    setIsSearching(true);
    const debounceTimer = setTimeout(() => {
      setFilteredBooks(filterAndSortBooks());
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [books, activeTab, searchTerm, filterAndSortBooks]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const tabOptions = [
    { value: "all", label: "All Books", icon: Book },
    { value: "read", label: "Read", icon: BookCheck },
    { value: "currently reading", label: "Reading", icon: LucideGlasses },
    { value: "favorite", label: "Favorites", icon: Heart },
    { value: "tbr", label: "To Be Read", icon: BookMarked },
  ];

  const getStatistics = () => {
    const total = books?.length || 0;
    const read = books?.filter((book) => book.status === "read").length || 0;
    const reading =
      books?.filter((book) => book.status === "currently reading").length || 0;
    const favorites =
      books?.filter((book) => book.status === "favorite").length || 0;
    const tbr = books?.filter((book) => book.status === "tbr").length || 0;

    return { total, read, reading, favorites, tbr };
  };

  const stats = getStatistics();

  return (
    <div className="min-h-screen px-8 max-sm:px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="flex gap-2 items-center text-xl font-medium">
          <LibraryBig className="h-6 w-6" strokeWidth={1.6} />
          My Library
        </h1>
        <AddNewBook />
      </div>

      {/* Statistics Bar */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {[
              {
                label: "Total Books",
                value: stats.total,
                icon: Book,
                color: "text-primary",
              },
              {
                label: "Read",
                value: stats.read,
                icon: BookCheck,
                color: "text-green-500",
              },
              {
                label: "Reading",
                value: stats.reading,
                icon: LucideGlasses,
                color: "text-blue-500",
              },
              {
                label: "Favorites",
                value: stats.favorites,
                icon: Heart,
                color: "text-red-500",
              },
              {
                label: "To Be Read",
                value: stats.tbr,
                icon: BookMarked,
                color: "text-yellow-500",
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <item.icon className={`h-6 w-6 mb-2 ${item.color}`} />
                <span className="text-lg font-semibold">{item.value}</span>
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Reading Progress</span>
              <span className="text-sm font-medium">
                {Math.round((stats.read / stats.total) * 100)}%
              </span>
            </div>
            <Progress
              value={(stats.read / stats.total) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2 w-full sm:w-auto order-2 sm:order-1">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search books..."
              className="pl-9 pr-4 py-2"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
          {isSearching && (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          )}
        </div>
        <div className="flex items-center gap-2 order-1 sm:order-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={activeTab}
                onValueChange={setActiveTab}
              >
                {tabOptions.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.value}
                    value={option.value}
                  >
                    <div className="flex items-center">
                      <option.icon className="mr-2 h-4 w-4" />
                      {option.label}
                    </div>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
          >
            {layout === "grid" ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Book List */}
      {fetchingBooks ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      ) : (
        <div
          className={
            layout === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "flex flex-col gap-4"
          }
        >
          {filteredBooks?.map((book) => (
            <BookCard book={book} key={book.id} layout={layout} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookLibrary;
