"use client";

import {useSearchParams, useRouter} from "next/navigation";
import useSWR from "swr";
import {get, openFile} from "@/api/utils";
import {Files} from "@/api/models";
import {FILES_URL} from "@/api/urls";
import {DocumentPlusIcon} from "@heroicons/react/24/outline";
import FileListing from "@/components/FileListing";
import FileChooserModal from "@/components/FileChooserModal";
import {useState} from "react";

export default function Home() {
    const path = useSearchParams().get("path") || "";
    const {data, error, isLoading} = useSWR(FILES_URL, get<Files>({path}));

    const router = useRouter();

    const [isOpened, setIsOpened] = useState(false);

    if (isLoading)
        return "Loading..."

    if (error || !data)
        router.push("/login");

    return (
        <div>
            <FileListing
                data={data || []}
                fileAction={(file) => openFile(file.id)}
                folderAction={file => router.push(`/?path=${file.path}`)}/>
            <FileChooserModal
                path={path}
                isOpen={isOpened}
                onClose={() => setIsOpened(false)}
            />
            <button
                onClick={() => setIsOpened(true)}
                className="fixed z-90 bottom-10 right-8 bg-blue-600 p-3 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl">
                <DocumentPlusIcon width={40} height={40}/>
            </button>
        </div>
    )
}
