import axios from 'axios'
console.log(import.meta.env.VITE_PRODUCTION)
const instance = axios.create({
	baseURL: 'http://localhost:5555/',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
})

export default instance
