import { useState, useEffect } from 'react';
import axios from 'axios';
import CardPost from '../components/CardPost';

const Home = () => {

	const [posts, setPosts] = useState([])

	useEffect(() => {
		axios.get('http://localhost:8080/blogs')
			.then((res) => {
				//console.log(res);
				setPosts(res.data.data);
			})
			.catch((err) => {
				console.error(err)
			})
	}, [])

	return (
		<div className="grid lg:grid-cols-2 p-6 gap-4">
			{posts.map((post, i) => {
				return (
					<CardPost key={i} post={post} />
				)
			})}
		</div>
	)
}

export default Home
