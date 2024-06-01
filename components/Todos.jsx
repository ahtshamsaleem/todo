'use client'
import { useEffect, useState } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import axios from "axios";

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

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
        
    const [todos, setTodos] = useState([]);

    const [todo, setTodo] = useState({
        title: 'Assignment 2',
        description: 'I have to complete biology assignment before 9pm'
    });
    




    useEffect(() => {
        const getAllTodos = async () => {
            setIsLoading(true);
            setError('');
            try {
                const {data} = await axios.get('/api/todo');
                if (data.status === 200) {
                    setIsLoading(false);
                    
                    setTodos(data.data);
                } else {
                    
                    setError(data.message)
                }
            } catch (err) {
                setError(err.message)
            }
        }

        getAllTodos();
    }, [])


    




    const onChangeHandler = (event) => {
        switch (event.target.name) {
            case 'title':
                return setTodo((prev) => ({...prev, title: event.target.value}));
            case 'description':
                return setTodo((prev) => ({...prev, description: event.target.value}));
            default : return;
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        try {
            const {data} = await axios.post('/api/todo', todo);
            if (data.status === 201) {
                setTodos((prev) => {
                    const newTodos = [...prev];
                    newTodos.unshift(todo)
                    return newTodos;
                })
            }
        } catch(err) {
            setError(err.message)
        }

        
    }



        return (
            <div className="w-[60%] p-16 flex flex-col justify-center items-center ">
            <h2 className="text-center">The Todo App</h2>
            <AddTodo title={todo.title} description={todo.description} onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler}/>
                <div className="w-full mt-8  ">
                {
                    todos.map((el) => {
                        return <Todo key={el.title} todo={el}/>
                    })
                }
                </div>
            </div>
        )




}



export default Todos;