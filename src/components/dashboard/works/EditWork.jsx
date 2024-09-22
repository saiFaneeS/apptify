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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Feather,
  ImageIcon,
  X,
  BookOpen,
  Tags,
  Calendar,
  Eclipse,
} from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useWorks } from "@/context/WorkContext";

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

export function EditWorkDialog({ work }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(work?.title || "");
  const [synopsis, setSynopsis] = useState(work?.synopsis || "");
  const [content, setContent] = useState(work?.content || "");
  const [completionStatus, setCompletionStatus] = useState(
    work?.completionStatus || "draft"
  );
  const [datePublished, setDatePublished] = useState(work?.datePublished || "");
  const [coverImage, setCoverImage] = useState(work?.coverImage || "");
  const [tags, setTags] = useState(work?.tags || []);
  const [currentTag, setCurrentTag] = useState("");
  const [isLightMode, setIsLightMode] = useState(true);

  const { updateWork } = useWorks();

  useEffect(() => {
    if (open) {
      setTitle(work?.title || "");
      setSynopsis(work?.synopsis || "");
      setContent(work?.content || "");
      setCompletionStatus(work?.completionStatus || "draft");
      setDatePublished(work?.datePublished || "");
      setCoverImage(work?.coverImage || "");
      setTags(work?.tags || []);
    }
  }, [open, work]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWork(work?.id, {
      title,
      synopsis,
      content,
      completionStatus,
      datePublished,
      coverImage,
      tags,
    });
    setOpen(false);
    // onClose();
  };

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const isSubmitDisabled = () => {
    return !title || !synopsis || !content || !coverImage;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="border800 text800 hover:bg200"
        >
          <Feather className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[86vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Your Work</DialogTitle>
          <DialogDescription>
            Refine your literary masterpiece
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
          <Tabs defaultValue="details" className="flex-grow flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-grow">
              <TabsContent value="details" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="after:content-['*'] after:ml-0.5 after:text-red-500"
                  >
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the title of your work"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="synopsis"
                    className="after:content-['*'] after:ml-0.5 after:text-red-500"
                  >
                    Synopsis
                  </Label>
                  <Textarea
                    id="synopsis"
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    placeholder="Briefly describe your work"
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="completionStatus">Status</Label>
                  <Select
                    value={completionStatus}
                    onValueChange={setCompletionStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="content" className="mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="content"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500"
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
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    className={`${
                      isLightMode ? "bg-white text-neutral-900" : ""
                    } max-h-[calc(90vh-300px)] overflow-y-auto`}
                    required
                  />
                </div>
              </TabsContent>
              <TabsContent value="metadata" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="coverImage"
                    className="after:content-['*'] after:ml-0.5 after:text-red-500"
                  >
                    Cover Image
                  </Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="coverImage"
                      type="file"
                      onChange={(e) => setCoverImage(e.target.files?.[0] || "")}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-0.5 rounded flex items-center"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-secondary-foreground"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <Tags className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="tags"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add a tag"
                        className="pl-10"
                      />
                    </div>
                    <Button type="button" onClick={addTag} className="ml-2">
                      Add
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="datePublished">Date Published</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="datePublished"
                      type="date"
                      value={datePublished}
                      onChange={(e) => setDatePublished(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
          <DialogFooter className="mt-4">
            <Button
              type="submit"
              disabled={isSubmitDisabled()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Update Work
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
