import { useContext, useEffect } from "react"
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";

export default function Logout() {

	const user = useContext(UserContext)

	const navigate = useNavigate()

	useEffect(() => {
		localStorage.clear();
		user?.setUserId(null)
		toast("Logged Out Succesfuly", {
			icon: <FaCheckCircle />,
		})
		navigate("/")	
	})

	return (
		<div>Logging You Out...</div>
	)
}
