// import { Inter } from "next/font/google"; className={inter.className}
import { FaHeart } from "react-icons/fa6";
import "../globals.css";
import Link from "next/link";
import { isAuth } from "@/lib/isAuth";
import { redirect } from "next/navigation";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Todo App",
  description: "Developed by Ihtisham Ul Haq with Love",
};

export default async function RootLayout({ children }) {


    const user = await isAuth();
    console.log(user)
    if (!user.success) {
        return redirect('/login');
    }





  return (
    <html lang="en">
      <body >{children}
        <div className="absolute top-2  ">
            <ul className="flex gap-4 text-white font-semibold font-poppins">
                <li className="hover:text-slate-200"><Link href={'/login'}>Login</Link></li>
                <li className="hover:text-slate-200"><Link href={'/signup'}>Signup</Link></li>
                
            </ul>
        </div>
        <p className="fixed bottom-0 left-0 flex gap-2 p-2 items-center font-sm font-semibold text-gray-200  max-lg:hidden max-xl:-rotate-90 max-xl:-translate-y-32 max-xl:-translate-x-32 ">Developed by Ihtisham Ul Haq with <FaHeart color="#D70040"/></p>
      </body>
    </html>
  );
}
