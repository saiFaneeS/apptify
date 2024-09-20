import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provide";
import { AuthProvider } from "@/context/AuthContext";
import { BlogsProvider } from "@/context/BlogContext";
import { GoalsProvider } from "@/context/GoalContext";
import { LibraryProvider } from "@/context/LibraryContext";
import { UserProvider } from "@/context/UserContext";
import { WorksProvider } from "@/context/WorkContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <WorksProvider>
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
        </WorksProvider>
      </AuthProvider>
    </>
  );
}
