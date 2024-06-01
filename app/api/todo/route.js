
import { NextResponse } from "next/server"
import { testDbConnection, sq } from "@/lib/db"
import Todo from "@/models/todos"

// GET ALL TODOS
export async function GET(request) {
    

    try {
        await testDbConnection();

        const todos = await Todo.findAll({
            order: sq.col('id')
        });
        
        if(!todos) {
            throw new Error('Could not fetch the todos list')
        }

        

        return NextResponse.json({
            message: 'Date Received',
            status: 200,
            data: todos
        })

    } catch (error) {
        return NextResponse.json({
            message: error.message
        })
    }

}



// POST A NEW TODO
export async function POST(request) {
    const {title, description} = await request.json();
    

    try {
        await testDbConnection();


        const todo = await Todo.create({
            title: title,
            description: description,
            
        })


        
        return NextResponse.json({
            message: 'New user created',
            status: 201,
            todo:todo
        })

        
    } catch (err) {
        return NextResponse.json({
            message: err.message
        })
    }


}