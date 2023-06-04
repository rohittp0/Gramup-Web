export function get<model>(params: Record<string, string>) {
    return async (url: string) => {
        const url_params = new URLSearchParams(params).toString();
        const response = await fetch(`${url}?${url_params}`);

        if (!response.ok || response.status !== 200)
            throw new Error(response.statusText);

        return (await response.json()) as model;
    };
}
