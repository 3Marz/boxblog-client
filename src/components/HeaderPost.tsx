import { Link } from "react-router-dom"
import { Post } from "../types"

type HeaderPostProps = {
	post?: Post | undefined
	className?: string
}

export default function HeaderPost({ post, className }: HeaderPostProps) {

	return (
		<Link to={`/post/${post?.id}`} className={`ring-black flex flex-col xl:flex-row hover:ring-1 ${className}`}>
			<div className="aspect-video w-full overflow-hidden bg-black border border-black flex place-items-center justify-center items-center">
				<img className="w-full" src={`http://localhost:8080/uploads/${post?.image}`} alt="" />
			</div>
			<div className="w-full p-2 flex flex-col">
				<p title={post?.title} className="hover:underline text-lg md:text-lg lg:text-xl xl:text-2xl font-semibold line-clamp-3">{post?.title}</p>
				<p className="text-xs line-clamp-2">{post?.desc}</p>
			</div>
		</Link>
	)
}
