import axios from 'axios'

const instance = axios.create({
	baseURL:
		import.meta.env.VITE_PRODUCTION === 'development'
			? 'http://localhost:5555/'
			: 'http://194.32.248.209:5555/',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
})

export default instance
