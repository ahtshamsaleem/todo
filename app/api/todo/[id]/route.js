
import { NextResponse } from "next/server"
import { testDbConnection } from "@/lib/db"
import Todo from "@/models/todos"
import { where } from "sequelize";

// GET ALL TODOS
export async function DELETE(request, {params}) {
    console.log(params)

    try {
        await testDbConnection();

        const todo = await Todo.destroy({
            where: {
                id: params.id
            }
        })
        console.log('after deleting todo', todo)
        if(!todo) {
            throw new Error('Could not delete the todo.')
        }

        

        return NextResponse.json({
            message: 'Todo Deleted',
            status: 200,
            
        })

    } catch (error) {
        return NextResponse.json({
            message: error.message
        })
    }

}





// UPDATE TODO

export async function POST(request, {params}) {
    const {title, description} = await request.json();
    try {
        await testDbConnection();

        const todo = await Todo.update({
            title: title,
            description, description
        },{
            where: {
                id: params.id
            }
        })
        console.log('after update todo', todo)

        if(!todo) {
            throw new Error('Could not delete the todo.')
        }

        

        return NextResponse.json({
            message: 'Todo Updated ehe',
            status: 201,
            
        })

    } catch (error) {
        return NextResponse.json({
            message: error.message
        })
    }

}