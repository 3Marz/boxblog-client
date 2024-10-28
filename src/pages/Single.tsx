import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser'
import { Post } from '../types';
import { UserContext } from '../App';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';

const Single = () => {

	const { id } = useParams();
	const user = useContext(UserContext)

	const [post, setPost] = useState<Post>()
	const [timeSince, setTimeSince] = useState("")

	const navigate = useNavigate()

	useEffect(() => {
		if (id != undefined) {
			axios.get(`http://localhost:8080/blogs/${id}`)
				.then((res) => {
					setPost(res.data);
					//get and format the date
					setTimeSince(new Date(res.data.createdAt).toDateString())
				})
				.catch((err) => {
					console.error(err);
				})
		}

	}, [])

	function handleDelete() {
		const token = localStorage.getItem("JWT_USER_TOKEN");
		axios.delete(`http://localhost:8080/blogs/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			},
			withCredentials: true
		})
			.then((res) => {
				if (res.status == 200) {
					toast(res.data.message, {
						icon: <FaCheckCircle />,
					})
					navigate("/")
				}
			})
			.catch((err) => {
				console.error(err)
			})
	}

	return (
		<div className="py-6 flex flex-col items-center">
			<div className="w-[95%] md:w-[45rem] space-y-8">
				<div className="space-y-4">

					<h1 className="text-4xl md:text-5xl font-semibold">{post?.title}</h1>
					<hr className="border-black border-dashed" />

					<div className="gap-2 flex place-items-end">
						<div className="flex flex-col">
							<span className="text-2xl">{post?.username}</span>
							<span>Posted At {timeSince}</span>
						</div>

						<div className="ml-auto text-2xl space-x-3 *:underline">
							{/*<Link className="hover:italic" to="/write?edit=2">Edit</Link>*/}
							{post?.userId == user?.userId && <button className="hover:italic" onClick={handleDelete}>Delete</button>}
						</div>
					</div>

					<div className="flex items-center justify-center bg-black border border-black overflow-hidden aspect-video object-cover">
						<img
							src={`http://localhost:8080/uploads/${post?.image}`}
						/>
					</div>
				</div>


				<div className="space-y-3">
					<div className="prose prose-sm text-black marker:text-black prose-headings:my-2 
									prose-p:my-2 prose-li:my-1 md:prose-base prose-a:text-blue-700">
						{post && parse(post?.body)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Single;
