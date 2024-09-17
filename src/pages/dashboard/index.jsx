"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Star } from "lucide-react";
import Image from "next/image";
import DashLayout from "../DashLayout";
import { AddNewBlogDialog } from "@/components/dashboard/AddNewBlogDialog";
import { useAuth } from "@/context/AuthContext";
import { useBlogs } from "@/context/BlogContext";
import BooksDataTable from "@/components/dashboard/BooksDataTable";
import Goals from "@/components/dashboard/Goals";
import SetFeaturedBlogModal from "@/components/dashboard/SetFeaturedBlogModal";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/UserContext";

export default function CMSDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const { userProfile } = useUser();
  const { blogs, getAllBlogs, fetchingBlogs, featuredBlog } = useBlogs();

  const filteredBlogs = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllBlogs();
  }, [user]);

  return (
    <DashLayout>
      <div className="min-h-screen pt-16">
        <div className="container mx-auto p-8 px-4">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-lg p-6 mb-8">
            <Image
              src="/bg1.jpg"
              alt="Medieval castle background"
              layout="fill"
              objectFit="cover"
              priority
              className="absolute z-0 brightness-50 saturate-0"
            />
            <div className="relative z-10 text-white">
              <h2 className="text-2xl font-semibold mb-2">
                Welcome back, {userProfile?.name}!
              </h2>
              <p className="text-base">
                May your quill be sharp and your ink never run dry.
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 mb-8">
            {/* Overview */}
            <Card className="">
              <CardContent className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold flex items-center text800">
                  <Book className="w-5 h-5 mr-2" />
                  Library Overview
                </h2>
                <div className="flex justify-between text800">
                  <span>Total Book Reviews:</span>
                  <span className="font-bold">{blogs?.length}</span>
                </div>
                <div className="flex justify-between text800">
                  <span>Published Reviews:</span>
                  <span className="font-bold">
                    {blogs?.filter((blog) => blog.isPublished === true).length}
                  </span>
                </div>
                <div className="flex justify-between text800">
                  <span>Drafts:</span>
                  <span className="font-bold">
                    {blogs?.filter((blog) => blog.isPublished === false).length}
                  </span>
                </div>
              </CardContent>
            </Card>{" "}
            {/* Featured */}
            <Card className="overflow-hidden">
              <CardContent>
                <h2 className="text-2xl font-semibold flex items-center mb-4">
                  <Book className="w-5 h-5 mr-2" />
                  Featured Blog
                </h2>
                {featuredBlog !== null && featuredBlog !== undefined ? (
                  <div className="flex items-start gap-4">
                    <div className="relative h-28 w-20 rounded-lg overflow-hidden shrink-0 bg-foreground/5">
                      <Image
                        src={featuredBlog?.coverImage}
                        layout="fill"
                        objectFit="cover"
                        alt={featuredBlog?.title}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-semibold line-clamp-2">
                        {featuredBlog?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Book: {featuredBlog?.bookName}
                      </p>
                      <div className="flex items-center">
                        <Badge variant="secondary" className="mr-2">
                          Rating
                        </Badge>
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
                    No featured Blog
                    <SetFeaturedBlogModal />
                  </div>
                )}
              </CardContent>
            </Card>
            {/* Actions */}
            <Card className="">
              <CardContent className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold flex items-center text800">
                  <Book className="w-5 h-5 mr-2" />
                  Scribe Actions
                </h2>
                <AddNewBlogDialog />
                <SetFeaturedBlogModal currentFeaturedBlog={featuredBlog} />
              </CardContent>
            </Card>
          </div>

          <Goals className="" />

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
