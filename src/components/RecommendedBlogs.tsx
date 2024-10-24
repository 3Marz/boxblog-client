import { Link } from "react-router-dom"
import { Post } from "../types"


export default function RecommededBlogs() {
	
	let posts: Post[] = []
	
	return (
		<div className="w-full md:w-[50%] lg:w-[50%] py-3 px-0 md:px-8 lg:px-8 space-y-2">
			<h1 className="text-2xl">Posts you may like</h1>
			<div className="space-y-4 w-full">
				{posts.map(post => {
					return (
						<div key={post?.id} className="border border-black p-3 w-full">
							<Link to={`/post?/${post?.id}`} className="hover:underline">
								<img className="border border-black w-full h-28 object-cover" src={post?.image} alt="" />
								<h1 className="text-lg">{post?.title}</h1>
							</Link>
						</div>
					)
				})}
			</div>
		</div>
	)
}

