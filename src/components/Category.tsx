import { useEffect, useState } from 'react';
import CardPost from '../components/CardPost';
import { Post } from '../types';
import axios from 'axios';

type CategorysProps = {
	categoryName: string
}

export default function Category({ categoryName }: CategorysProps) {

	const [posts, setPosts] = useState<Post[]>()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios.get(`http://localhost:8080/blogs?cat=${categoryName}`)
			.then((res) => {
				setPosts(res.data.data)
			})
			.catch((err) => {
				console.error(err)
				setLoading(false)
			})
		setLoading(false)
	}, [])

	if(loading || posts == undefined) {
		return <div className="bg-[#1d1d1d80] w-full h-full top-0 fixed animate-pulse z-50"></div>
	}

	return (
		<div className='text-2xl font-bold'>
			<h2>{categoryName}:</h2>
			<div>
				{posts.map((post, i) => {
					return <CardPost key={i} post={post} />
				})}
			</div>
		</div>
	)
}

