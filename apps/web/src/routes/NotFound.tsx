import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<section className="rounded-lg border border-rose-900 bg-rose-950/20 p-6">
			<h2 className="text-lg font-semibold">Page not found</h2>
			<p className="mt-2 text-sm text-slate-300">
				The page you requested does not exist.
			</p>
			<Link
				className="mt-4 inline-block text-cyan-300 hover:text-cyan-200"
				to="/"
			>
				Back to home
			</Link>
		</section>
	);
}
