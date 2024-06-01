'use client'
import { useState } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

const todoList = [{
    title: 'Assignment 1',
    description: 'I have to complete biology assignment before 9pm I have to complete biology assignment before 9pm I have to complete biology assignment before 9pm'
}, {
    title: 'Assignment 2',
    description: 'I have to complete biology assignment before 9pm'
}, {
    title: 'Assignment 3',
    description: 'I have to complete biology assignment before 9pm',
    isCompleted: false
}]


const Todos = () => {

    const [todos, setTodos] = useState(todoList);

    const [todo, setTodo] = useState({
        title: 'Assignment 2',
        description: 'I have to complete biology assignment before 9pm'
    });
    


    const onChangeHandler = (event) => {
        switch (event.target.name) {
            case 'title':
                return setTodo((prev) => ({...prev, title: event.target.value}));
            case 'description':
                return setTodo((prev) => ({...prev, description: event.target.value}));
            default : return;
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(todo)


    }



        return (
            <div className="w-[60%] p-16 flex flex-col justify-center items-center ">
            <h2 className="text-center">The Todo App</h2>
            <AddTodo title={todo.title} description={todo.description} onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler}/>
                <div className="w-full mt-8  ">
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