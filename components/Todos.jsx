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

    const [editingTodo, setEditingTodo] = useState({
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
            case 'edit_title':
                return setEditingTodo((prev) => ({...prev, title: event.target.value}));
            case 'edit_description':
                return setEditingTodo((prev) => ({...prev, description: event.target.value}));
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



    const editHandler = async (id) =>  {

        const editingTodo = todos.filter((el) => el.id === id);

        //console.log(editingTodo)
        setEditingTodo((prev) => {
            return {
                ...prev,
                title: editingTodo[0].title,
                description: editingTodo[0].description

            }
        })
        setEditingId(id)

    }



    
    const submitUpdateHandler = async (id) =>  {

        const oldTodo = todos.filter((el) => el.id === id)[0];
        


        if (oldTodo.title === editingTodo.title && oldTodo.description === editingTodo.description) {
            return setEditingId('');
        }

        try {
            const {data} = await axios.post(`api/todo/${id}`, editingTodo)

                console.log(data)
        } catch (err) {
            console.log(err)
        }




        setEditingId('')

    }
    


    const toggleComplete = async(id) => {
        const todosList = [...todos];
        const index = todosList.findIndex((el) => el.id === id);

        const todo = todosList[index]
        todo.isComplete = !todo.isComplete;


        todosList[index] = todo;
        
        
        setTodos(todosList);
        

    }









        return (
            <div className="w-[60%] p-16 flex flex-col justify-center items-center ">
            <h2 className="text-center">The Todo App</h2>
            <AddTodo isLoading={isLoading} title={todo.title} description={todo.description} onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler}/>

            {isFetching ? <HashLoader color="#36d7b7" className="mt-12"/> : 
            <div className="w-full mt-8  ">
                {
                    todos.map((el) => {
                        return <Todo key={el.id} todo={el} deleteTodo={deleteTodoHandler} onChangeHandler={onChangeHandler} editHandler={editHandler} editingId={editingId} editingTodo={editingTodo} submitUpdateHandler={submitUpdateHandler} toggleComplete={toggleComplete}/>
                    })
                }
                </div>}
            
            
            
            </div>
        )




}



export default Todos;