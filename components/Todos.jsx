'use client'
import { useEffect, useState } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import axios from "axios";
import { HashLoader } from "react-spinners";




const Todos = () => {



    const [editingId, setEditingId] = useState();
    const [isEditing, setIsEditing] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
        
    const [todos, setTodos] = useState([]);

    const [todo, setTodo] = useState({
        title: 'Assignment 2',
        description: 'I have to complete biology assignment before 9pm'
    });
    




    useEffect(() => {
        const getAllTodos = async () => {
            setIsFetching(true);
            setError('');
            try {
                const {data} = await axios.get('/api/todo');
                if (data.status === 200) {
                    
                    setIsFetching(false);
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
        setIsLoading(true);
        try {
            const {data} = await axios.post('/api/todo', todo);
            if (data.status === 201) {
                setIsLoading(false);
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









    const deleteTodoHandler = async (id) => {
        
        try {
            const {data} = await axios.delete(`api/todo/${id}`);

            
            setTodos((prev) => {
                

                return prev.filter((el) => el.id !== id);

            })
            
        } catch(error) {
            console.log('error occured in dlete handelr')
        }

    }



    const updateHandler = async (id) =>  {
        setEditingId(id)

    }






        return (
            <div className="w-[60%] p-16 flex flex-col justify-center items-center ">
            <h2 className="text-center">The Todo App</h2>
            <AddTodo isLoading={isLoading} title={todo.title} description={todo.description} onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler}/>

            {isFetching ? <HashLoader color="#36d7b7" className="mt-12"/> : 
            <div className="w-full mt-8  ">
                {
                    todos.map((el) => {
                        return <Todo key={el.id} todo={el} deleteTodo={deleteTodoHandler} isEditing={isEditing} updateTodo={updateHandler} editingId={editingId}/>
                    })
                }
                </div>}
            
            
            
            </div>
        )




}



export default Todos;