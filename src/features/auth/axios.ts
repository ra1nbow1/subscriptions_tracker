import axios from 'axios'

const instance = axios.create({
	baseURL:
		process.env.ENVIRONMENT === 'development'
			? 'http://localhost:5555/'
			: 'http://194.32.248.209:5555/',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
})

export default instance
