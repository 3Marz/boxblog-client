import { NavLink, Link } from 'react-router-dom'
import NavButton from './NavButton.jsx'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App.js'
import axios from 'axios'

const Navbar = () => {

	const user = useContext(UserContext);

	const [isLogged, setIsLogged] = useState(false)

	const [username, setUsername] = useState("")

	useEffect(() => {
		if (user?.userId) {
			axios.get(`http://localhost:8080/users/id/${user.userId}`)
				.then((res) => {
					setUsername(res.data.username)
				})
			setIsLogged(true)
		}
	})

	return (
		<nav className="h-14 flex place-items-center justify-between border-b-2 border-black">
			<div className="ml-2">
				<NavLink className="font-bold text-lg md:text-2xl" to="/">[BoxBlog]</NavLink>
			</div>
			<div className='flex h-full'>
				{
					!isLogged ?
						<>
							<NavButton value="Signup" to="/signup" />
							<NavButton value="Login" to="/login" />
						</>
						:
						<NavButton value={username} to={`/user/${username}`} />
				}
				<NavButton className="z-10" to="#" value="Category">
					<ul className="flex flex-col bg-beige-100 p-2 border-black border">
						<Link className="hover:border-black hover:italic border-transparent border-b" to="/?cat=art">Art</Link>
						<Link className="hover:border-black hover:italic border-transparent border-b" to="/?cat=science">Science</Link>
						<Link className="hover:border-black hover:italic border-transparent border-b" to="/?cat=tech">Tech</Link>
						<Link className="hover:border-black hover:italic border-transparent border-b" to="/?cat=cinema">Cinema</Link>
						<Link className="hover:border-black hover:italic border-transparent border-b" to="/?cat=food">Food</Link>
					</ul>
				</NavButton>
				<NavButton value="Write" to="/write" className="font-semibold" />
			</div>
		</nav>
	)
}

export default Navbar
