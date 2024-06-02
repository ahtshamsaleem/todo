'use client'
import { useEffect, useState } from "react";
import Todo from "./Todo";
import AddTodoForm from "./AddTodoForm";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useRef } from "react";
import { validateTitle, validateDescription } from "@/lib/validateInput";
import { FaHeart } from "react-icons/fa";


const Todos = () => {

    const editInputRef = useRef(null);

    const [editingId, setEditingId] = useState();
        
    const [todos, setTodos] = useState([]);

    const [isLoading, setIsLoading] = useState({
        todos: false,
        btn: false,
        todo: {
            id: null,
            loading: false
        }
    });
    const [error, setError] = useState({
        title: '',
        description: '',
        todos: '',
        todo: {
            message: '',
            id: null 
        }
    })

    const [todo, setTodo] = useState( {
        id: '',
        title: '',
        isComplete: false,
        description: ''
    });

    const [editingTodo, setEditingTodo] = useState({});

    useEffect(() => {
        const getAllTodos = async () => {
            setIsLoading((prev) => ({...prev, todos: true}));
            setError(prev => ({...prev,  title: '', description: '', todos: ''}));
            try {
                const {data} = await axios.get('/api/todo');
                if (data.status === 200) {
                    
                    setIsLoading((prev) => ({...prev, todos: false}));
                    setTodos(data.data);
                }
            } catch (err) {
                setIsLoading((prev) => ({...prev, todos: false}));
                setError(prev => ({...prev, todos: err.message}))
            }
        }

        getAllTodos();
        editInputRef?.current?.focus();
    }, [])


    



// ONCHANGE HANDLER --------------->
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


// ONSUBMIT HANDLER --------------->
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        setError(prev => ({...prev,  title: '', description: '', todos: ''}));
        if(!validateTitle(todo.title)) {
            return setError(prev => ({...prev, title: 'Title must not be empty!'}))
        }
        if(!validateDescription(todo.description)) {
            return setError(prev => ({...prev, description: 'Description must not be empty!'}))
        }


        setIsLoading( prev => ({...prev, btn: true}));
        try {
            const {data} = await axios.post('/api/todo', todo);
           
            if (data.status === 201) {
                setIsLoading( prev => ({...prev, btn: false}));
                setTodo( prev => ({...prev, title: '', description: ''}))
                setTodos((prev) => {

                    const newTodo = {
                        id: data.todo.id,
                        title: data.todo.title,
                        isComplete: data.todo.isComplete,
                        description: data.todo.description
                    }
                    const newTodos = [...prev];
                    newTodos.unshift(newTodo)
                    return newTodos;
                })
            }
        } catch(err) {
            setIsLoading( prev => ({...prev, btn: false}));
            setError(prev => ({...prev, todos: err.message}));
        }

        
    }

// DELETE TODO HANDLER --------------->

    const deleteTodoHandler = async (id) => {

        setError(prev => ({ title: '', description: '', todos: '', todo: {id: null, message: ''}}));
        setIsLoading(prev => ({...prev, todo: {...prev.todo, id: id, loading: true}}))
        
        try {
            const {data} = await axios.delete(`api/todo/${id}`);
        
            setIsLoading(prev => ({...prev, todo: {...prev.todo, id: null, loading: false}}))
            setTodos((prev) => {
                return prev.filter((el) => el.id !== id);
            })
            
        } catch(error) {
            setIsLoading(prev => ({...prev, todo: {...prev.todo, id: null, loading: false}}))
            setError(prev => ({...prev, todo: {id: id, message: 'Error occured while deleting the todo.' }}))
        }

    }


// EDIT TODO HANDLER --------------->
    const editHandler = async (id) =>  {

        const editingTodo = todos.filter((el) => el.id === id);        
        setEditingTodo((prev) => {
            return {
                ...prev,
                title: editingTodo[0].title,
                description: editingTodo[0].description

            }
        })
        setEditingId(id);
    }


// SUBMIT UPDATED HANDLER --------------->    
    const submitUpdateHandler = async (id) =>  {

        setError(prev => ({ title: '', description: '', todos: '', todo: {id: null, message: ''}}));

        const oldTodo = todos.filter((el) => el.id === id)[0];
        
        if (oldTodo.title === editingTodo.title && oldTodo.description === editingTodo.description) {
            return setEditingId('');
        }
        
        setIsLoading(prev => ({...prev, todo: {...prev.todo, id: id, loading: true}}));
        try {
            const {data} = await axios.post(`api/todo/${id}`, editingTodo)
            setIsLoading(prev => ({...prev, todo: {...prev.todo, id: null, loading: false}}));
                
            setTodos((prev) => {
                const newArr = [...prev];
                const index = newArr.findIndex((el) => el.id === id);

                newArr[index] = editingTodo;

                return newArr;
            })
        } catch (err) {
            setIsLoading(prev => ({...prev, todo: {...prev.todo, id: null, loading: false}}));
            setError(prev => ({...prev, todo: {id: id, message: 'Error occured while updating the todo.' }}))
        }

        setEditingId('')

    }
    

// TODO COMPLETE HANDLER --------------->
    const toggleComplete = async(id) => {
        setIsLoading(prev => ({...prev, todo: {...prev.todo, id: id, loading: true}}));
        const todosList = [...todos];
        const index = todosList.findIndex((el) => el.id === id);
        
        const todo = todosList[index]

        const newTodo = {
            ...todo,
        isComplete: !todo.isComplete
        }
        todosList[index] = newTodo;
        
        
        try {
            const {data} = await axios.post(`api/todo/update-status/${id}`, {isComplete: newTodo.isComplete})
            
            setIsLoading(prev => ({...prev, todo: {...prev.todo, id: null, loading: false}}))
            setTodos(todosList);
        } catch (err) {
            setIsLoading(prev => ({...prev, todo: {...prev.todo, id: null, loading: false}}))
        }

    }

        return (
            <div className="w-[60%] p-16 flex flex-col justify-center items-center max-lg:p-8 max-lg:w-[90%] ">
            <h2 className="text-center text-white font-semibold text-2xl font-poppins flex items-center gap-2 ">The Todo App <FaHeart color="#D70040"/></h2>
            <AddTodoForm ref={editInputRef} error={error} isLoading={isLoading.btn} title={todo.title} description={todo.description} onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler} />

            {error.todos && <p className='text-red-600  text-xl text-center '>{error.todos}</p>}
            {isLoading.todos ? <HashLoader color="#36d7b7" className="mt-20"/> : todos.length === 0 ? <p className="p-16 text-white  ">You've no todo items! Click on Add to items to create todos! Tadaaa</p> :
                <div className="w-full mt-8 ">
                {
                    todos.map((el) => {
                        return <Todo ref={editInputRef}  key={el.id} error={error} todo={el} deleteTodo={deleteTodoHandler} onChangeHandler={onChangeHandler} editHandler={editHandler} editingId={editingId} editingTodo={editingTodo} submitUpdateHandler={submitUpdateHandler} toggleComplete={toggleComplete} isLoading={isLoading.todo}/>
                    })
                }
                </div>}
            
            </div>
        )

}


export default Todos;