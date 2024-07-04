import axios from 'axios'
console.log(import.meta.env)
const instance = axios.create({
	baseURL: 'http://localhost:5555/',
	headers: {
		'Content-Type': 'application/json',
	},
})

export default instance
