import axios from "axios"
import { FormEvent, useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { EyeIcon } from "../components/EyeIcon"

const Signup = () => {

	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPass, setShowPass] = useState("password")

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	const navigate = useNavigate();

	const handleSignup = (e: FormEvent) => {
		setLoading(true)
		e.preventDefault()
		axios.post("http://localhost:8080/users/signup", {
			username,
			email,
			password
		})
			.then((res) => {
				if (res.status === 201) {
					toast("User Succesfuly Signed Up", {
						icon: <FaCheckCircle />,
					})
					navigate("/login")
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
				<div className="bg-[#2e2e2e80] w-full h-[100dvh] top-0 fixed animate-pulse z-50"></div>
			}
			<div className="md:text-2xl text-lg flex flex-col justify-center place-items-center h-screen space-y-8">
				<form onSubmit={handleSignup} className="w-[80dvw] md:w-[50dvw] border-black border-2 shadow-[8px_8px_black] p-4 md:p-8 bg-beige-200 flex-col flex md:space-y-3">
					<label htmlFor="userName">Username:</label>
					<input value={username} onChange={(e) => { setUsername(e.target.value) }} className="border border-black p-2 text-sm md:text-lg" type="text" minLength={2} required />

					<label htmlFor="userName">Email:</label>
					<input value={email} onChange={(e) => { setEmail(e.target.value) }} className="border border-black p-2 text-sm md:text-lg" type="email" required />

					<label className="flex justify-between place-items-center" htmlFor="password">
						<p>Password:</p>
						<EyeIcon verb={showPass} setter={setShowPass} />
					</label>
					<input value={password} onChange={(e) => { setPassword(e.target.value) }} className="border border-black p-2 text-sm md:text-lg" type={showPass} minLength={8} required />

					<button className="p-1 duration-300 hover:shadow-[0px_0px_black] shadow-[3px_3px_black] mt-4 border-2 border-black" type="submit">Sign Up</button>
					{error && <p className="text-center text-red-600 md:text-xl pt-3">{error}</p>}
				</form>
				<p className="md:text-xl text-lg">Have an account? <NavLink className="text-blue-800 hover:underline" to="/login">Login</NavLink></p>
				<NavLink className="text-blue-800 hover:underline md:text-xl text-lg" to="/">Back To Home</NavLink>
			</div>
		</div>
	)
}

export default Signup
