import axios from "axios"
import { useEffect, useState } from "react"
import { Post } from "../types"
import { useParams } from "react-router-dom";
import CardPost from "../components/CardPost";

export default function CategorizedBlogs() {

	const { category } = useParams();

	const [loading, setLoading] = useState(false)
	const [posts, setPosts] = useState<Post[]>([])

	useEffect(() => {
		axios.get(`http://localhost:8080/blogs?cat=${category}`)
			.then((res) => {
				setPosts(res.data.data)
			})
			.catch((err) => {
				console.error(err)
				setLoading(false)
			})
		setLoading(false)
	}, [])

	if (loading) {
		return <div className="bg-[#1d1d1d80] w-full h-[100dvh] top-0 fixed animate-pulse z-50"></div>
	}

	return (
		<div className="px-6 md:px-[15vw] py-6 space-y-3">
			<h1 className="text-2xl md:text-3xl font-bold">{category} Blogs:</h1>
			<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
				{posts.map((post, i) => {
					return <CardPost key={i} post={post} />
				})}
			</div>
		</div>
	)
}

