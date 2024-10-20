import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser'
import { Post } from '../types';

const Single = () => {

	const [post, setPost] = useState<Post>()
	const { id } = useParams();

	const posts = [
		{
			id: 1,
			title: "Java is Ass",
			desc: "Officia reprehenderit labore occaecat consequat commodo consectetur culpa velit elit et.  ",
			img: "https://source.unsplash.com/random/300x300/?programming"
		},
		{
			id: 2,
			title: "Pygame image Rotation",
			desc: "In duis eiusmod elit voluptate ea velit magna mollit.",
			img: "https://source.unsplash.com/random/300x300/?programming&1"
		},
		{
			id: 3,
			title: "how to use Hooks in react",
			desc: "Tempor id ea id sint id ea magna minim sint.",
			img: "https://source.unsplash.com/random/300x300/?programming&2"
		},
		{
			id: 4,
			title: "Godot 3.4 Update Dropped",
			desc: "Aliquip ut qui do fugiat nulla aliqua voluptate cillum ut irure proident labore sint consectetur anim incididunt veniam.",
			img: "https://source.unsplash.com/random/300x300/?programming&3"
		}
	]

	useEffect(() => {
		if (id != undefined) {
			axios.get(`http://localhost:8080/blogs/${id}`)
				.then((res) => {
					setPost(res.data);
				})
				.catch((err) => {
					console.error(err);
				})
		}

	}, [])

	return (
		<div className="px-6 lg:px-32 py-6 lg:flex md:flex">
			<div className="w-full space-y-4">
				<div className="space-y-4">
					<img
						className="w-full border border-black shadow-[5px_5px_black] min-h-[320px] max-h-[320px]"
						src={`http://localhost:8080/uploads/${post?.image}`}
					/>
					<div className="gap-2 flex place-items-end">
						<img
							src="https://source.unsplash.com/random/60x60/?profile"
							alt=""
							className="rounded-full"
						/>
						<div className="flex flex-col">
							<span className="text-3xl">Jhon</span>
							<span>Publishd 2 hours ago</span>
						</div>

						<div className="ml-auto text-2xl space-x-3 *:underline">
							<Link className="hover:italic" to="/write?edit=2">Edit</Link>
							<Link className="hover:italic" to="/">Delete</Link>
						</div>
					</div>
				</div>

				<hr className="border-black" />

				<div className="space-y-3">
					<h1 className="text-4xl font-semibold">{post?.title}</h1>
					<div className="
						  [&_ul]:list-disc [&_ul]:list-inside
						  [&_ol]:list-decimal [&_ol]:list-inside
						  [&_h1]:text-3xl
						  [&_h2]:text-2xl
						  [&_h3]:text-lg
						  [&_a]:text-sky-600 [&_a]:underline" >
						{post && parse(post?.body)}
					</div>
				</div>
			</div>

			<div className="w-full md:w-[50%] lg:w-[50%] py-3 px-0 md:px-8 lg:px-8 space-y-2">
				<h1 className="text-2xl">Posts you may like</h1>
				<div className="space-y-4 w-full">
					{posts.map(post => {
						return (
							<div key={post?.id} className="border border-black p-3 w-full">
								<Link to={`/post?/${post?.id}`} className="hover:underline">
									<img className="border border-black w-full h-28 object-cover" src={post?.img} alt="" />
									<h1 className="text-lg">{post?.title}</h1>
								</Link>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	);
};

export default Single;
