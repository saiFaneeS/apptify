"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Book,
  MessageSquareText,
  PieChart,
  Sparkle,
  Star,
  Text,
  User2,
  View,
} from "lucide-react";
import Image from "next/image";
import DashLayout from "./DashLayout";
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
    if (!blogs || blogs.length === 0) {
      getAllBlogs();
    }
    // }
  }, [user, blogs, getAllBlogs]);

  return (
    <DashLayout>
      <div className="min-h-screen pt-14">
        <div className="p-page-sides py-8">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-lg p-6 mb-4">
            <div className="absolute inset-0 bg-primary/60">
              <Image
                src="/hero-bg.jpg"
                alt=""
                fill
                sizes="100vw"
                quality={75}
                priority
                className="object-cover saturate-50 opacity-60"
              />
            </div>
            <div className="absolute z-10 h-full w-full bg-primary opacity-40 left-0 top-0"></div>
            <div className="relative z-20 text-white">
              <p className="text-sm">
                {quote || "May your quill be sharp and your ink never run dry."}
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 mb-4 animate-in fade-in-100 slide-in-from-bottom-10 duration-300">
            {/* Overview */}
            <Card>
              <CardContent className="flex flex-col gap-5">
                <h2 className="flex gap-2 items-center text-lg font-semibold">
                  <PieChart className="w-5 h-5" /> Overview
                </h2>
                <Separator />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-2 px-4 bg-muted rounded-sm shadow-sm">
                    <span className="text-sm text-muted-foreground">
                      Total Blogs
                    </span>
                    <span className="text-xl font-semibold text-primary">
                      {blogs?.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 px-4 bg-muted rounded-sm shadow-sm">
                    <span className="text-sm text-muted-foreground">
                      Published
                    </span>
                    <span className="text-xl font-semibold text-emerald-400">
                      {
                        blogs?.filter((blog) => blog.isPublished === true)
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 px-4 bg-muted rounded-sm shadow-sm">
                    <span className="text-sm text-muted-foreground">
                      Drafts
                    </span>
                    <span className="text-xl font-semibold text-orange-400">
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
                    Featured Blog
                  </h2>
                  <SetFeaturedBlogModal currentFeaturedBlog={featuredBlog} />
                </div>{" "}
                <Separator className="mb-1" />
                {featuredBlog && featuredBlog.isPublished ? (
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
                        <Text size={18} className="shrink-0" />{" "}
                        {featuredBlog?.content && (
                          <div
                            className="text-xs line-clamp-1 text-foreground/60"
                            dangerouslySetInnerHTML={{
                              __html: featuredBlog?.content,
                            }}
                          />
                        )}
                      </p>
                      <p className="flex gap-2 items-center text-sm text-muted-foreground">
                        <View size={18} /> {featuredBlog?.viewCount || 0}
                      </p>
                      <p className="flex gap-2 items-center text-sm text-muted-foreground">
                        <MessageSquareText size={18} />{" "}
                        {featuredBlog?.comments?.length || 0}
                      </p>
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

          <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
            <h2 className="text-xl font-semibold">My Content</h2>
            <div className="flex gap-2">
              <AddNewBlogDialog />
            </div>
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
