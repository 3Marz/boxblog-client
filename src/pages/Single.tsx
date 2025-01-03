import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser'
import { Post } from '../types';
import { UserContext } from '../App';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
import { baseUrl } from '../config';

const Single = () => {

	const { id } = useParams();
	const user = useContext(UserContext)

	const [post, setPost] = useState<Post>()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [timeSince, setTimeSince] = useState("")

	const navigate = useNavigate()

	useEffect(() => {
		setLoading(true)
		if (id != undefined) {
			axios.get(`${baseUrl}/blogs/${id}`)
				.then((res) => {
					setPost(res.data);
					//get and format the date
					setTimeSince(new Date(res.data.createdAt).toDateString())
				})
				.catch((err) => {
					console.error(err);
					setError(err.response.data.error)
					setLoading(false)
				})
		}
		setLoading(false)
	}, [])

	function handleDelete() {
		setLoading(true)
		const token = localStorage.getItem("JWT_USER_TOKEN");
		axios.delete(`${baseUrl}/blogs/${id}`, {
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
				setLoading(false)
			})
	}

	if(error) {
		return <div className="px-6 md:px-[15vw] py-6 space-y-3 flex justify-center text-xl text-red-700">{error}</div>
	}

	if (loading || !post) {
		return <div className="bg-[#1d1d1d80] w-full h-full absolute animate-pulse z-50"></div>
	}

	return (
		<div className="py-6 flex flex-col items-center">
			<div className="w-[95%] md:w-[45rem] space-y-8">
				<div className="space-y-4">

					<h1 className="text-4xl break-words md:text-5xl font-semibold">{post?.title}</h1>
					<hr className="border-border-color border-dashed" />

					<div className="gap-2 flex place-items-end">
						<div className="flex flex-col">
							<NavLink to={`/user/${post?.username}`} className="text-2xl hover:underline">{post?.username}</NavLink>
							<span>Posted At {timeSince}</span>
						</div>

						<div className="ml-auto text-2xl space-x-3 *:underline">
							{/*<Link className="hover:italic" to="/write?edit=2">Edit</Link>*/}
							{post?.userId == user?.userId && <button className="hover:italic" onClick={handleDelete}>Delete</button>}
						</div>
					</div>

					<div className="rounded-lg flex items-center justify-center bg-black border border-border-color overflow-hidden aspect-video object-cover">
						<img className='w-full'
							src={`${baseUrl}/images/${post?.image}`}
						/>
					</div>
				</div>


				<div className="space-y-3">
					<div className="max-w-none prose prose-sm *:text-text-color prose-headings:my-2 prose-em:text-text-color prose-strong:text-text-color 
									prose-p:my-2 prose-li:my-1 md:prose-base prose-a:text-blue-700 marker:text-border-color
									prose-li:ml-8 prose-pre:bg-zinc-800 prose-pre:text-white
									prose-blockquote:border-beige-500">
						{post && parse(post?.body)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Single;
