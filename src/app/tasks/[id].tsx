import {useRouter} from "next/router";
import useSWR from "swr";
import {Task} from "@/api/models";
import {get} from "@/api/utils";
import {TASKS_URL} from "@/api/urls";

export default function TaskItem() {
    const router = useRouter();
    const currentUrl = `${TASKS_URL}/${router.query.id}`;

    const {data, error, isLoading} = useSWR(TASKS_URL, get<Task>({}));

    if (isLoading)
        return "Loading...";

    if (!data || error)
        return "Oops Something Went Wrong";

    return (
        <div>

        </div>
    );
}
