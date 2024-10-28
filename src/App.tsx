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
import CategorizedBlogs from "./pages/CategorizedBlogs";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "./pages/UserProfile";

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
			},
			{
				path: "/blogs/:category",
				element: <CategorizedBlogs />
			},
			{
				path: "/user/:username",
				element: <UserProfile />
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

type UserContextType = {
	userId: number | null
	setUserId: React.Dispatch<React.SetStateAction<UserContextType['userId']>>
}
export const UserContext = createContext<UserContextType | null>(null)

function App() {

	const [userId, setUserId] = useState<number | null>(null)

	useEffect(() => {
		const token = localStorage.getItem("JWT_USER_TOKEN");
		axios.post('http://localhost:8080/users/isSigned', undefined, {
			headers: {
				Authorization: `Bearer ${token}`
			},
			withCredentials: true
		})
			.then((res) => {
				if (res.data.token) {
					localStorage.setItem("JWT_USER_TOKEN", res.data.token);
				}
				setUserId(res.data.userId)
			})
	})

	return (
		<UserContext.Provider value={{ userId, setUserId }}>
			<div className="font-mono">
				<ToastContainer
					position="top-center"
					hideProgressBar
					toastClassName="bg-beige-100 text-black rounded-none ring-2 ring-black shadow-[4px_4px_black]"
				/>
				<RouterProvider router={router} />
			</div>
		</UserContext.Provider>
	)
}

export default App
