'use client'
import { useState } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

const todoList = [{
    title: 'Assignment 1',
    description: 'I have to complete biology assignment before 9pm'
}, {
    title: 'Assignment 2',
    description: 'I have to complete biology assignment before 9pm'
}, {
    title: 'Assignment 3',
    description: 'I have to complete biology assignment before 9pm',
    isCompleted: false
}]


const Todos = () => {

    





        return (
            <div className="w-[60%] p-16 flex flex-col justify-center items-center ">
            <h2 className="text-center">The Todo App</h2>
            <AddTodo />
                <div>
                {
                    todoList.map((el) => {
                        return <Todo key={el.title} todo={el}/>
                    })
                }
                </div>
            </div>
        )




}



export default Todos;