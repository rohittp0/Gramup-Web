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

export function openFile(fileId: string){
    window.open(`${FILE_URL}?id=${fileId}`, '_blank');
}
