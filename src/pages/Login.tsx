import { NavLink, useNavigate } from "react-router-dom"
import { FormEvent, useContext, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { FaCheckCircle } from "react-icons/fa"
import { EyeIcon } from "../components/EyeIcon"
import { UserContext } from "../App"
import { baseUrl } from "../config"

const Login = () => {

	const user = useContext(UserContext)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPass, setShowPass] = useState("password")

	const [loading, setLoading] = useState(false)

	const [error, setError] = useState("")

	const navigate = useNavigate();

	function handleLogin(e: FormEvent) {
		e.preventDefault()
		setLoading(true)
		axios.post(`${baseUrl}/users/login`, {
			email,
			password
		}, {withCredentials: true})
			.then((res) => {
				if (res.status == 200) {
					toast(res.data.massege, {
						icon: <FaCheckCircle />,
					})
					localStorage.setItem("JWT_USER_TOKEN", res.data.token);
					user?.setUserId(res.data.userId)
					navigate("/")
				}
			})
			.catch((err) => {
				setLoading(false)
				setError(err.response.data.error)
			})
	}

	return (
		<div>
			{loading &&
				<div className="bg-[#1d1d1d80] w-full h-[100dvh] top-0 fixed animate-pulse z-50"></div>
			}
			<div className="text-lg md:text-2xl flex flex-col justify-center place-items-center h-screen space-y-8">
				<form onSubmit={handleLogin} className="w-[80dvw] md:w-[50dvw] border-black border-2 shadow-[8px_8px_black] p-4 md:p-8 bg-beige-200 flex-col flex">
					<label htmlFor="userName">Email:</label>
					<input value={email} onChange={(e) => { setEmail(e.target.value) }} className="border border-black p-2 text-sm md:text-lg mt-3" type="email" required />

					<label className="mt-4 flex justify-between place-items-center" htmlFor="password">
						Password:
						<EyeIcon verb={showPass} setter={setShowPass} />
					</label>
					<input value={password} onChange={(e) => { setPassword(e.target.value) }} className="border border-black p-2 text-sm md:text-lg mt-3" type={showPass} minLength={8} required />

					<button className="p-1 duration-300 hover:shadow-[0px_0px_black] shadow-[3px_3px_black] mt-5 border-2 border-black" type="submit">Login</button>
					{error && <p className="text-center text-red-600 md:text-xl pt-3">{error}</p>}
				</form>
				<p className="text-lg md:text-xl">Dont have an account? <NavLink className="text-blue-800 hover:underline" to="/signup">Sign Up</NavLink></p>
				<NavLink className="text-blue-800 hover:underline md:text-xl text-lg" to="/">Back To Home</NavLink>
			</div>
		</div>
	)
}

export default Login
