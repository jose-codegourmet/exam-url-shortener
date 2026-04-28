import { Link, Outlet } from "react-router-dom";

export default function App() {
	return (
		<main className="min-h-screen bg-slate-950 text-slate-100">
			<div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10">
				<header className="flex items-center justify-between">
					<h1 className="text-2xl font-bold">ShortCircuit</h1>
					<nav>
						<Link className="text-sm text-cyan-300 hover:text-cyan-200" to="/">
							Home
						</Link>
					</nav>
				</header>
				<Outlet />
			</div>
		</main>
	);
}
