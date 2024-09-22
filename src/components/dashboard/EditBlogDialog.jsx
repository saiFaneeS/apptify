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
  Eclipse,
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
  // const [category, setCategory] = useState(blog?.category);
  const [coverImage, setCoverImage] = useState(blog?.coverImage);
  const [isPublished, setIsPublished] = useState(blog?.isPublished);
  const [isLightMode, setIsLightMode] = useState(true);

  const { updateBlog } = useBlogs();

  useEffect(() => {
    if (open) {
      setStep(1);
      setTitle(blog?.title);
      setContent(blog?.content || null);
      setBookName(blog?.bookName || null);
      setBookAuthor(blog?.bookAuthor || null);
      setRating(blog?.rating || null);
      // setCategory(blog?.category || null);
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
      // category,
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

  const isSubmitDisabled = () => {
    return !(title && bookName && rating && content && coverImage);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Feather className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg100 border-2 border300">
        <DialogHeader>
          <DialogTitle>
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
                  <Label htmlFor="title" className="text800 after:content-['*'] after:ml-0.5 after:text-red-500">
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
                {/* <div className="space-y-2">
                  <Label htmlFor="category" className="text800 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Main Category
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger className="bg50 border300 text900">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="science-fiction">
                        Science Fiction
                      </SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="thriller">Thriller</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="historical-fiction">
                        Historical Fiction
                      </SelectItem>
                      <SelectItem value="contemporary">
                        Contemporary Fiction
                      </SelectItem>
                      <SelectItem value="literary-fiction">
                        Literary Fiction
                      </SelectItem>
                      <SelectItem value="young-adult">Young Adult</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="biography">Biography</SelectItem>
                      <SelectItem value="memoir">Memoir</SelectItem>
                      <SelectItem value="self-help">Self-Help</SelectItem>
                      <SelectItem value="poetry">Poetry</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                <div className="space-y-2">
                  <Label htmlFor="coverImage" className="text800 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Cover Image
                  </Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-3 h-5 w-5 text600" />
                    <Input
                      id="coverImage"
                      type="file"
                      onChange={(e) => setCoverImage(e.target.files?.[0] || "")}
                      className="pl-10 bg50 border300 text900"
                    />
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bookName" className="text800 after:content-['*'] after:ml-0.5 after:text-red-500">
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
                  <Label htmlFor="rating" className="text800 after:content-['*'] after:ml-0.5 after:text-red-500">
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
                  <div className="flex justify-between items-center">
                    <Label htmlFor="content" className="text800 after:content-['*'] after:ml-0.5 after:text-red-500">
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
                  <div className="max-h-40">
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      formats={formats}
                      className={`${
                        isLightMode ? "bg-white text-neutral-900" : "bg50 text900"
                      } outline outline-1 outline600 max-h-40 overflow-y-auto`}
                    />
                  </div>
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
              <Button type="button" onClick={prevStep} variant="secondary">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={(e) => handleSubmit(e)}
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={isSubmitDisabled()}
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
