
export type Categorys = "Art" | "Science" | "Tech" | "Cinema" | "Design" | "Food"

export type Post = {
	id: number
	title: string
	desc: string
	image: string
	body: string
	category: Categorys
	username: string
	userId: number
}

