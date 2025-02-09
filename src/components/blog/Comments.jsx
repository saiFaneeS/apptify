import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { formatTime } from "@/lib/formatTime";
import { useBlogs } from "@/context/BlogContext";
import { useParams } from "next/navigation";
import { Trash2, ArrowUpDown, Loader2 } from "lucide-react";
import { Separator } from "../ui/separator";

export default function Comments() {
  const [newComment, setNewComment] = useState({ username: "", content: "" });
  const [commenter, setCommenter] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [sortedComments, setSortedComments] = useState([]);

  const { comments, addComment, commenting, deleteComment, deletingComment } =
    useBlogs();
  const { toast } = useToast();
  const params = useParams();

  useEffect(() => {
    const storedCommenter = JSON.parse(localStorage.getItem("commenter"));
    if (storedCommenter) {
      setCommenter(storedCommenter);
      setNewComment((prev) => ({
        ...prev,
        username: storedCommenter.username,
      }));
    }
  }, []);

  useEffect(() => {
    if (comments) {
      const sorted = [...comments].sort((a, b) => {
        if (sortOrder === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
      });
      setSortedComments(sorted);
      console.log(comments);
    }
  }, [comments, sortOrder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogId = params.slug;
    if (newComment.username.trim() && newComment.content.trim()) {
      let currentCommenter = {
        id: commenter?.id || `guest${Date.now()}${Math.random() * 1000}`,
        username: newComment.username,
      };
      setCommenter(currentCommenter);
      localStorage.setItem("commenter", JSON.stringify(currentCommenter));

      const comment = {
        commentId: `comment${Date.now()}${Math.random() * 1000}`,
        id: currentCommenter?.id,
        username: currentCommenter.username,
        content: newComment?.content,
        createdAt: new Date().toISOString(),
        avatarSeed: currentCommenter.username,
      };

      console.log(blogId, comment);

      addComment(blogId, comment);

      setNewComment((prev) => ({ ...prev, content: "" }));

      toast({
        title: "Comment posted",
        description: "Your comment has been added successfully.",
      });
    }
  };

  const handleDelete = (comment) => {
    const blogId = params.slug;
    deleteComment(blogId, comment);
    toast({
      title: "Comment deleted",
      description: "Your comment has been deleted successfully.",
    });
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "newest" ? "oldest" : "newest"));
  };

  const CommentItem = ({ comment }) => (
    <div className="">
      <div className="flex items-center mb-2 justify-between">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/micah/svg?seed=${comment.username}`}
            />
            {/* <AvatarFallback></AvatarFallback> */}
          </Avatar>
          <span className="font-semibold mr-2">{comment.username}</span>
          <span className="text-xs text-gray-500">
            {formatTime(comment.createdAt)}
          </span>
        </div>
        {commenter && commenter.id === comment.id && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(comment)}
          >
            {!deletingComment ? (
              <Trash2 className="h-4 w-4" />
            ) : (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </Button>
        )}
      </div>
      <p className="">{comment.content}</p>
    </div>
  );

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4 gap-2">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <Button onClick={toggleSortOrder} variant="outline" size="sm">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          {sortOrder === "newest" ? "Newest to Oldest" : "Oldest to Newest"}
        </Button>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-8">
        <p className="font-medium text-sm">New Comment:</p>
        <div className="flex space-x-2">
          <Avatar className="border border-border bg-backgr`ound">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/micah/svg?seed=${newComment.username}`}
            />
            <AvatarFallback>
              <Loader2 className="animate-spin" />
            </AvatarFallback>
          </Avatar>
          <Input
            placeholder="Your name"
            value={newComment.username}
            onChange={(e) =>
              setNewComment({ ...newComment, username: e.target.value })
            }
            className="flex-grow"
          />
        </div>
        <Textarea
          placeholder="Share your thoughts..."
          value={newComment.content}
          onChange={(e) =>
            setNewComment({ ...newComment, content: e.target.value })
          }
          rows={4}
        />
        <Button type="submit" disabled={commenting}>
          {commenting ? "Posting..." : "Post"}
        </Button>
      </form>

      {/* Comments */}
      <div className="flex flex-col gap-8 pt-4">
        {comments?.map((comment) => (
          <React.Fragment key={comment.commentId}>
            <CommentItem comment={comment} />
            <Separator />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
