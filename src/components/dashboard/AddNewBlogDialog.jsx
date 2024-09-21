import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  ScrollText,
  Feather,
  Image as ImageIcon,
  Book,
  User,
  Star,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Plus,
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

export function AddNewBlogDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const { createBlog, loading } = useBlogs();

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({
      id: `${title}-${Date.now()}`,
      title,
      content,
      bookName,
      bookAuthor,
      rating,
      category,
      isPublished,
      coverImage,
      createdAt: Date.now(),
    });

    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setTitle("");
    setContent("");
    setBookName("");
    setBookAuthor("");
    setRating("");
    setCategory("");
    setCoverImage("");
    setIsPublished(false);
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
          className="flex gap-2 items-center bg-emerald-700 hover:bg-emerald-800"
          disabled={loading}
          variant=""
        >
          {!loading ? (
            <>
              <Star size={16} />
              Review a Book
            </>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-2">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Scribe a New Post
          </DialogTitle>
          <DialogDescription className="text700">
            Pen your thoughts and tales in the fields below. Use the formatting
            tools to embellish your scroll.
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
                    Main Category
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
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
                  <div className="max-h-40">
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      formats={formats}
                      className="bg50 outline outline-1 outline600 text900 max-h-40 overflow-y-auto"
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
                onClick={(e) => nextStep(e)}
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={!title}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={(e) => handleSubmit(e)}
                disabled={!title}
              >
                <Feather className="mr-2 h-5 w-5" />
                Submit Post
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
