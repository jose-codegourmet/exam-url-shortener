const DEFAULT_API_URL = "http://localhost:3000";

const trimTrailingSlashes = (value: string) => value.replace(/\/+$/, "");

export const getApiUrl = () => {
	const configured = import.meta.env.VITE_API_URL;
	if (typeof configured !== "string" || configured.trim().length === 0) {
		return DEFAULT_API_URL;
	}

	return trimTrailingSlashes(configured.trim());
};

type PostJsonOptions = {
	path: string;
	body: unknown;
};

export const postJson = async <TResponse>({
	path,
	body,
}: PostJsonOptions): Promise<TResponse> => {
	const response = await fetch(`${getApiUrl()}${path}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const payload = (await response.json()) as TResponse & { error?: string };
	if (!response.ok) {
		throw new Error(payload.error ?? "Request failed.");
	}

	return payload;
};
