import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useBlogs } from "@/context/BlogContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeftRight, Check, Loader2, Plus, Sparkle } from "lucide-react";

const SetFeaturedBlogModal = ({ currentFeaturedBlog }) => {
  const { blogs, updateFeaturedBlog, updatingFeatured } = useBlogs();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleUpdateFeaturedBlog = async () => {
    if (selectedBlog && selectedBlog !== currentFeaturedBlog?.id) {
      await updateFeaturedBlog(currentFeaturedBlog, selectedBlog);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="p-2 h-8" size="sm">
          {updatingFeatured ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <ArrowLeftRight size={16} />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Select Featured Blog</DialogTitle>
          <DialogDescription>
            This will be prominently displayed as your featured blog.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh] pr-4 py-2">
          <div className="space-y-4">
            {blogs
              ?.filter((blog) => blog.isPublished)
              .map((blog) => (
                <div
                  key={blog.id}
                  className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedBlog?.id === blog?.id
                      ? "bg-primary/10 border border-primary"
                      : "border border-border/50 hover:bg-foreground/5 hover:border-foreground/20"
                  }`}
                  onClick={() => setSelectedBlog(blog)}
                >
                  <div className="relative w-14 aspect-video rounded-md overflow-hidden shrink-0">
                    <Image
                      src={blog.coverImage || "/"}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-base line-clamp-1 leading-snug font-medium">
                      {blog.title}
                    </h3>
                  </div>
                  {selectedBlog?.id === blog?.id && (
                    <Check className="w-6 h-6" />
                  )}
                </div>
              ))}
          </div>
        </ScrollArea>
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleUpdateFeaturedBlog}
            disabled={selectedBlog?.id === currentFeaturedBlog?.id}
            className=""
          >
            {updatingFeatured ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Set as Featured"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SetFeaturedBlogModal;
