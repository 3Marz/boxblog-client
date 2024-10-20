
import {Link} from "react-router-dom"
import { Post } from "../types"

type CardPostProps = {
	post: Post
}

export default function CardPost({post}: CardPostProps) {

	return (
		<div className="border-2 border-black flex gap-3 max-w-full">
			<Link to={`/post/${post.id}`}>
				<img className="min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] h-full object-cover" src={`http://localhost:8080/uploads/${post.image}`} alt="" />
			</Link>
			<div className="w-full p-2 flex flex-col">
				<div className="">
					<Link className="hover:underline text-3xl font-semibold" to={`/post/${post.id}`}>{post.title}</Link>
					<p className="line-break">{post.desc}</p>
				</div>	
				<div className="p-2 flex-grow flex place-content-end place-items-end justify-items-center">
					<Link to={`/post/${post.id}`} className="button">Read more</Link>
				</div>
			</div>
		</div>
	)
}
