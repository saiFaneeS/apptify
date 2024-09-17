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
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Loader2,
  Mountain,
  ScrollText,
  MessageSquareText,
  View,
  Star,
} from "lucide-react";
import { EditBlogDialog } from "./EditBlogDialog";
import { formatTime } from "@/lib/formatTime";
import { ConfirmDeleteBlogDialog } from "./ConfirmDeleteBlogDialog";
import Image from "next/image";
import { useBlogs } from "@/context/BlogContext";
import { useRouter } from "next/router";
import { Badge } from "../ui/badge";

const BooksDataTable = ({
  filteredBlogs,
  blog,
  searchTerm,
  setSearchTerm,
  fetchingBlogs,
}) => {
  const { incrementViewCount } = useBlogs();
  const router = useRouter();

  const handleViewClick = (blogId) => {
    incrementViewCount(blogId);

    window.open(`/reviews/${blogId}`, "_blank");
  };

  return (
    <Card>
      <CardContent>
        <Tabs>
          <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
            <div className="flex gap-2 items-center text-lg font-semibold pl-1">
              <ScrollText className="w-5 h-5" />
              All Book Reviews
            </div>{" "}
            <div className="flex items-center">
              <Input
                placeholder="Search the archives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mr-2"
              />
              <Button className="flex items-center" size="sm">
                <Search className="w-4 h-4 mr-2" /> Search
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cover</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Rated </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <View size={20} />
                </TableHead>
                <TableHead>
                  <MessageSquareText size={20} />
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            {!fetchingBlogs ? (
              <TableBody>
                {filteredBlogs?.map((review) => (
                  <TableRow key={review?.id} className="border-b border-border">
                    <TableCell className="">
                      <div className="flex justify-center items-center h-20 w-12 border-border border">
                        <Image
                          src={review?.coverImage}
                          className="h-full w-full object-cover"
                          height={200}
                          width={200}
                          alt=""
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {review?.title}
                    </TableCell>
                    <TableCell>{review?.rating}</TableCell>
                    <TableCell>
                      <Badge variant={"secondary"}>
                        {review?.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>{review?.viewCount || 0}</TableCell>
                    <TableCell>{review?.comments?.length || 0}</TableCell>
                    <TableCell>
                      {review?.createdAt && formatTime(review?.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <EditBlogDialog blog={review} />
                        <Button
                          size="sm"
                          variant="outline"
                          className="border800 text800 hover:bg200"
                          onClick={() => handleViewClick(review.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <ConfirmDeleteBlogDialog blog={review} />
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

export default BooksDataTable;
