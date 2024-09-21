import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Search, Eye, Loader2, View, MessageSquareText } from "lucide-react";
import { formatTime } from "@/lib/formatTime";
import Image from "next/image";
import { useWorks } from "@/context/WorkContext";
import { Badge } from "@/components/ui/badge";
import { DeleteWork } from "./DeleteWork";
import { EditWorkDialog } from "./EditWork";

const WorksDataTable = ({
  filteredWorks,
  work,
  searchTerm,
  setSearchTerm,
  fetchingWorks,
}) => {
  const { incrementViewCount } = useWorks();

  const handleViewClick = (workId) => {
    incrementViewCount(workId);

    window.open(`/works/${workId}`, "_blank");
  };

  return (
    <Card>
      <CardContent>
        <Tabs>
          <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
            <div className="flex gap-2 items-center text-lg font-semibold pl-1">
              {/* <ScrollText className="w-5 h-5" /> */}
             <span className="h-2 w-2 rounded-full bg-primary"></span> All Compositions
            </div>{" "}
            <div className="flex items-center">
              <Input
                placeholder="Search the archives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mr-2"
              />
              <Button className="flex items-center" size="" variant="outline">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cover</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Words</TableHead>
                <TableHead>
                  <View size={20} />
                </TableHead>
                <TableHead>
                  <MessageSquareText size={20} />
                </TableHead>{" "}
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            {!fetchingWorks ? (
              <TableBody>
                {filteredWorks?.map((work) => (
                  <TableRow key={work?.id} className="border-b border-border">
                    <TableCell className="">
                      <div className="flex justify-center items-center h-20 w-12 border-border border">
                        <Image
                          src={work?.coverImage}
                          className="h-full w-full object-cover"
                          height={200}
                          width={200}
                          alt=""
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-nowrap">
                      {work?.title && work?.title?.length > 15
                        ? `${work.title.slice(0, 13)}...`
                        : work.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          work?.completionStatus === "completed"
                            ? "success"
                            : work?.completionStatus === "in-progress"
                            ? "outline"
                            : "secondary"
                        }
                        className="capitalize"
                      >
                        {work?.completionStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{work?.wordCount || 0}</TableCell>
                    <TableCell>{work?.viewCount || 0}</TableCell>
                    <TableCell>{work?.comments?.length || 0}</TableCell>

                    <TableCell className="text-nowrap">
                      {work?.createdAt && formatTime(work?.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <EditWorkDialog work={work} />
                        <Button
                          size="sm"
                          variant="outline"
                          className="border800 text800 hover:bg200"
                          onClick={() => handleViewClick(work?.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <DeleteWork work={work} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <div className="flex justify-center w-full items-center py-12">
                <Loader2 className="animate-spin" />
              </div>
            )}{" "}
          </Table>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WorksDataTable;
