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
import { Switch } from "@/components/ui/switch";
import {
  ScrollText,
  Feather,
  Image as ImageIcon,
  Book,
  User,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useBlogs } from "@/context/BlogContext";

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
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState(blog?.title);
  const [content, setContent] = useState(blog?.content);
  const [bookName, setBookName] = useState(blog?.bookName);
  const [bookAuthor, setBookAuthor] = useState(blog?.bookAuthor);
  const [rating, setRating] = useState(blog?.rating);
  const [category, setCategory] = useState(blog?.category);
  const [coverImage, setCoverImage] = useState(blog?.coverImage);
  const [isPublished, setIsPublished] = useState(blog?.isPublished);

  const { updateBlog } = useBlogs();

  useEffect(() => {
    if (open) {
      setStep(1);
      setTitle(blog?.title);
      setContent(blog?.content || null);
      setBookName(blog?.bookName || null);
      setBookAuthor(blog?.bookAuthor || null);
      setRating(blog?.rating || null);
      setCategory(blog?.category || null);
      setCoverImage(blog?.coverImage || "");
      setIsPublished(blog?.isPublished || "Draft");
    }
  }, [open, blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlog(blog?.id, {
      title,
      content,
      bookName,
      bookAuthor,
      rating,
      category,
      coverImage,
      isPublished,
    });
    setOpen(false);
    // onClose();
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep((prev) => Math.min(prev + 1, 3));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

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
      <DialogContent className="sm:max-w-[600px] bg100 border-2 border300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text900">
            Revise Your Chronicle
          </DialogTitle>
          <DialogDescription className="text700">
            Amend your tale with care, for the words you inscribe shall echo
            through the halls of time.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="py-4">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text800">
                    Title of Scroll
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg50 border300 text900"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text800">
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger className="bg50 border300 text900">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="history">
                        Historical Account
                      </SelectItem>
                      <SelectItem value="literature">
                        Literary Analysis
                      </SelectItem>
                      <SelectItem value="philosophy">
                        Philosophical Musings
                      </SelectItem>
                      <SelectItem value="folklore">
                        Tales and Legends
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverImage" className="text800">
                    Cover Image
                  </Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-3 h-5 w-5 text600" />
                    <Input
                      id="coverImage"
                      type="file"
                      onChange={(e) =>
                        setCoverImage(e.target.files?.[0] || "")
                      }
                      className="pl-10 bg50 border300 text900"
                    />
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bookName" className="text800">
                    Book Name
                  </Label>
                  <div className="relative">
                    <Book className="absolute left-3 top-3 h-5 w-5 text600" />
                    <Input
                      id="bookName"
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                      className="pl-10 bg50 border300 text900"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bookAuthor" className="text800">
                    Book Author
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text600" />
                    <Input
                      id="bookAuthor"
                      value={bookAuthor}
                      onChange={(e) => setBookAuthor(e.target.value)}
                      className="pl-10 bg50 border300 text900"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating" className="text800">
                    Rating (1-5)
                  </Label>
                  <div className="relative">
                    <Star className="absolute left-3 top-3 h-5 w-5 text600" />
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="pl-10 bg50 border300 text900"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content" className="text800">
                    Content
                  </Label>
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    className="bg50 outline outline-1 outline600 text900 max-h-40 overflow-y-auto"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                  <Label htmlFor="published" className="text800">
                    {isPublished ? "Published" : "Draft"}
                  </Label>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between">
            {step > 1 && (
              <Button
                type="button"
                onClick={prevStep}
                className="bg700 hover:bg600 text100"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg700 hover:bg600 text100"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={(e) => handleSubmit(e)}
                className="bg700 hover:bg600 text100"
              >
                <Feather className="mr-2 h-5 w-5" />
                Update Chronicle
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
