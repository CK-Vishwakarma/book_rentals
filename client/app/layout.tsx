import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "@/redux/provider";
import ThemeCustomization from "@/themes";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chanchal book depo",
  description: "Welcome to Chanchal Book Depo, your one-stop destination for a diverse range of books across all genres. Whether you're a passionate reader, a student, or just looking for your next great read, Chanchal Book Depo offers a carefully curated collection to satisfy every literary taste. Explore our vast selection, find your favorite titles, and discover new ones to add to your bookshelf.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeCustomization>
            <>
              <ToastContainer />
              {children}
            </>
          </ThemeCustomization>
        </ReduxProvider>
      </body>
    </html>
  );
}
