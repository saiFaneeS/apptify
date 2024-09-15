import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { formatTime } from "@/lib/formatTime";
import { useBlogs } from "@/context/BlogContext";
import { useParams } from "next/navigation";
import { Trash2, ArrowUpDown } from "lucide-react";
import { Card } from "../ui/card";

export default function Comments() {
  const [newComment, setNewComment] = useState({ username: "", content: "" });
  const [commenter, setCommenter] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [sortedComments, setSortedComments] = useState([]);

  const { comments, addComment, commenting, deleteComment } = useBlogs();
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
    }
  }, [comments, sortOrder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogId = params.slug;

    if (newComment.username.trim() && newComment.content.trim()) {
      let currentCommenter = {
        id: commenter?.id || `Guest-${Date.now()}-${Math.random()}`,
        username: newComment.username,
      };
      setCommenter(currentCommenter);
      localStorage.setItem("commenter", JSON.stringify(currentCommenter));

      const comment = {
        commentId: `comment-${Date.now}-${Math.random}`,
        id: currentCommenter.id,
        username: currentCommenter.username,
        content: newComment.content,
        createdAt: new Date().toISOString(),
        avatarSeed: currentCommenter.username,
      };

      addComment(blogId, comment);

      setNewComment((prev) => ({ ...prev, content: "" }));

      toast({
        title: "Comment posted",
        description: "Your comment has been added successfully.",
      });
    }
  };

  const handleDelete = (commentId) => {
    const blogId = params.slug;
    deleteComment(blogId, commentId);
    toast({
      title: "Comment deleted",
      description: "Your comment has been deleted successfully.",
    });
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "newest" ? "oldest" : "newest"));
  };

  const CommentItem = ({ comment }) => (
    <Card className="mb-4">
      <div className="flex items-center mb-2 justify-between">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/micah/svg?seed=${comment.username}`}
            />
            <AvatarFallback>{comment.username}</AvatarFallback>
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
            onClick={() => handleDelete(comment.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <p className="text-gray-700 mb-2">{comment.content}</p>
    </Card>
  );

  return (
    <div className="container mx-auto p-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        <Button onClick={toggleSortOrder} variant="outline" size="sm">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          {sortOrder === "newest" ? "Newest to Oldest" : "Oldest to Newest"}
        </Button>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-8">
        <p>Comment as:</p>
        <div className="flex space-x-2 mb-2">
          <div>
            <Avatar className="border border-border bg-backgr`ound">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/micah/svg?seed=${newComment.username}`}
              />
              <AvatarFallback>{newComment.username}</AvatarFallback>
            </Avatar>
          </div>
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
      <div className="space-y-4">
        {sortedComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
