import { Inter } from "next/font/google";
import Link from "next/link";
import Menu from "@/components/menu";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <>
      <Menu />
      <main className={`max-w-7xl mx-auto ${inter.className}`}>
        <div className="flex flex-wrap py-28 text-center">
          <div className="w-full md:w-1/3 px-3">
            <Link href="/customer">Müşteriler</Link></div>
          <div className="w-full md:w-1/3 px-3 whitespace-nowrap">
            <Link href="task">Görev</Link>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Link href="/calender">Takvim</Link>
            </div>
        </div>
      </main>
    </>
  );
}
