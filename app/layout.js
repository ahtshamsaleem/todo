// import { Inter } from "next/font/google"; className={inter.className}
import { FaHeart } from "react-icons/fa6";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Todo App",
  description: "Developed by Ihtisham Ul Haq with Love",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}
        <p className="fixed bottom-0 left-0 flex gap-2 p-2 items-center font-sm font-semibold text-gray-200  max-lg:hidden max-xl:-rotate-90 max-xl:-translate-y-32 max-xl:-translate-x-32 ">Developed by Ihtisham Ul Haq with <FaHeart color="#D70040"/></p>
      </body>
    </html>
  );
}
