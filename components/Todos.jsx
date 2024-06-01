'use client'
import { useEffect, useState } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useRef } from "react";
import { FaHeart } from "react-icons/fa";




const Todos = () => {

    const editInputRef = useRef(null);



    const [editingId, setEditingId] = useState();
    //const [isFetching, setIsFetching] = useState(false);

        
    const [todos, setTodos] = useState([]);

    const [isLoading, setIsLoading] = useState({
        todos: false,
        btn: false,
        todo: {
            id: null,
            loading: false
        }
    });
    const [error, setError] = useState('')

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
            setError('');
            try {
                const {data} = await axios.get('/api/todo');
                if (data.status === 200) {
                    
                    setIsLoading((prev) => ({...prev, todos: false}));
                    setTodos(data.data);
                } else {
                    
                    setError(data.message)
                }
            } catch (err) {
                setIsLoading((prev) => ({...prev, todos: false}));
                setError(err.message)
            }
        }

        getAllTodos();
        editInputRef?.current?.focus();
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
            setError(err.message)
        }

        
    }









    const deleteTodoHandler = async (id) => {

        setIsLoading(prev => ({...prev, todo: {...prev.todo, id: id, loading: true}}))
        
        try {
            const {data} = await axios.delete(`api/todo/${id}`);
            console.log(data)
            setIsLoading(prev => ({...prev, todo: {...prev.todo, id: null, loading: false}}))
            setTodos((prev) => {
                

                return prev.filter((el) => el.id !== id);

            })
            
        } catch(error) {
            setIsLoading(prev => ({...prev, todo: {...prev.todo, id: null, loading: false}}))
            console.log('error occured in dlete handelr')
        }

    }



    const editHandler = async (id) =>  {
        //editInputRef?.current?.focus();
        const editingTodo = todos.filter((el) => el.id === id);

        //console.log(editingTodo)
        setEditingTodo((prev) => {
            return {
                ...prev,
                title: editingTodo[0].title,
                description: editingTodo[0].description

            }
        })
        setEditingId(id);

        //console.log(editInputRef.current)
        

    }



    
    const submitUpdateHandler = async (id) =>  {

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
            console.log(err)
        }




        setEditingId('')

    }
    


    const toggleComplete = async(id) => {
        setIsLoading(prev => ({...prev, todo: {...prev.todo, id: id, loading: true}}));
        const todosList = [...todos];
        const index = todosList.findIndex((el) => el.id === id);
        
        const todo = todosList[index]
        //todo.isComplete = !todo.isComplete;
        const newTodo = {
            ...todo,
        isComplete: !todo.isComplete
        }
        todosList[index] = newTodo;
        
        
        try {
            const {data} = await axios.post(`api/todo/update-status/${id}`, {isComplete: newTodo.isComplete})
            console.log(data)
            setIsLoading(prev => ({...prev, todo: {...prev.todo, id: null, loading: false}}))
            setTodos(todosList);
        } catch (err) {
            setIsLoading(prev => ({...prev, todo: {...prev.todo, id: null, loading: false}}))
            console.log(err)
        }

    }



    const keyDownHandler = (event) => {
        if (event.code === 'Enter') {
            onSubmitHandler()
        }
    }







        return (
            <div className="w-[60%] p-16 flex flex-col justify-center items-center ">
            <h2 className="text-center text-white font-semibold text-2xl font-poppins flex items-center gap-2 ">The Todo App <FaHeart color="#D70040"/></h2>
            <AddTodo ref={editInputRef} isLoading={isLoading.btn} title={todo.title} description={todo.description} onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler} keyDownHandler={keyDownHandler}/>

            {isLoading.todos ? <HashLoader color="#36d7b7" className="mt-20"/> : 
            <div className="w-full mt-8 ">
                {
                    todos.map((el) => {
                        return <Todo ref={editInputRef}  key={el.id} todo={el} deleteTodo={deleteTodoHandler} onChangeHandler={onChangeHandler} editHandler={editHandler} editingId={editingId} editingTodo={editingTodo} submitUpdateHandler={submitUpdateHandler} toggleComplete={toggleComplete} isLoading={isLoading.todo}/>
                    })
                }
                </div>}
            
            
            
            </div>
        )




}



export default Todos;