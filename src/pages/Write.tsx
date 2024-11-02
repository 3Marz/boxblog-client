import { useState, useRef, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import FormData from 'form-data';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
import { baseUrl } from '../config';


const Write = () => {

	const [loading, setLoading] = useState(false);

	const inputField = useRef<HTMLInputElement>(null);

	const [error, setError] = useState('')

	const [blogTitle, setBlogTitle] = useState('')
	const [blogDesc, setBlogDesc] = useState('')
	const [blogContent, setBlogContent] = useState('')
	const [blogCategory, setBlogCategory] = useState('')

	const navigate = useNavigate()

	const handleCategory = (e: MouseEvent) => {
		const target = e.target as HTMLLabelElement
		const category = target.innerText;
		setBlogCategory(category)
	}

	const handlePublish = () => {
		setError("");
		setLoading(true);

		const token = localStorage.getItem("JWT_USER_TOKEN");
		if (!token) {
			setError('Login to write blogs');
			setLoading(false);
			return false;
		}

		if (!blogTitle || !blogDesc || !blogCategory) {
			setError("Complete every field!")
			setLoading(false);
			return false;
		}
		if (blogContent.length < 20) {
			setError('Blog content must by at least 20 character long');
			setLoading(false);
			return false;
		}

		const files = inputField.current?.files
		let img;
		if (files) {
			img = files[0]
		}
		const data = new FormData();
		data.append('title', blogTitle);
		data.append('desc', blogDesc);
		data.append('image', img, img?.name);
		data.append('body', blogContent);
		data.append('category', blogCategory);

		axios.post(`${baseUrl}/blogs`, data, {
			headers: {
				Authorization: `Bearer ${token}`
			},
			withCredentials: true
		})
			.then((res) => {
				if (res.data.token) {
					localStorage.setItem("JWT_USER_TOKEN", res.data.token);
				}
				toast("Blog Created Succesfuly", {
					icon: <FaCheckCircle />,
				})
				navigate("/")
			})
			.catch((err) => {
				setLoading(false);
				console.error(err);
			})
	}

	return (
		<>
			{loading &&
				<div className="bg-[#1d1d1d80] w-full h-[100dvh] top-0 fixed animate-pulse z-50"></div>
			}
			<div className="p-6 grid lg:grid-cols-[75%_25%] gap-3">
				<div className="space-y-3 flex flex-col">
					<input value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className=" p-1 bg-beige-100 focus:outline-none border border-black shadow-[4px_4px_black]" type="text" placeholder="Title" />
					<textarea value={blogDesc} onChange={(e) => setBlogDesc(e.target.value)} placeholder="Description" name="description" className=" resize-none h-28 p-1 bg-beige-100 focus:outline-none border border-black shadow-[4px_4px_black]"></textarea>
					<div className="h-[450px] border-black border bg-beige-100 shadow-[4px_4px_black]">
						<ReactQuill className="border-none h-[90%]" theme='snow' value={blogContent} onChange={setBlogContent} />
					</div>
				</div>

				<div className="p-2 border border-black shadow-[4px_4px_black]">
					<div className="flex flex-col">
						<div className="flex justify-between items-center">
							<h1 className="text-3xl font-semibold">Options:</h1>
							<div className="flex gap-3 my-2">
								<button className="border-2 border-black p-2 text-lg font-bold duration-200 hover:shadow-[4px_4px_black]" onClick={handlePublish}>Publish</button>
							</div>
						</div>
						<hr className="border-black my-2" />
						<form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
							<label className="text-2xl font-bold" htmlFor="image">Upload cover image:</label>
							<input ref={inputField} className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:p-2 file:border-0 file:text-sm file:not-italic italic file:bg-transparent file:border-black file:text-black hover:file:underline" type="file" name="image" id="image" accept="image/*" />
						</form>
					</div>
					<hr className="border-black my-2" />

					<div className="flex flex-col">
						<h1 className="text-2xl font-semibold">Category</h1>
						<div className="space-x-2">
							<input type="radio" name="cat" id="art" value="art" />
							<label onClick={handleCategory} className="flex justify-start place-items-center hover:underline" htmlFor="art">Art</label>
						</div>
						<div className="space-x-2">
							<input type="radio" name="cat" id="science" value="science" />
							<label onClick={handleCategory} className="flex justify-start place-items-center hover:underline" htmlFor="science">Science</label>
						</div>
						<div className="space-x-2">
							<input type="radio" name="cat" id="tech" value="tech" />
							<label onClick={handleCategory} className="flex justify-start place-items-center hover:underline" htmlFor="tech">Tech</label>
						</div>
						<div className="space-x-2">
							<input type="radio" name="cat" id="cinema" value="cinema" />
							<label onClick={handleCategory} className="flex justify-start place-items-center hover:underline" htmlFor="cinema">Cinema</label>
						</div>
						<div className="space-x-2">
							<input type="radio" name="cat" id="design" value="design" />
							<label onClick={handleCategory} className="flex justify-start place-items-center hover:underline" htmlFor="design">Design</label>
						</div>
						<div className="space-x-2">
							<input type="radio" name="cat" id="food" value="food" />
							<label onClick={handleCategory} className="flex justify-start place-items-center hover:underline" htmlFor="food">Food</label>
						</div>
					</div>

					<div>
						<h1 className="text-red-500">{error}</h1>
					</div>
				</div>
			</div>
		</>
	)
}

export default Write
