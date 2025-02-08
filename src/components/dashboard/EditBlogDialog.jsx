import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Feather,
  Image as ImageIcon,
  Book,
  User,
  Star,
  Eclipse,
} from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useBlogs } from "@/context/BlogContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const formats = ["header", "bold", "italic", "underline", "list", "bullet"];

export function EditBlogDialog({ blog, onClose }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(blog?.title);
  const [content, setContent] = useState(blog?.content);
  const [bookName, setBookName] = useState(blog?.bookName);
  const [bookAuthor, setBookAuthor] = useState(blog?.bookAuthor);
  const [rating, setRating] = useState(blog?.rating);
  const [coverImage, setCoverImage] = useState(blog?.coverImage);
  const [isPublished, setIsPublished] = useState(blog?.isPublished);
  const [isLightMode, setIsLightMode] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

  const { updateBlog, loading } = useBlogs();
  const { toast } = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBlog(blog?.id, {
      title,
      content,
      bookName,
      bookAuthor,
      rating,
      isPublished,
      coverImage,
    });

    setOpen(false);
    toast({
      title: "Blog post updated",
      description: "Your blog post has been successfully updated and saved.",
    });
  };

  const isSubmitDisabled = () => {
    return !(title && content && coverImage);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Feather className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-2 overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Review your blog post carefully and update it as needed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-foreground after:content-['*'] after:ml-0.5 after:text-red-500"
                >
                  Title of Scroll
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-background border-input text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="coverImage"
                  className="text-foreground after:content-['*'] after:ml-0.5 after:text-red-500"
                >
                  Cover Image
                </Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="coverImage"
                    type="file"
                    onChange={(e) => setCoverImage(e.target.files?.[0] || "")}
                    className="pl-10 bg-background border-input text-foreground"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="content"
                    className="text-foreground after:content-['*'] after:ml-0.5 after:text-red-500"
                  >
                    Content
                  </Label>
                  <Button
                    type="button"
                    onClick={() => setIsLightMode(!isLightMode)}
                    size="icon"
                    variant="outline"
                  >
                    <Eclipse size={20} />
                  </Button>
                </div>
                <div className="h-[calc(80vh-300px)] overflow-y-auto">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    className={`${
                      isLightMode ? "bg-white text-neutral-900" : ""
                    } `}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                  <Label htmlFor="published" className="text-foreground">
                    {isPublished ? "Published" : "Draft"}
                  </Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-6">
            <div className="w-full flex flex-col items-center gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitDisabled()}
              >
                <Feather className="mr-2 h-5 w-5" />
                Update Blog
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
