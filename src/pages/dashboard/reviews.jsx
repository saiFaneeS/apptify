"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Book,
  Feather,
  List,
  PenLine,
  ScrollText,
  Sparkle,
  Star,
  User2,
  View,
} from "lucide-react";
import Image from "next/image";
import DashLayout from "../DashLayout";
import { AddNewBlogDialog } from "@/components/dashboard/AddNewBlogDialog";
import { useAuth } from "@/context/AuthContext";
import { useBlogs } from "@/context/BlogContext";
import BooksDataTable from "@/components/dashboard/BooksDataTable";
import SetFeaturedBlogModal from "@/components/dashboard/SetFeaturedBlogModal";
import { useQuote } from "@/hooks/useQuote";
import { Separator } from "@/components/ui/separator";

export default function CMSDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const { blogs, getAllBlogs, fetchingBlogs, featuredBlog } = useBlogs();
  const { quote } = useQuote();

  const filteredBlogs = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (user && (!blogs || blogs.length === 0)) {
      getAllBlogs();
    }
  }, [user, blogs, getAllBlogs]);

  return (
    <DashLayout>
      <div className="pt-14">
        <div className="px-8 max-sm:px-4 py-8">
          <div className="flex justify-between items-center gap-2 mb-4">
            <div className="flex gap-2 items-center text-xl font-medium">
              {/* <ScrollText className="h-5 w-5" /> */}
              My Reviews
            </div>
            <div className="w-fit">
              <AddNewBlogDialog />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 mb-8">
            {/* Overview */}
            <Card className="">
              <CardContent className="flex flex-col gap-5">
                <h2 className="flex gap-2 items-center text-lg font-semibold ">
                  Overview
                </h2>
                <Separator />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-2 px-4 bg-muted/50 rounded-sm shadow-sm">
                    <span className="text-sm text-muted-foreground">
                      Total Reviews
                    </span>
                    <span className="text-xl font-semibold text-primary">
                      {blogs?.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 px-4 bg-muted/50 rounded-sm shadow-sm">
                    <span className="text-sm text-muted-foreground">
                      Published
                    </span>
                    <span className="text-xl font-semibold text-green-500">
                      {
                        blogs?.filter((blog) => blog.isPublished === true)
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 px-4 bg-muted/50 rounded-sm shadow-sm">
                    <span className="text-sm text-muted-foreground">
                      Drafts
                    </span>
                    <span className="text-xl font-semibold text-yellow-500">
                      {
                        blogs?.filter((blog) => blog.isPublished === false)
                          .length
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Featured Review*/}
            <Card className="overflow-hidden">
              <CardContent className="flex flex-col h-full gap-4">
                <div className="flex justify-between items-center gap-2">
                  <h2 className="flex gap-2 items-center text-lg font-semibold">
                    <Sparkle className="w-5 h-5" />
                    Featured Review
                  </h2>
                  <SetFeaturedBlogModal currentFeaturedBlog={featuredBlog} />
                </div>{" "}
                <Separator className="mb-1" />
                {featuredBlog !== null && featuredBlog !== undefined ? (
                  <div className="flex items-start gap-4 h-full">
                    <div className="relative h-full aspect-[0.7] rounded overflow-hidden shrink-0 bg-foreground/5">
                      <Image
                        src={featuredBlog?.coverImage}
                        layout="fill"
                        objectFit="cover"
                        alt={featuredBlog?.title}
                      />
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <h3 className="text-base font-medium line-clamp-2">
                        {featuredBlog?.title}
                      </h3>
                      <p className="flex gap-2 items-center text-sm text-muted-foreground">
                        <Book size={18} /> {featuredBlog?.bookName}
                      </p>
                      <p className="flex gap-2 items-center text-sm text-muted-foreground">
                        <User2 size={18} /> {featuredBlog?.bookAuthor}
                      </p>
                      <p className="flex gap-2 items-center text-sm text-muted-foreground">
                        <View size={18} /> {featuredBlog?.viewCount || 0}
                      </p>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < featuredBlog?.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center flex-col gap-2 h-48">
                    No Blog Featured
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <BooksDataTable
            filteredBlogs={filteredBlogs}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            fetchingBlogs={fetchingBlogs}
          />
        </div>
      </div>
    </DashLayout>
  );
}
