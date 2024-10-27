import {
	createBrowserRouter,
	RouterProvider,
	Outlet
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
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
				path: "/blog/:id",
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
	},
	{
		path: "/signup",
		element: <Signup />
	}
]);

function App() {

	return (
		<div className="font-mono h-[100%]">
			<ToastContainer 
				position="top-center"
				hideProgressBar
				toastClassName="bg-beige-100 text-black rounded-none ring-2 ring-black shadow-[4px_4px_black]"
			/>
			<RouterProvider router={router} />
		</div>
	)
}

export default App
