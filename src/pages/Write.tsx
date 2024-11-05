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

	//Quill Variables
	const modules = {
		toolbar: [
			[{ 'header': [1, 2, false] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ 'list': 'ordered' }, { 'list': 'bullet' }],
			['code-block', 'link'],
			['clean']
		],
	}

	const formats = [
		'header',
		'bold', 'italic', 'underline', 'strike', 'blockquote',
		'list', 'bullet', 
		'code-block', 'link'
	]

	return (
		<>
			{loading &&
				<div className="bg-[#1d1d1d80] w-full h-[100dvh] top-0 fixed animate-pulse z-50"></div>
			}
			<div className="p-6 flex flex-col px-6 lg:px-[20vw] gap-6">
				<div className="space-y-3 flex flex-col">
					<h1 className="text-xl md:text-3xl font-semibold">Title:</h1>
					<span contentEditable onInput={(e) => setBlogTitle(e.currentTarget.innerText)} className="rounded p-1 text-black bg-beige-100 h-auto resize-none focus:outline-none border-2 border-border-color shadow-[4px_4px] shadow-border-color md:text-xl md:p-3" />
					<h1 className="text-xl md:text-3xl font-semibold">Description:</h1>
					<span contentEditable onInput={(e) => setBlogDesc(e.currentTarget.innerText)} className="rounded p-1 text-black bg-beige-100 focus:outline-none border-2 border-border-color shadow-[4px_4px] shadow-border-color"></span>
					<h1 className="text-xl md:text-3xl font-semibold">Blog:</h1>
					<div className="border-border-color border-2 bg-beige-100 shadow-[4px_4px] shadow-border-color rounded text-black">
						<ReactQuill formats={formats} modules={modules} className="border-none *:rounded" theme='snow' value={blogContent} onChange={setBlogContent} />
					</div>
				</div>

				<div className="py-3 px-5 border border-border-color shadow-[4px_4px] shadow-border-color max-h-fit rounded">
					<div className="flex flex-col">
						<div className="flex justify-between items-center">
							<h1 className="text-3xl font-semibold">Options:</h1>
							<div className="flex gap-3 my-2">
								<button className="rounded border-2 border-border-color p-2 text-lg font-bold duration-200 hover:shadow-border-color hover:shadow-[4px_4px]" onClick={handlePublish}>Publish</button>
							</div>
						</div>
						<hr className="border-border-color my-2" />
						<form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
							<label className="text-2xl font-bold" htmlFor="image">Upload cover image:</label>
							<input ref={inputField} className="block border-2 border-border-color border-dashed rounded w-fit text-border-color text-sm text-gray-600 file:mr-4 file:py-2 file:p-2 file:border-none file:text-sm file:not-italic italic file:bg-transparent file:border-border-color file:text-text-color file:hover:underline" type="file" name="image" id="image" accept="image/*" />
						</form>
					</div>
					<hr className="border-border-color my-2" />

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
