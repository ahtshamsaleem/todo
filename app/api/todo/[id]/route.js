import { NextResponse } from "next/server"
import { testDbConnection } from "@/lib/db"
import Todo from "@/models/todos"


// DELETE A TODO
export async function DELETE(request, {params}) {
    
    try {
        await testDbConnection();

        const todo = await Todo.destroy({
            where: {
                id: params.id
            }
        })
        
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

        const todo = await Todo.findOne({ where: { id: params.id } });
        if(!todo) {
            throw new Error('Could not find the todo.')
        }

        todo.title = title;
        todo.description = description;

        await todo.save();

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