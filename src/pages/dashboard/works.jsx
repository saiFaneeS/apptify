"use client";

import { useEffect, useState } from "react";
import DashLayout from "../DashLayout";
import { useAuth } from "@/context/AuthContext";
import { useWorks } from "@/context/WorkContext";
import { NewWork } from "@/components/dashboard/works/NewWork";
import WorksDataTable from "@/components/dashboard/works/WorksDataTable";
import SetFeaturedWorkModal from "@/components/dashboard/works/SetFeaturedWork";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkle,
  Book,
  User2,
  List,
  ArrowLeftRight,
  BookOpenCheck,
  View,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CMSDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const { works, getAllWorks, fetchingWorks, featuredWork } = useWorks();

  const filteredWorks = works?.filter((work) =>
    work.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (user && (!works || works.length === 0)) {
      getAllWorks();
    }
  }, [user, works, getAllWorks]);

  return (
    <DashLayout>
      <div className="min-h-screen pt-16">
        <div className="px-8 max-sm:px-4 py-8">
          <div className="flex justify-between items-center gap-2 mb-4">
            <div className="flex gap-2 items-center text-xl font-medium">
              My Works
            </div>
            <div className="w-fit">
              <NewWork />
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
                      Total Works
                    </span>
                    <span className="text-xl font-semibold text-primary">
                      {works?.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 px-4 bg-muted/50 rounded-sm shadow-sm">
                    <span className="text-sm text-muted-foreground">
                      Published
                    </span>
                    <span className="text-xl font-semibold text-green-500">
                      {
                        works?.filter(
                          (work) => work.completionStatus === "completed"
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 px-4 bg-muted/50 rounded-sm shadow-sm">
                    <span className="text-sm text-muted-foreground">
                      Drafts
                    </span>
                    <span className="text-xl font-semibold text-yellow-500">
                      {
                        works?.filter(
                          (work) => work.completionStatus === "draft"
                        ).length
                      }
                    </span>
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
                  <div className="flex items-start gap-4 h-full">
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
                          <p className="text-sm text-muted-foreground line-clamp-1">
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
          </div>

          <WorksDataTable
            filteredWorks={filteredWorks}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            fetchingWorks={fetchingWorks}
          />
        </div>
      </div>
    </DashLayout>
  );
}
