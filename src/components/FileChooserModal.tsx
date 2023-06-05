import {XMarkIcon, ArrowUpTrayIcon, ArrowPathIcon} from '@heroicons/react/24/outline';
import {LOCAL_FILES_URL, TASKS_URL} from "@/api/urls";
import {get, post} from "@/api/utils";
import {Files, File, Task} from "@/api/models";
import FileListing from "@/components/FileListing";
import {useEffect, useState} from "react";
import PathFragments from "@/components/PathFragments";
import {useRouter} from "next/navigation";

interface FileChooserModalProps {
    isOpen: boolean;
    onClose: () => void;
    path: string;
}

export default function FileChooserModal({isOpen, onClose, path}: FileChooserModalProps) {
    const [data, setData] = useState<Files>();
    const [selectedFile, setSelectedFile] = useState<File>();
    const [selectedFolder, setSelectedFolder] = useState<File>();
    const [selectedPath, setSelectedPath] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        if (!isOpen) return;

        get<Files>({path: selectedPath})(LOCAL_FILES_URL)
            .then(setData)
            .catch(() => setData(undefined));
    }, [isOpen, selectedPath, onClose]);

    useEffect(() => {
        if (!isOpen || !selectedFolder) return;

        setSelectedPath(selectedFolder.path || "");
    }, [isOpen, selectedFolder]);

    function scheduleAction(sync: boolean) {
        const path = (sync ? selectedFolder : (selectedFile || selectedFolder))?.path;
        if (!path) return;

        const action = sync ? "sync" : "upload";

        post<Task>({path, action})(TASKS_URL)
            .then(() => router.push("/tasks"))
            .catch(() => setData(undefined));
    }

    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white pt-3 pb-4 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <div className="flex justify-between border-b-4 pb-2 px-4 w-full">
                                    <PathFragments path={selectedPath} onPathChange={setSelectedPath}/>
                                    <button
                                        type="button"
                                        className="my-auto rounded-full border border-gray-300 shadow-sm p-[7px] bg-white text-base font-medium text-gray-700 hover:bg-gray-[#f9f9f9] focus:outline-none focus:ring-[#a1a1aa] focus:border-transparent"
                                        onClick={onClose}
                                    >
                                        <XMarkIcon className="h-[18px] w-[18px]"/>
                                    </button>
                                </div>
                                <hr />
                                <div className="mt-2">
                                    {data ? (
                                            <FileListing
                                                data={data}
                                                fileAction={(file) =>
                                                {
                                                    setSelectedFile(file);
                                                    setSelectedFolder(undefined);
                                                }}
                                                folderAction={(file) => {
                                                    setSelectedFolder(file);
                                                    setSelectedFile(undefined);
                                                }}/>
                                        ) :
                                        (
                                            <div className="flex justify-center items-center">
                                                <p className="text-red-500">Oops Something Went Wrong</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            disabled={!selectedFile || !selectedFolder}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => scheduleAction(false)}
                        >
                            <ArrowUpTrayIcon className="h-5 w-5 mr-2"/>
                            Upload
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                            disabled={!selectedFolder}
                            onClick={() => scheduleAction(true)}
                        >
                            <ArrowPathIcon className="h-5 w-5 mr-2"/>
                            Sync
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
