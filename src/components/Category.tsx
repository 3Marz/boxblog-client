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
		return<p>Loading...</p> 
	}

	return (
		<div>
			<h2 className='font-bold text-2xl'>{categoryName}:</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
				{posts.map((post, i) => {
					return <CardPost className="limit" key={i} post={post} />
				})}
			</div>
		</div>
	)
}

