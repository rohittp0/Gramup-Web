"use client"

import useSWR from "swr";
import {Task} from "@/api/models";
import {get, toHumanTime} from "@/api/utils";
import {TASKS_URL} from "@/api/urls";

export default function TaskItem({params}: { params: { id: string } }) {
    const currentUrl = `${TASKS_URL}${params.id}`;

    const {data, error, isLoading} = useSWR(currentUrl, get<Task>({}));

    if (isLoading)
        return "Loading...";

    if (!data || error)
        return "Oops Something Went Wrong";

    return (
        <div className="p-5">
            <h2 className="text-2xl mb-2">{data.name}</h2>
            <div>Status: {data.status}</div>
            <div>Scheduled At: {toHumanTime(data.schedule_time)}</div>
            <div className="p-5 mx-2 flex justify-center content-center">
                <h3 className="text-xl">Details</h3>
                <div className="p-5">
                    {data.message}
                </div>
            </div>
        </div>
    );
}
