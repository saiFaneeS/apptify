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
  Eclipse,
} from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useBlogs } from "@/context/BlogContext";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export function AddNewBlogDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [rating, setRating] = useState("");
  // const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

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
      // category,
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
    // setCategory("");
    setCoverImage("");
    setIsPublished(false);
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
        <Button
          className="flex gap-2 items-center bg-emerald-700 hover:bg-emerald-800"
          disabled={loading}
          variant="default"
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
          <DialogTitle>Scribe a New Review</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share your thoughts on a tome of choice.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            {step === 1 && (
              <div className="space-y-4">
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
                {/* <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="text-foreground after:content-['*'] after:ml-0.5 after:text-red-500"
                  >
                    Main Category
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger className="bg-background border-input text-foreground">
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
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="bookName"
                    className="text-foreground after:content-['*'] after:ml-0.5 after:text-red-500"
                  >
                    Book Name
                  </Label>
                  <div className="relative">
                    <Book className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="bookName"
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                      className="pl-10 bg-background border-input text-foreground"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bookAuthor" className="text-foreground">
                    Book Author
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="bookAuthor"
                      value={bookAuthor}
                      onChange={(e) => setBookAuthor(e.target.value)}
                      className="pl-10 bg-background border-input text-foreground"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="rating"
                    className="text-foreground after:content-['*'] after:ml-0.5 after:text-red-500"
                  >
                    Rating (1-5)
                  </Label>
                  <div className="relative">
                    <Star className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="pl-10 bg-background border-input text-foreground"
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
                  <div className="max-h-40">
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      className={`${
                        isLightMode ? "bg-white text-neutral-900" : ""
                      } max-h-40 overflow-y-auto`}
                    />
                  </div>
                </div>
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
            )}
          </div>
          <DialogFooter className="flex justify-between gap-2 flex-row">
            {step > 1 && (
              <Button
                type="button"
                onClick={prevStep}
                variant="secondary"
                className="w-fit"
                size="sm"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                onClick={(e) => nextStep(e)}
                className="bg-emerald-600 hover:bg-emerald-700 w-fit"
                size="sm"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 w-fit"
                disabled={isSubmitDisabled()}
                size="sm"
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
