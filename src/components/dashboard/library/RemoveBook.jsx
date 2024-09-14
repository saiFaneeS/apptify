import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLibrary } from "@/context/LibraryContext";
import { Loader2, Trash2 } from "lucide-react";
import React from "react";

const RemoveBook = ({ book }) => {
  const { deleteBook, loading } = useLibrary();

  const handleDeleteBook = () => {
    deleteBook(book?.id);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive" size="sm" disabled={loading}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove from Library</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this book from your library?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDeleteBook} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveBook;
