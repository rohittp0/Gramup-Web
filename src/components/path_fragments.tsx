import Link from "next/link";
import { ChevronRightIcon } from '@heroicons/react/24/outline'

export default function PathFragments({path}: { path: string }) {
    return (
        <div className="flex items-center flex-row bg-blue-900 p-3 rounded-md">
            {path.split("/").map((part, index) => (
                <div key={index} className="flex">
                    {index > 0 && <ChevronRightIcon className="h-6 w-6" />}
                    <Link href={`/?path=${path.split("/").slice(0, ++index).join("/")}`}>
                        <p className="px-4">{part}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}
