import { Router } from 'express';
import { registerUser, loginUser, getUserData, updateSubscriptions } from '../controllers/user.controller';

const userRoutes = (): Router => {
    const router = Router()

    router.post('/auth/register', registerUser as any)

    router.post('/auth/login', loginUser as any)

    router.get('/api/user', getUserData as any)

    router.put('/api/:uid/subscriptions', updateSubscriptions);

    return router
};

export default userRoutes
