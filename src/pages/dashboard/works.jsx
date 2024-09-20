"use client";

import { useEffect, useState } from "react";
import DashLayout from "../DashLayout";
import { useAuth } from "@/context/AuthContext";
import { useWorks } from "@/context/WorkContext";
import { NewWork } from "@/components/dashboard/works/NewWork";
import WorksDataTable from "@/components/dashboard/works/WorksDataTable";
import SetFeaturedWorkModal from "@/components/dashboard/works/SetFeaturedWork";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkle, Book, User2, List, ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CMSDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const { works, getAllWorks, fetchingWorks, featuredWork } = useWorks();

  const filteredWorks = works?.filter((work) =>
    work.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllWorks();
  }, [user]);

  return (
    <DashLayout>
      <div className="min-h-screen pt-16">
        <div className="px-8 max-sm:px-4 py-8">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
            <div className="flex gap-2 items-center text-xl font-medium">
              My Works
            </div>
            <div className="flex flex-col sm:flex-row max-sm:w-full gap-2">
              <NewWork />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 mb-8">
            {/* Overview */}
            <Card>
              <CardContent className="flex flex-col gap-4">
                <h2 className="flex gap-2 items-center text-lg font-semibold">
                  <List className="w-5 h-5" />
                  Overview
                </h2>
                <div className="flex justify-between text800">
                  <span>Total Works:</span>
                  <span className="font-bold">{works?.length}</span>
                </div>

                <div className="flex justify-between text800">
                  <span>Published Works:</span>
                  <span className="font-bold">
                    {
                      works?.filter(
                        (blog) => blog.completionStatus === "completed"
                      ).length
                    }
                  </span>
                </div>
                <div className="flex justify-between text800">
                  <span>Drafts:</span>
                  <span className="font-bold">
                    {
                      works?.filter((blog) => blog.completionStatus === "draft")
                        .length
                    }
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Featured Work */}
            <Card className="overflow-hidden">
              <CardContent className="flex flex-col justify-between h-full gap-4 ">
                <div className="flex justify-between items-center gap-2">
                  <h2 className="flex gap-2 items-center text-lg font-semibold">
                    <Sparkle className="w-5 h-5" />
                    Featured Work
                  </h2>
                  <SetFeaturedWorkModal currentFeaturedWork={featuredWork} />
                </div>
                {featuredWork ? (
                  <div className="flex items-start gap-4">
                    <div className="relative h-28 w-20 rounded overflow-hidden shrink-0 bg-foreground/5">
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
                        <Book size={16} /> {featuredWork.completionStatus}
                      </p>
                      {featuredWork.synopsis && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {featuredWork.synopsis.length > 100
                            ? `${featuredWork.synopsis.slice(0, 100)}...`
                            : featuredWork.synopsis}
                        </p>
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
