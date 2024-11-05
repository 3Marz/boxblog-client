import axios from "axios"
import { useEffect, useState } from "react"
import { Post, User } from "../types"
import { useParams } from "react-router-dom";
import CardPost from "../components/CardPost";
import { baseUrl } from "../config";

export default function UserProfile() {

	const { username } = useParams();

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [posts, setPosts] = useState<Post[]>([])
	const [user, setUser] = useState<User>()

	useEffect(() => {
		setLoading(true)
		axios.get(`${baseUrl}/users/${username}`)
			.then((res) => {
				setUser(res.data)
				axios.get(`${baseUrl}/blogs/u/${res.data.id}`)
					.then((nextRes) => {
						setPosts(nextRes.data.data)
					})
					.catch((err) => {
						console.error(err)
						setError(err.response.data.error)
						setLoading(false)
					})
			})
			.catch((err) => {
				console.error(err)
				setError(err.response.data.error)
				setLoading(false)
			})
		setLoading(false)
	}, [])

	if(error) {
		return <div className="px-6 md:px-[15vw] py-6 space-y-3 flex justify-center text-xl text-red-700">{error}</div>
	}

	if (loading || !user) {
		return <div className="bg-[#1d1d1d80] w-full h-full absolute animate-pulse z-50"></div>
	}

	return (
		<div className="px-6 md:px-[15vw] py-6 space-y-3">
			<div>
				<h1 className="text-2xl md:text-4xl font-bold">{user.username}</h1>
				<h3 className="text-lg md:text-xl font-thin">Joined At {new Date(user.createdAt).toDateString()}</h3>
			</div>
			<hr className="border-border-color border-dashed border-2" />
			<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
				{posts.map((post, i) => {
					return <CardPost key={i} post={post} />
				})}
			</div>
		</div>
	)
}

