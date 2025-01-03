import { NavLink } from 'react-router-dom'
import NavButton from './NavButton.jsx'
import { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../App.js'
import axios from 'axios'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoClose } from 'react-icons/io5'
import { baseUrl } from '../config.js'
import { LuMoon, LuSun } from 'react-icons/lu'

const Navbar = () => {

	const navRef = useRef<HTMLDivElement>(null)

	const user = useContext(UserContext);

	const [isLogged, setIsLogged] = useState(false)

	const [username, setUsername] = useState("")

	useEffect(() => {
		if (user?.userId) {
			axios.get(`${baseUrl}/users/id/${user.userId}`)
				.then((res) => {
					setUsername(res.data.username)
				})
			setIsLogged(true)
		}
	})


	const [mobileNav, setMobileNav] = useState(false)

	function handleMobileNav() {
		navRef.current?.classList.toggle('hidden')
		navRef.current?.classList.toggle('flex')
		setMobileNav(!mobileNav)
	}

	const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

	function handleTheme() {
		setTheme(theme=='light' ? 'dark' : 'light')
	}

	useEffect(() => {
		const storageTheme = localStorage.getItem('theme')
		if (storageTheme) {
			if(!document.body.classList.replace(storageTheme, theme)) {
				document.body.classList.add(storageTheme)
			}
			localStorage.setItem("theme", theme)
		} else {
			document.body.classList.add("light")
			localStorage.setItem("theme", "light")
		}
	}, [theme])
	
	return (
		<nav className="h-14 z-30 flex place-items-center sticky top-0 bg-beige-300 justify-between border-b-2 border-border-color">
			<div className="ml-2 flex items-center space-x-2">
				<NavLink className="font-bold text-2xl" to="/">[BoxBlog]</NavLink>
				<div className='cursor-pointer active:rotate-45 duration-75' onClick={handleTheme}>
					{theme == 'light' ? <LuSun size={24}/> : <LuMoon size={24}/>}
				</div>
			</div>
			<button onClick={handleMobileNav} className='sm:hidden p-4 active:rotate-45 duration-75'>{mobileNav ? <IoClose size={32} /> : <GiHamburgerMenu size={28} />}</button>
			<div ref={navRef} className='sm:flex sm:flex-row sm:static sm:bg-transparent sm:h-full sm:space-y-0 sm:border-0
							bg-beige-300 top-14 right-0 h-fit absolute hidden border-l-2 border-b-2 border-border-color *:p-5
							flex-col peer-focus:flex rounded-bl' id="navbar-default">
				{
					!isLogged ?
						<>
							<NavButton className='font-bold' value="Signup" to="/signup" />
							<NavButton value="Login" to="/login" />
						</>
						:
						<>
							<NavButton value={username} to={`/user/${username}`} />
							<NavButton value="Logout" to="/logout" />
						</>
				}
				<button className='group z-20 relative active:bg-doted-bg hover:bg-doted-bg bg-size-10 h-full mx-1 px-2 flex justify-center items-center'>
					<span className='bg-beige-300'>Category</span>
					<ul className="rounded hidden text-left group-hover:flex group-focus:flex absolute sm:top-12 top-0 right-28 sm:right-auto flex-col bg-beige-100 p-2 border-border-color border">
						<NavLink onClick={handleMobileNav} className="hover:border-border-color hover:italic border-transparent border-b text-black" to="/blogs/Art">Art</NavLink>
						<NavLink onClick={handleMobileNav} className="hover:border-border-color hover:italic border-transparent border-b text-black" to="/blogs/Science">Science</NavLink>
						<NavLink onClick={handleMobileNav} className="hover:border-border-color hover:italic border-transparent border-b text-black" to="/blogs/Tech">Tech</NavLink>
						<NavLink onClick={handleMobileNav} className="hover:border-border-color hover:italic border-transparent border-b text-black" to="/blogs/Cinema">Cinema</NavLink>
						<NavLink onClick={handleMobileNav} className="hover:border-border-color hover:italic border-transparent border-b text-black" to="/blogs/Food">Food</NavLink>
					</ul>
				</button>
				<NavButton onClick={handleMobileNav} value="Write" to="/write" />
			</div>
		</nav>
	)
}

export default Navbar
