import { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderPost from '../components/HeaderPost';
import { Categorys, Post } from '../types';
import Category from '../components/Category';

const Home = () => {

	const [randPost, setRandPost] = useState<Post>()
	const [loading, setLoading] = useState(true)

	const categorys: Categorys[] = ["Art", "Tech", "Food", "Cinema", "Design", "Science"]

	useEffect(() => {
		axios.get(`http://localhost:8080/blogs/random`)
			.then((res) => {
				setRandPost(res.data)
			})
			.catch((err) => {
				console.error(err)
				setLoading(false)
			})
		setLoading(false)
	}, [])

	if (loading || randPost == undefined) {
		return (
			<div className="animate-pulse px-6 md:px-[15vw] py-6 gap-4">
				<HeaderPost className="col-span-1 md:col-span-2 xl:col-span-3 mb-3"/>
			</div>
		)
	}

	return (
		<div className="space-y-3 px-6 md:px-[15vw] py-6">
			<h1 className='italic flex items-center font-bold text-xl md:text-2xl lg:text-3xl'>Random Post Of The Day:</h1>
			<HeaderPost post={randPost} />
			{categorys.map((name, i) => {
				return <Category key={i} categoryName={name} />
			})}
		</div>
	)
}

export default Home
