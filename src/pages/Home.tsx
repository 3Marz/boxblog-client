import { useState, useEffect } from 'react';
import axios from 'axios';
import CardPost from '../components/CardPost';
import HeaderPost from '../components/HeaderPost';
import { Categorys, Post } from '../types';

type PostsCategorys = {
	Art: Post[]
	Tech: Post[]
	Food: Post[]
	Cinema: Post[]
	Design: Post[]
	Science: Post[]
}

const Home = () => {

	const [posts, setPosts] = useState<PostsCategorys>()
	const [loading, setLoading] = useState(true)

	const categorys: Categorys[] = ["Art", "Tech", "Food", "Cinema", "Design", "Science"]

	useEffect(() => {
		let allObj: PostsCategorys = {
			Art: [],
			Tech: [],
			Food: [],
			Cinema: [],
			Design: [],
			Science: []
		}
		for (const category of categorys) {
			axios.get(`http://localhost:8080/blogs?cat=${category}`)
				.then((res) => {
					allObj[category] = res.data;
					setLoading(false)
				})
				.catch((err) => {
					console.error(err)
				})
		}
		setPosts(allObj)
		console.log(allObj)
	}, [])

	if (loading) {
		return <div className="bg-[#1d1d1d80] w-full h-[100dvh] top-0 fixed animate-pulse z-50"></div>
	}

	return (
		<div className="grid md:grid-cols-2 xl:grid-cols-3 px-6 md:px-[15vw] py-6 gap-4">
			<HeaderPost className="col-span-1 md:col-span-2 xl:col-span-3 mb-3" post={posts?.Art[0]} />
		</div>
	)
}

export default Home
