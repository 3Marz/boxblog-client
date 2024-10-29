
import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'

type NavButtonProps = {
	className?: string
	to: string
	value: string
	children?: ReactNode
}

export default function NavButton(props : NavButtonProps) {

	return (
		<NavLink 
			className={"bg-size-10 hover:bg-doted-bg active:bg-doted-bg flex justify-center place-items-center h-full " + props.className} to={props.to}>
			<span className="bg-beige-300">{props.value}</span>
		</NavLink>
	)
}


