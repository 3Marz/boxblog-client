import axios from "axios"

const login = (body: {}) => {
	axios.post("http://localhost:8080/users/login", body)
	.then((res) => {
		if(res.status == 200) {
			localStorage.setItem("JWT_USER_TOKERN", res.data.token);
		}
	})
	.catch((err) => {
		console.error(err);
	})
}

export default login;

