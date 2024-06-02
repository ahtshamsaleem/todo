import { NextResponse } from 'next/server';
import { testDbConnection, sq } from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';

// CREATE A NEW USER
export async function POST(request) {
    const { name, email, password } = await request.json();

    try {
        await testDbConnection();

        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            throw new Error('User with this email already exist!');
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name: name,
            email: email,
            password: hashPassword,
        });
        if (!user) {
            throw new Error('New User Creation Failed!');
        }

        return NextResponse.json({
            message: 'New user created',
            status: 201,
            user: user,
            success: true,
        });
    } catch (err) {
        return NextResponse.json({
            message: err.message,
            success: false,
        });
    }
}
