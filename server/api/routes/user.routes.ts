import { Router } from 'express'
import {
	registerUser,
	loginUser,
	getUserData,
	deleteUser,
	addSubscription,
	deleteSubscription,
	editSubscription,
	tgSetUserId,
	tgGetUserData,
} from '../controllers/user.controller'

const userRoutes = (): Router => {
	const router = Router()

	router.post('/auth/register', registerUser as any)

	router.post('/auth/login', loginUser as any)

	router.get('/api/user', getUserData as any)

	router.put('/api/:uid/subscriptions', addSubscription)

	router.post('/api/delete', deleteSubscription)

	router.post('/api/edit', editSubscription)

	router.post('/tg/user/', tgSetUserId)

	router.get('/tg/user/:uid', tgGetUserData)

	router.post('/api/delete/:uid', deleteUser)

	return router
}

export default userRoutes
