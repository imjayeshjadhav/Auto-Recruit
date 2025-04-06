import Image from "next/image";
import { Lato } from "next/font/google";
import Link from "next/link";
import Head from "next/head";
import { type ReactNode } from "react";
import { TYPST_TEMPLATE_URL } from "@/utils";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        lato.className + " grid grid-rows-[auto_1fr_auto] min-h-screen"
      }
    >
      <Head>
        <title>Resume checker</title>
      </Head>
      <header className="py-4 px-6 border-b-gray-800 border-b-solid border-b-2 flex justify-center">
        <div className="container flex justify-between">
          <Link
            href="/"
            className="text-xl flex gap-2 items-center text-nowrap col-span-3"
          >
            <Image
              className="invert dark:invert-0"
              src="/images/logo-white.svg"
              alt="Icon."
              width={20}
              height={20}
            />
            Resume Checker
          </Link>
          <Link
            href="privacy"
            className="text-sm dark:text-white hover:text-black/80 dark:hover:text-white/80 cursor-pointer hover:text-indigo-300"
          >
            Privacy Policy
          </Link>
        </div>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center py-6 px-2 justify-center">
        {children}
      </main>
    </div>
  );
}