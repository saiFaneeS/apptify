import { useState, useEffect, useCallback } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Feather,
  Image as ImageIcon,
  Book,
  User,
  Star,
  Loader2,
  Eclipse,
  Save,
} from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useBlogs } from "@/context/BlogContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AUTO_SAVE_INTERVAL = 5000;

export function AddNewBlogDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [lastSaved, setLastSaved] = useState(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const { createBlog, loading } = useBlogs();
  const { toast } = useToast();

  const saveToLocalStorage = useCallback(() => {
    const blogData = {
      title,
      content,
      bookName,
      bookAuthor,
      rating,
      isPublished,
    };
    localStorage.setItem("blogDraft", JSON.stringify(blogData));
    setLastSaved(new Date());
    setTimeout(() => {
      setIsAutoSaving(false);
    }, 2000);
  }, [title, content, bookName, bookAuthor, rating, isPublished]);

  const loadFromLocalStorage = useCallback(() => {
    const savedData = localStorage.getItem("blogDraft");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setTitle(parsedData.title || "");
      setContent(parsedData.content || "");
      setBookName(parsedData.bookName || "");
      setBookAuthor(parsedData.bookAuthor || "");
      setRating(parsedData.rating || "");
      setIsPublished(parsedData.isPublished || false);
      setLastSaved(new Date());
    }
  }, []);

  const clearLocalStorage = useCallback(() => {
    localStorage.removeItem("blogDraft");
    setLastSaved(null);
  }, []);

  useEffect(() => {
    if (open) {
      loadFromLocalStorage();
    }
  }, [open, loadFromLocalStorage]);

  useEffect(() => {
    let saveInterval;
    if (open) {
      saveInterval = setInterval(() => {
        setIsAutoSaving(true);
        saveToLocalStorage();
      }, AUTO_SAVE_INTERVAL);
    }
    return () => clearInterval(saveInterval);
  }, [open, saveToLocalStorage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({
      id: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
      title,
      content,
      bookName,
      bookAuthor,
      rating,
      isPublished,
      coverImage,
      createdAt: Date.now(),
    });

    clearLocalStorage();
    setOpen(false);
    resetForm();
    toast({
      title: "Blog post created",
      description: "Your blog post has been successfully created and saved.",
    });
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setBookName("");
    setBookAuthor("");
    setRating("");
    setCoverImage("");
    setIsPublished(false);
    setActiveTab("details");
    setLastSaved(null);
  };

  const isSubmitDisabled = () => {
    return !(title && content && coverImage);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex gap-2 items-center"
          disabled={loading}
          variant="outline"
        >
          {!loading ? (
            <>
              <Feather className="h-4 w-4" />
              Write a Blog
            </>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-2 overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Compose a Blog</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Pen your thoughts.
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
                  Title of Blog
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
                    required
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
                <div>
                  {!isAutoSaving && lastSaved && (
                    <p className="text-sm text-muted-foreground">
                      Last saved: {lastSaved.toLocaleTimeString()}
                    </p>
                  )}
                  {isAutoSaving && (
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Save className="w-4 h-4 mr-1 animate-pulse" />
                      Auto-saving...
                    </p>
                  )}
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
                Submit Post
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
