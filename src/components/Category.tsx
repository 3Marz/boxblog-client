import { useEffect, useState } from 'react';
import CardPost from '../components/CardPost';
import { Post } from '../types';
import axios from 'axios';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { baseUrl } from '../config';

type CategorysProps = {
	categoryName: string
}

export default function Category({ categoryName }: CategorysProps) {

	const [posts, setPosts] = useState<Post[]>()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios.get(`${baseUrl}/blogs?cat=${categoryName}&limit=3`)
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
	
	if(posts.length == 0) {
		return
	}

	return (
		<div className='space-y-2'>
			<Link to={`/blogs/${categoryName}`} className='italic w-fit flex items-center font-bold hover:underline text-2xl lg:text-3xl'>{categoryName}:<FaExternalLinkAlt className='mx-2 size-5 lg:size-6'/></Link>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
				{posts.map((post, i) => {
					return <CardPost className="limit" key={i} post={post} />
				})}
			</div>
		</div>
	)
}

