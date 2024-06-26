import { NextResponse } from 'next/server';
import { testDbConnection, sq } from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';

// CREATE A NEW USER
export async function POST(request) {
    const { email, password } = await request.json();

    try {
        await testDbConnection();

        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            throw new Error('User does not exist!');
        }

        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            throw new Error('Your password is wrong!');
        }

        const token = jwt.sign({
            email: user.email
        }, process.env.JWT_SECRET, {expiresIn: '24h'});

        const res = cookies().set('session', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 , // 24 hours
            path: '/',
          })

        
        return NextResponse.json({
            message: 'Login Successful',
            status: 200,
            user: user,
            token: token,
            success: true,
        });
    } catch (err) {
        return NextResponse.json({
            message: err.message,
            success: false,
            
        });
    }
}
