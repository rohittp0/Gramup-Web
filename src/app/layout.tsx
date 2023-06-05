"use client"

import './globals.css'
import {Inter} from 'next/font/google'
import Image from "next/image";
import PathFragments from "@/components/PathFragments";
import {useRouter, useSearchParams} from "next/navigation";
import {ReactNode} from "react";

const inter = Inter({subsets: ['latin']})

interface Props {
    children: ReactNode
}

export default function RootLayout({children}: Props) {
    const path = useSearchParams().get("path") || "";

    const router = useRouter();

    return (
        <html lang="en">
        <body className={inter.className}>
        <nav
            className="bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b
                 border-gray-200 dark:border-gray-600 relative">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center">
                    <Image
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8 mr-3" alt="Flowbite Logo"
                        width={30} height={30}
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            GramUp
                        </span>
                </div>
                {path && <PathFragments path={path} onPathChange={(param) => router.push(`/?path=${param}`)}/>}
            </div>
        </nav>
        {children}
        </body>
        </html>
    )
}
