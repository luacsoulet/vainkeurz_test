import { Inter } from "next/font/google";
import NavBar from "./components/ui/navBar";
import "@/app/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vainkeurz",
  description: "Outil de gestion utilisateurs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex gap-8 mci-c4f7c3b940b2fda375c61f1064b5e7f6">
        <NavBar />
        <main className={inter.className}>{children}</main>
      </body>
    </html>
  );
}
