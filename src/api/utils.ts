import {BASE_URL, FILE_URL} from "@/api/urls";

export function get<model>(params: Record<string, string>) {
    return async (url: string) => {
        const url_params = new URLSearchParams(params).toString();
        const response = await fetch(`${url}?${url_params}`);

        if (!response.ok || response.status !== 200)
            throw new Error(response.statusText);

        return (await response.json()) as model;
    };
}

export function post<model>(params: Record<string, string>) {
    return async (url: string) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        if (!response.ok || response.status !== 200)
            throw new Error(response.statusText);

        return (await response.json()) as model;
    };
}

export function openFile(path: string) {
    window.open(`${FILE_URL}${path}`, '_blank');
}

export function toHumanTime(date: string | Date): string {
    if (typeof date === "string")
        date = new Date(date);

    const now = Date.now();
    const diff = now - date.getTime();

    if (diff > 24 * 3600000)
        return date.toDateString();

    if (diff > 3600000)
        return `${Math.round(diff / 3600000)} Hours Ago`;

    if (diff > 60000)
        return `${Math.round(diff / 60000)} Minutes Ago`;

    return `${Math.round(diff / 1000)} Seconds Ago`;
}
