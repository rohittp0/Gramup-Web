import {FolderIcon} from "@heroicons/react/24/solid";
import {FileIcon} from "react-file-icon";
import {Files, File} from "@/api/models";

interface FileListingProps {
    data: Files;
    fileAction: ((file: File) => unknown);
    folderAction: (file: File) => unknown;
}

export default function FileListing({data, fileAction, folderAction} : FileListingProps) {
    return (
        <>
            <div>
                <div className="flex flex-wrap p-5 gap-4">
                    {data?.map((file, index) => file.folder && (
                        <div key={index} className="flex flex-col items-center m-2">
                            <button
                                className="bg-white rounded-lg shadow-md hover:shadow-lg p-2 transition duration-200 flex items-center"
                                style={{width: 200}}
                                onClick={() => folderAction(file)}
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
                                className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition duration-200 focus:bg-gray-400"
                                onClick={() => fileAction(file)}
                                style={{width: 100, height: 100}}
                            >
                                <FileIcon extension={file.name} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
