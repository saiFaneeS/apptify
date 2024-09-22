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
import { Trash2 } from "lucide-react";
import { useBlogs } from "@/context/BlogContext";

export function ConfirmDeleteBlogDialog({ blog, onClose }) {
  const [open, setOpen] = useState(false);
  const { deleteBlog } = useBlogs();

  const handleDelete = () => {
    deleteBlog(blog?.id);
    setOpen(false);
    // onClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="border800 text800 hover:bg200"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg100 border-2 border300">
        <DialogHeader>
          <DialogTitle className="">Confirm Deletion</DialogTitle>
          <DialogDescription className="text700">
            Are you certain you wish to remove this scroll to the flames of
            oblivion?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text800 font-semibold">Title: {blog?.title}</p>
          <p className="text700 mt-2">
            This scroll will be permanently removed from the annals of history.
          </p>
        </div>
        <DialogFooter className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="bg100 text900 hover:bg200"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
