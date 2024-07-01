import { Router } from 'express';
import { registerUser, loginUser, getUserData, addSubscription, deleteSubscription, editSubscription } from '../controllers/user.controller';

const userRoutes = (): Router => {
    const router = Router()

    router.post('/auth/register', registerUser as any)

    router.post('/auth/login', loginUser as any)

    router.get('/api/user', getUserData as any)

    router.put('/api/:uid/subscriptions', addSubscription);

    router.post('/api/delete', deleteSubscription)

    router.post('/api/edit', editSubscription)

    return router
};

export default userRoutes
