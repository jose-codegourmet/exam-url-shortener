import { useQuery } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "./NotFound";

type HelloResponse = {
	message: string;
};

function Home() {
	const backendUrl =
		import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

	const helloQuery = useQuery({
		queryKey: ["hello-world"],
		queryFn: async (): Promise<HelloResponse> => {
			const response = await fetch(`${backendUrl}/hello`);
			if (!response.ok) {
				throw new Error("Unable to reach backend hello endpoint.");
			}

			return response.json() as Promise<HelloResponse>;
		},
	});

	return (
		<section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
			<h2 className="text-lg font-semibold">Monorepo foundation is ready</h2>
			<p className="mt-2 text-sm text-slate-300">
				Next phase will wire URL creation, listing, and backend integration.
			</p>
			<div className="mt-4 rounded border border-slate-700 p-3 text-sm text-slate-200">
				{helloQuery.isLoading && <p>Loading backend message...</p>}
				{helloQuery.isError && (
					<p className="text-red-300">
						{helloQuery.error instanceof Error
							? helloQuery.error.message
							: "Unknown error while loading backend message."}
					</p>
				)}
				{helloQuery.isSuccess && <p>Backend says: {helloQuery.data.message}</p>}
			</div>
		</section>
	);
}

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "*", element: <NotFound /> },
		],
	},
]);
