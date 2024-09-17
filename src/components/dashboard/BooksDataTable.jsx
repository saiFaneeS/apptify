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
import { Search, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { EditBlogDialog } from "./EditBlogDialog";
import { formatTime } from "@/lib/formatTime";
import { ConfirmDeleteBlogDialog } from "./ConfirmDeleteBlogDialog";
import Image from "next/image";
import { useBlogs } from "@/context/BlogContext";
import { useRouter } from "next/router";

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
    <Card className="mb-8">
      <CardContent>
        <Tabs>
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold">All Book Reviews</p>
            <div className="flex">
              <Input
                placeholder="Search the archives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mr-2"
              />
              <Button className="">
                <Search className="w-4 h-4 mr-2" /> Search
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cover</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            {!fetchingBlogs ? (
              <TableBody>
                {filteredBlogs?.map((review) => (
                  <TableRow key={review?.id} className="border-b border-border">
                    <TableCell className="">
                      <div className="flex justify-center items-center h-12 w-8 border border300 bg50">
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
                    <TableCell>{review?.bookName}</TableCell>
                    <TableCell>{review?.rating}</TableCell>
                    <TableCell>
                      {review?.isPublished ? "Published" : "Draft"}
                    </TableCell>
                    <TableCell>
                      {review?.createdAt && formatTime(review?.createdAt)}
                    </TableCell>
                    <TableCell>{review?.viewCount || 0}</TableCell>
                    <TableCell>{review?.comments?.length || 0}</TableCell>
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
