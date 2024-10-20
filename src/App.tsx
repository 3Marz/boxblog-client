import {
	createBrowserRouter,
	RouterProvider,
	Outlet
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Single from "./pages/Single.jsx";
import Write from "./pages/Write.jsx";
import Login from "./pages/Login.jsx";

const Layout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	)
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />
			},
			{
				path: "/post/:id",
				element: <Single />
			},
			{
				path: "/write",
				element: <Write />
			}
		]
	},
	{
		path: "/login",
		element: <Login />
	}
]);

function App() {

	return (
		<div className="font-mono h-[100%]">
			<RouterProvider router={router} />
		</div>
	)
}

export default App
