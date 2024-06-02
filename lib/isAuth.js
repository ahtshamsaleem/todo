import User from '@/models/user';
import { testDbConnection, sq } from '@/lib/db';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function isAuth() {
    
    try {
        const token = cookies().get('session')?.value;
        if (!token) {
            throw new Error('You are not authenticated!');
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            throw new Error('Failed to verify your identity!');
        }

        await testDbConnection();

        const user = await User.findOne({
            where: { email: decodedToken.email },
        });
        if (!user) {
            throw new Error('User does not exist, Try signing up.');
        }

        return {
            success: true,
            user: user,
        };
    } catch (error) {
        return {
            message: error.message,
            success: false,
        };
    }
}
