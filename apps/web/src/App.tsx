import { Outlet } from "react-router-dom";

export default function App() {
	return (
		<main className="min-h-screen bg-background text-on-background">
			<Outlet />
		</main>
	);
}
