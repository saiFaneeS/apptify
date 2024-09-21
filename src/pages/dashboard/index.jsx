"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Book,
  BookOpen,
  BookOpenCheck,
  Feather,
  List,
  PenLine,
  PieChart,
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
import Goals from "@/components/dashboard/Goals";
import SetFeaturedBlogModal from "@/components/dashboard/SetFeaturedBlogModal";
import { useUser } from "@/context/UserContext";
import { useQuote } from "@/hooks/useQuote";
import { Separator } from "@/components/ui/separator";
import { useWorks } from "@/context/WorkContext";
import WorksDataTable from "@/components/dashboard/works/WorksDataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewWork } from "@/components/dashboard/works/NewWork";
import SetFeaturedWorkModal from "@/components/dashboard/works/SetFeaturedWork";
import { Progress } from "@/components/ui/progress";

export default function CMSDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const { blogs, getAllBlogs, fetchingBlogs, featuredBlog } = useBlogs();
  const { works, getAllWorks, fetchingWorks, featuredWork } = useWorks();

  const { quote } = useQuote();

  const filteredBlogs = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWorks = works?.filter((work) =>
    work.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      getAllBlogs();
    }
    if (!works || works.length === 0) {
      getAllWorks();
    }
  }, [user, blogs, works, getAllBlogs, getAllWorks]);

  return (
    <DashLayout>
      <div className="min-h-screen pt-16">
        <div className="px-8 max-sm:px-4 py-8">
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
            <div className="absolute z-10 h-full w-full bg-primary opacity-40 left-0 top-0"></div>
            <div className="relative z-20 text-white">
              <p className="text-sm">
                {quote || "May your quill be sharp and your ink never run dry."}
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 mb-8">
            {/* Overview */}
            <Card className="col-span-full md:col-span-2 lg:col-span-1">
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="bg-primary/20 p-3 rounded-lg cursor-help">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        My Works
                      </h3>
                      <div className="flex items-center gap-2">
                        <Feather className="w-5 h-5 text-primary" />
                        <span className="text-xl font-semibold">
                          {works?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-emerald-500 bg-opacity-20 p-3 rounded-lg cursor-help">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Book Reviews
                      </h3>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-emerald-400" />
                        <span className="text-xl font-semibold">
                          {blogs?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-muted/40 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Published Works:</span>
                      <span className="font-bold">
                        {
                          works?.filter(
                            (work) => work.completionStatus === "completed"
                          ).length
                        }
                      </span>
                    </div>
                    <Progress
                      value={
                        (works?.filter(
                          (work) => work.completionStatus === "completed"
                        ).length /
                          (works?.length || 1)) *
                        100
                      }
                      className="h-1.5 bg-primary/20"
                    />
                  </div>
                  <div className="bg-muted/40 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Published Reviews:</span>
                      <span className="font-bold">
                        {
                          blogs?.filter((blog) => blog.isPublished === true)
                            .length
                        }
                      </span>
                    </div>
                    <Progress
                      value={
                        (blogs?.filter((blog) => blog.isPublished === true)
                          .length /
                          (blogs?.length || 1)) *
                        100
                      }
                      className="h-1.5 bg-primary/20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Work */}
            <Card className="overflow-hidden">
              <CardContent className="flex flex-col h-full gap-4">
                <div className="flex justify-between items-center gap-2">
                  <h2 className="flex gap-2 items-center text-lg font-semibold">
                    <Sparkle className="w-5 h-5" />
                    Featured Composition
                  </h2>
                  <SetFeaturedWorkModal currentFeaturedWork={featuredWork} />
                </div>{" "}
                <Separator className="mb-1" />
                {featuredWork ? (
                  <div className="flex items-start gap-4">
                    <div className="relative h-full aspect-[0.7] rounded overflow-hidden shrink-0 bg-foreground/5">
                      <Image
                        src={featuredWork.coverImage}
                        layout="fill"
                        objectFit="cover"
                        alt={featuredWork.title}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-medium line-clamp-2">
                        {featuredWork.title}
                      </h3>
                      <p className="flex gap-2 items-center text-sm text-muted-foreground">
                        <View size={18} /> {featuredWork?.viewCount || 0}
                      </p>
                      <p className="flex gap-2 items-center text-sm text-muted-foreground">
                        <BookOpenCheck size={18} />{" "}
                        {featuredWork?.datePublished}
                      </p>
                      {featuredWork.synopsis && (
                        <>
                          <span className="font-medium text-sm text-foreground/80">
                            Synopsis:
                          </span>
                          <p className="text-sm text-muted-foreground line-clamp-2 max-sm:line-clamp-1">
                            {featuredWork.synopsis.length > 100
                              ? `${featuredWork.synopsis.slice(0, 100)}...`
                              : featuredWork.synopsis}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center flex-col gap-2 h-48">
                    No Work Featured
                  </div>
                )}
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

          <Goals />

          <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
            <h2 className="text-xl font-semibold">My Content</h2>
            <div className="flex gap-2">
              <AddNewBlogDialog />
              <NewWork />
            </div>
          </div>

          <Tabs defaultValue="works" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-primary/50 dark:bg-foreground/5">
              <TabsTrigger value="works">My Works</TabsTrigger>
              <TabsTrigger value="reviews">Book Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="works">
              <WorksDataTable
                filteredWorks={filteredWorks}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                fetchingWorks={fetchingWorks}
              />
            </TabsContent>
            <TabsContent value="reviews">
              <BooksDataTable
                filteredBlogs={filteredBlogs}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                fetchingBlogs={fetchingBlogs}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashLayout>
  );
}
