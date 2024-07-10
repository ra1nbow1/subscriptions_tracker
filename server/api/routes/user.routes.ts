import { Router } from 'express'
import {
	addSubscription,
	deleteSubscription,
	deleteUser,
	editSubscription,
	getUserData,
	loginUser,
	registerUser,
	tgGetUserData,
	tgSetUserId,
	verifyEmail,
} from '../controllers/user.controller'

const userRoutes = (): Router => {
	const router = Router()

	router.post('/auth/register', registerUser as any)

	router.post('/auth/login', loginUser as any)

	router.get('/auth/verify/:uid/:hash', verifyEmail)

	router.get('/api/user', getUserData as any)

	router.post('/api/delete/:uid', deleteUser)

	router.post('/tg/user/', tgSetUserId)

	router.get('/tg/user/:uid', tgGetUserData)

	router.put('/api/:uid/subscriptions', addSubscription)

	router.post('/api/delete', deleteSubscription)

	router.post('/api/edit', editSubscription)

	return router
}

export default userRoutes
