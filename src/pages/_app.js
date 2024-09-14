import { ThemeProvider } from "@/components/theme-provide";
import { AuthProvider } from "@/context/AuthContext";
import { BlogsProvider } from "@/context/BlogContext";
import { GoalsProvider } from "@/context/GoalContext";
import { LibraryProvider } from "@/context/LibraryContext";
import { UserProvider } from "@/context/UserContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <BlogsProvider>
          <LibraryProvider>
            <GoalsProvider>
              <UserProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  <Component {...pageProps} />
                </ThemeProvider>
              </UserProvider>
            </GoalsProvider>
          </LibraryProvider>
        </BlogsProvider>
      </AuthProvider>
    </>
  );
}
