import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="bg-accent dark:bg-accent/0">{children}</div>
      <Footer />
    </>
  );
}
