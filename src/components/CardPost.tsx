import { Link } from "react-router-dom"
import { Post } from "../types"

type CardPostProps = {
	post: Post
	className?: string
}

export default function CardPost({ post, className }: CardPostProps) {

	return (
		<Link to={`/blog/${post.id}`} className={`ring-black flex flex-col hover:ring-1 ${className}`}>
			<div className="aspect-video overflow-hidden bg-black border border-black flex place-items-center justify-center items-center">
				<img className="w-full" src={`http://localhost:8080/uploads/${post.image}`} alt="" />
			</div>
			<div className="w-full p-2 flex flex-col">
				<p title={post.title} className="hover:underline text-xs md:text-sm lg:text-lg font-semibold line-clamp-2">{post.title}</p>
				<p className="text-xs line-clamp-2 font-thin">{post.desc}</p>
			</div>
		</Link>
	)
}
