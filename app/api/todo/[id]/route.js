
import { NextResponse } from "next/server"
import { testDbConnection } from "@/lib/db"
import Todo from "@/models/todos"

// GET ALL TODOS
export async function DELETE(request, {params}) {
    

    try {
        await testDbConnection();

        const todos = await Todo.find({id});
        
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