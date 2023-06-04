"use client";

import {useSearchParams} from "next/navigation";

export default function Upload() {
    const path = useSearchParams().get("path") || "";

    return path;
}
