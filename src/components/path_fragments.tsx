import Link from "next/link";
import {ChevronRightIcon, HomeIcon} from '@heroicons/react/24/solid'

export default function PathFragments({path}: { path: string }) {
    return (
        <nav
            className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb">
            <ol className="inline-flex items-center">
                <li className="inline-flex items-center mx-2">
                    <Link href="/"
                          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <HomeIcon width={20} height={20} className="text-gray-500"/>
                    </Link>
                </li>
                {path.split("/").map((part, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && <ChevronRightIcon className="h-5 w-5 text-gray-400 mx-2"/>}
                        <Link href={`/?path=${path.split("/").slice(0, ++index).join("/")}`}
                              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                        >
                            {part}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
