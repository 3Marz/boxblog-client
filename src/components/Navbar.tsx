
import {NavLink, Link} from 'react-router-dom'
import NavButton from './NavButton.jsx'

const Navbar = () => {
  return (
    <nav className="h-14 flex place-items-center border-b-2 border-black">
    	<div className="flex-grow ml-2">
    	    <NavLink className="font-bold text-2xl" to="/">[BoxBlog]</NavLink>	
    	</div>
    	<NavButton className="" to="#" value="Category">
        <ul className="flex flex-col z-10 bg-beige-100 p-2 border-black border">
          <Link className="hover:border-black hover:italic border-transparent border-b" to="/?cat=art">Art</Link>
          <Link className="hover:border-black hover:italic border-transparent border-b" to="/?cat=science">Science</Link>
          <Link className="hover:border-black hover:italic border-transparent border-b" to="/?cat=tech">Tech</Link>
          <Link className="hover:border-black hover:italic border-transparent border-b" to="/?cat=cinema">Cinema</Link>
          <Link className="hover:border-black hover:italic border-transparent border-b" to="/?cat=food">Food</Link>
        </ul>    
      </NavButton>
    	<NavButton value="Omar" to="/" />	
    	<NavButton value="Logout" to="/" />	
    	<NavButton value="Write" to="/write" className="font-semibold" />	
    </nav>
  )
}

export default Navbar
