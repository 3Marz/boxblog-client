
const Login = () => {
  return (
    <div className="text-2xl flex justify-center place-items-center h-screen">
    	<form className="border-black border-2 shadow-[8px_8px_black] p-8 bg-beige-200 flex-col flex">
    		<label htmlFor="userName">Username:</label>	
    		<input className="border border-black p-2 text-lg" type="text" />
    		<label htmlFor="password">Password:</label>
    		<input className="border border-black p-2 text-lg" type="password" />
    		<button className="p-1 duration-300 hover:shadow-[0px_0px_black] shadow-[3px_3px_black] mt-4 border-2 border-black" type="submit">Login</button>
    	</form>
    </div>
  )
}

export default Login