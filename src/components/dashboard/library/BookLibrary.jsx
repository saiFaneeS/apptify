import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLibrary } from "@/context/LibraryContext";
import AddNewBook from "./AddNewBook";
import BookCard from "./BookCard";
import {
  Loader2,
  Book,
  CheckCircle,
  BookOpen,
  Heart,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookLibrary = () => {
  const { books, getAllBooks, fetchingBooks } = useLibrary();
  const [activeTab, setActiveTab] = useState("all");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    setFilteredBooks(
      activeTab === "all"
        ? books
        : books?.filter((book) => book.status === activeTab)
    );
  }, [books, activeTab]);

  useEffect(() => {
    getAllBooks();
  }, []);

  const tabOptions = [
    { value: "all", label: "All Books", icon: Book },
    { value: "read", label: "Read", icon: CheckCircle },
    { value: "currently reading", label: "Reading", icon: BookOpen },
    { value: "favorite", label: "Favorites", icon: Heart },
    { value: "tbr", label: "To Be Read", icon: Clock },
  ];

  return (
    <div className="container mx-auto p-4 pt-24 min-h-screen">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <Select
              value={activeTab}
              onValueChange={(value) => setActiveTab(value)}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {tabOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <option.icon className="mr-2 h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="hidden l:block">
            <TabsList>
              {tabOptions.map((option) => (
                <TabsTrigger
                  key={option.value}
                  value={option.value}
                  className="flex items-center"
                >
                  <option.icon className="mr-2 h-4 w-4" />
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <AddNewBook />
        </div>
        <TabsContent value={activeTab}>
          {fetchingBooks ? (
            <div className="flex justify-center items-center h-[60vh]">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBooks?.map((book) => (
                <BookCard book={book} key={book.id} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookLibrary;
