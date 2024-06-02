import User from "@/models/user";

import { testDbConnection, sq } from '@/lib/db';
const { cookies } = require("next/headers") ;
const jwt = require('jsonwebtoken');





export async function isAuth() {




    const token = cookies().get('session')?.value;
    
    

    


    try {
        if (!token) {
            throw new Error('You are not authenticated!');
    
        }
    
    
        const decodedToken = jwt.verify(token, 'secret');
    
        if (!decodedToken) {
            throw new Error('Failed to verify your identity!');
        }
        await testDbConnection();

        const user = await User.findOne({ where: { email: decodedToken.email } });
       
        if (!user) {
            throw new Error('User does not exist, Try signing up.');
        }
        console.log(user, 'i am the user biro')
        
        return {
            success: true,
            user: user
        };

    } catch (error) {
        return {
            message: error.message,
            success: false,
        };
    }

    
}