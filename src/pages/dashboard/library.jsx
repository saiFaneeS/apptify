import BookLibrary from "@/components/dashboard/library/BookLibrary";
import DashLayout from "../DashLayout";

export default function LibraryPage() {
  return (
    <DashLayout>
      <div className="pt-14">
        <BookLibrary />
      </div>
    </DashLayout>
  );
}
