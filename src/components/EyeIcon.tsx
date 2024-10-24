import React from "react"
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi"

type EyeIconProps = {
	setter: React.Dispatch<string>
	verb: string
}

export function EyeIcon({ setter, verb }: EyeIconProps) {

	function handlePassToggle() {
		setter(verb == "password" ? "text" : "password")
	}

	return (
		verb == "password" ? <PiEyeClosedDuotone size={24} onClick={handlePassToggle} /> : <PiEyeDuotone size={24} onClick={handlePassToggle} />
	)
}

