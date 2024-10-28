
import { NavLink } from 'react-router-dom'
import { ReactNode, useState } from 'react'

type NavButtonProps = {
	className?: string
	to: string
	value: string
	children?: ReactNode
}

export default function NavButton(props : NavButtonProps) {

	const [hover, setHover] = useState(false)


	const handleHover = () => {
		setHover(!hover)
	}

	return (
		<NavLink onMouseEnter={handleHover} onMouseLeave={handleHover} 
			className={"bg-size-10 hover:bg-doted-bg flex justify-center place-items-center h-full px-2 mx-1 " + props.className} to={props.to}>
			<span className="bg-beige-300 p-[2px]">{props.value}</span>
			{hover &&
				<div className="absolute top-12">
					{props.children}
				</div> 
			}
		</NavLink>
	)
}


