import { Request, Response } from 'express';
import { User, IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'

dotenv.config()
const secretKey: string = process.env.TOKEN_KEY as string; // Замените на ваш секретный ключ

// Регистрация пользователя
const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(422).json({ message: "Заполните все поля" });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "Пользователь с таким email уже существует" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUser = await User.create({
            uid: (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6),
            first_name,
            last_name,
            email,
            password: hashedPassword,
            subscriptions: [],
            token: ''
        });

        return res.status(201).json(newUser);
    } catch (err) {
        console.error("Ошибка при создании пользователя:", err);
        return res.status(500).json({ message: "Ошибка при создании пользователя" });
    }
};

// Вход пользователя
const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ message: "Заполните все поля" });
    }

    try {
        const user: IUser = await User.findOne({ email }) as IUser;
        if (!user) {
            return res.status(401).json({ message: "Неверные учетные данные" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Неверные учетные данные" });
        }

        const token = jwt.sign({ uid: user.uid }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (err) {
        console.error("Ошибка при входе пользователя:", err);
        return res.status(500).json({ message: "Ошибка при входе пользователя" });
    }
};


// Получение данных пользователя
const getUserData = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Пожалуйста, войдите в систему" });
    }

    try {
        const decoded: any = jwt.verify(token, secretKey);
        const uid = decoded.uid;

        const user: IUser = await User.findOne({ uid: uid }).select('-password') as IUser; // Исключить поле password из результата
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error("Ошибка при получении данных пользователя:", err);
        return res.status(500).json({ message: "Ошибка при получении данных пользователя" });
    }
};

// Ообновление подписок пользователя
const addSubscription = async (req: Request, res: Response): Promise<Response<any, Record<string, IUser>>> => {
    const { uid } = req.params;
    const { subscriptions } = req.body;

    try {
        const updatedUser: IUser | null = await User.findOneAndUpdate(
            { uid: uid },
            { subscriptions: subscriptions },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        return res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Ошибка при обновлении подписок пользователя:', err);
        return res.status(500).json({ message: 'Ошибка при обновлении подписок пользователя' });
    }
};

const deleteSubscription = async (req: Request, res: Response): Promise<Response<any, Record<string, IUser>>> => {
    const token = req.headers.authorization?.split(' ')[1];
    const { sid } = req.body

    if (!token) {
        return res.status(401).json({ message: "Пожалуйста, войдите в систему" });
    }

    try {
        const decoded: any = jwt.verify(token, secretKey);
        const uid = decoded.uid;

        const user: IUser = await User.findOne({ uid: uid }) as IUser
        const newSubscriptions = user.subscriptions.filter(sub => sub['sid'] != sid)
        await User.updateOne({uid: uid}, {subscriptions: newSubscriptions})

        return res.status(200).json(user);

    } catch (err) {
        console.error("Ошибка при удалении подписки", err);
        return res.status(500).json({ message: "Ошибка при удалении подписки" });
    }
}

export { registerUser, loginUser, getUserData, addSubscription, deleteSubscription };
