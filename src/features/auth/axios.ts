import axios from 'axios'
const instance = axios.create({
	baseURL:
		'https://c063-2a00-1370-8196-588-88e4-154c-2078-3a81.ngrok-free.app/',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
})

export default instance
