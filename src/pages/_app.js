import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provide";
import { AuthProvider } from "@/context/AuthContext";
import { BlogsProvider } from "@/context/BlogContext";
import { UserProvider } from "@/context/UserContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <BlogsProvider>
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
        </BlogsProvider>
      </AuthProvider>
    </>
  );
}
