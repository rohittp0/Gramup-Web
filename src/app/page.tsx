"use client";

import {useSearchParams, useRouter} from "next/navigation";
import useSWR from "swr";
import {get} from "@/api/utils";
import {Files} from "@/api/models";
import {FILES_URL} from "@/api/urls";
import Image from "next/image";
import PathFragments from "@/components/path_fragments";

export default function Home() {
    const path = useSearchParams().get("path") || "";
    const {data, error, isLoading} = useSWR(FILES_URL, get<Files>({path}));

    const router = useRouter();

    if (isLoading)
        return "Loading..."

    if (error || !data)
        router.push("/login");

    return (
        <>
            <nav
                className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
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
                    {path && <PathFragments path={path}/>}
                </div>
            </nav>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                {/*Map through the files/folders and display them in the UI*/}
                {data?.map((file, index) => (
                //   TODO: Write the code to display the files/folders. Clicking on folders should navigate by appending the folder name to "path" query parameter. Clicking on file should call backend api with file ID to download/open it
                ))}
            </div>
        </>
    )
}
