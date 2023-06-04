"use client";

import {FileIcon} from 'react-file-icon';

import {useSearchParams, useRouter} from "next/navigation";
import useSWR from "swr";
import {get, openFile} from "@/api/utils";
import {Files} from "@/api/models";
import {FILES_URL} from "@/api/urls";
import Image from "next/image";
import PathFragments from "@/components/path_fragments";
import {FolderIcon} from "@heroicons/react/24/solid";
import {DocumentPlusIcon} from "@heroicons/react/24/outline";

export default function Home() {
    const path = useSearchParams().get("path") || "";
    const {data, error, isLoading} = useSWR(FILES_URL, get<Files>({path}));

    const router = useRouter();

    if (isLoading)
        return "Loading..."

    if (error || !data)
        router.push("/login");

    return (
        <div>
            <div>
                <div className="flex flex-wrap p-5 gap-4">
                    {data?.map((file, index) => file.folder && (
                        <div key={index} className="flex flex-col items-center m-2">
                            <button
                                className="bg-white rounded-lg shadow-md hover:shadow-lg p-2 transition duration-200 flex items-center"
                                style={{width: 200}}
                                onClick={() => router.push(`/?path=${path}/${file.name}`)}
                            >
                                <FolderIcon
                                    width={30} height={30}
                                    className="text-gray-500 hover:text-gray-700 transition duration-200"
                                />
                                <p className="text-black ml-2 font-medium">
                                    {file.name}
                                </p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className="flex flex-wrap p-5 gap-4">
                    {data?.map((file, index) => !file.folder && (
                        <div key={index} className="flex flex-col items-center m-2">
                            <button
                                className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition duration-200"
                                onClick={() => openFile(file.id)}
                                style={{width: 100, height: 100}}
                            >
                                <FileIcon extension={file.name}/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={() => router.push(`/upload?path=${path}`)}
                className="fixed z-90 bottom-10 right-8 bg-blue-600 p-3 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl">
                <DocumentPlusIcon width={40} height={40}/>
            </button>
        </div>
    )
}
