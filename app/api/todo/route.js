
import { NextResponse } from "next/server"
import { testDbConnection } from "@/lib/db"
import Todo from "@/models/todos"


export async function GET(request) {
    console.log('resqqqq')

    try {
        await testDbConnection()
    } catch (err) {
        return NextResponse.json({
            message: err.message
        })
    }




    return NextResponse.json({
        message: 'eheheheheh'
    })
}


export async function POST(request) {
    console.log('POST')

    try {
        await testDbConnection();


        const todo = await Todo.create({
            title: 'AHTSHAm',
            description: ' this is my very first post',
            
        })

        
        return NextResponse.json({
            message: 'New user created'
        })

        
    } catch (err) {
        return NextResponse.json({
            message: err.message
        })
    }




    return NextResponse.json({
        message: 'eheheheheh'
    })
}