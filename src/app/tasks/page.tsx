"use client"

import {useEffect, useState} from "react";
import {Task} from "@/api/models";
import {get, toHumanTime} from "@/api/utils";
import {TASKS_URL} from "@/api/urls";
import useSWR from "swr";
import Link from "next/link";

export default function Tasks() {
    const {data, error, isLoading} = useSWR(TASKS_URL, get<Task[]>({}));

    if (isLoading)
        return "Loading...";

    if (!data || error)
        return "Oops Something went wrong";

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((task, i) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {task.name}
                            </th>
                            <td className="px-6 py-4">
                                {task.status}
                            </td>
                            <td className="px-6 py-4">
                                {toHumanTime(task.schedule_time)}
                            </td>
                            <td className="px-6 py-4">
                                <Link href={`tasks/${task.id}`}
                                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}
