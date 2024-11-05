import { Link } from "react-router-dom"
import { Post } from "../types"
import { baseUrl } from "../config"

type CardPostProps = {
	post?: Post
	className?: string
	bodyClassName?: string
}

export default function CardPost({ post, className, bodyClassName }: CardPostProps) {

	if(!post) {
		return
	}
	
	return (
		<Link to={`/blog/${post?.id}`} className={`group flex flex-col relative before:absolute before:inset-0 before:bg-doted-bg before:bg-[length:4px_4px] before:bg-beige-400 before:-z-10 before:rounded ${className}`}>
			<div className={`flex rounded overflow-hidden flex-col h-full bg-beige-300 group-active:-translate-y-2 group-active:-translate-x-2 group-hover:-translate-x-2 duration-75 group-hover:-translate-y-2 ring-black ring-1 ${bodyClassName}`}>
				<div className="aspect-video w-full overflow-hidden bg-black border-b border-black flex place-items-center justify-center items-center">
					<img className="w-full" src={`${baseUrl}/images/${post?.image}`} alt="" />
				</div>
				<div className="w-full p-2 flex flex-col">
					<p title={post?.title} className="hover:underline text-xs md:text-sm lg:text-lg font-semibold line-clamp-2">{post?.title}</p>
					<p className="text-xs line-clamp-2 font-thin">{post?.desc}</p>
				</div>
			</div>
		</Link>
	)
}
