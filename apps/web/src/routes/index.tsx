import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardPage from "./DashboardPage";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import NotFound from "./NotFound";
import SignUpPage from "./SignUpPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <LandingPage /> },
			{ path: "login", element: <LoginPage /> },
			{ path: "sign-up", element: <SignUpPage /> },
			{ path: "dashboard", element: <DashboardPage /> },
			{ path: "*", element: <NotFound /> },
		],
	},
]);
