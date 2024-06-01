import Todo from '@/models/todos';
import { NextResponse } from 'next/server';
import { testDbConnection } from '@/lib/db';

export async function POST(request, { params }) {
    const { isComplete } = await request.json();
    try {
        await testDbConnection();

        const todo = await Todo.findOne({ where: { id: params.id } });

        if (!todo) {
            throw new Error('Could not find the todo.');
        }

        todo.isComplete = isComplete;

        await todo.save();

        return NextResponse.json({
            message: 'Todo Updated',
            status: 201,
        });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        });
    }
}
