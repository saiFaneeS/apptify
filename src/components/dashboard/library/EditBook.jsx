import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
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
import { Edit, ImageIcon, Loader2 } from "lucide-react";
import { useLibrary } from "@/context/LibraryContext";
import { Slider } from "@/components/ui/slider";

const EditBook = ({ book }) => {
  const { updateBook, loading } = useLibrary();
  const [editingBook, setEditingBook] = useState({
    title: book?.title,
    bookAuthor: book?.bookAuthor,
    coverImage: book?.coverImage,
    status: book?.status,
    progress: book?.progress || 0,
  });

  const handleUpdateBook = () => {
    updateBook(book?.id, editingBook);
    setEditingBook({
      title: book?.title,
      coverImage: book?.coverImage,
      status: book?.status,
      bookAuthor: book?.bookAuthor,
      progress: book?.progress,
    });
  };

  useEffect(() => {
    setEditingBook({
      title: book?.title,
      bookAuthor: book?.bookAuthor,
      coverImage: book?.coverImage,
      status: book?.status,
      progress: book?.progress || 0,
    });
  }, [book]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          className="w-full gap-2"
        >
          <Edit className="h-4 w-4" /> <span className="max-sm:hidden">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Update the details of your book.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 ">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-title" className="text-right">
              Title
            </Label>
            <Input
              id="edit-title"
              value={editingBook?.title || ""}
              onChange={(e) =>
                setEditingBook(
                  editingBook ? { ...editingBook, title: e.target.value } : null
                )
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-bookAuthor" className="text-right">
              Author
            </Label>
            <Input
              id="edit-bookAuthor"
              value={editingBook?.bookAuthor || ""}
              onChange={(e) =>
                setEditingBook(
                  editingBook
                    ? { ...editingBook, bookAuthor: e.target.value }
                    : null
                )
              }
              className="col-span-3"
              placeholder="Optional"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-status" className="text-right">
              Status
            </Label>
            <Select
              value={editingBook?.status || ""}
              onValueChange={(value) =>
                setEditingBook(
                  editingBook ? { ...editingBook, status: value } : null
                )
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="currently reading">
                  Currently Reading
                </SelectItem>
                <SelectItem value="favorite">Favorite</SelectItem>
                <SelectItem value="tbr">To Be Read</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {editingBook?.status === "currently reading" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-progress" className="text-right">
                Progress
              </Label>
              <div className="col-span-3 flex items-center gap-4">
                <Slider
                  id="edit-progress"
                  min={0}
                  max={100}
                  step={1}
                  value={[editingBook?.progress || 0]}
                  onValueChange={(value) =>
                    setEditingBook(
                      editingBook
                        ? { ...editingBook, progress: value[0] }
                        : null
                    )
                  }
                  className="flex-grow"
                />
                <span className="w-12 text-right">
                  {editingBook?.progress || 0}%
                </span>
              </div>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-coverImage" className="text-right">
              New Cover
            </Label>
            <div className="relative col-span-3">
              <ImageIcon className="absolute left-3 top-3 h-5 w-5 text600" />
              <Input
                id="coverImage"
                type="file"
                onChange={(e) =>
                  setEditingBook({
                    ...editingBook,
                    coverImage: e.target.files?.[0] || "",
                  })
                }
                className="pl-10"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdateBook} disabled={loading}>
            {!loading ? "Update Book" : <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBook;
