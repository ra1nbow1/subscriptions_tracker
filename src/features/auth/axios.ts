import axios from 'axios'
const instance = axios.create({
	baseURL:
		'https://703b-2a00-1370-8196-588-fc72-d14e-3803-907d.ngrok-free.app/',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
})

export default instance
