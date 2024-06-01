'use client'

import { useState } from "react";

const AddTodo = () => {


    const [todo, setTodo] = useState({
        title: 'Assignment 3',
        description: 'I have to complete biology assignment before 9pm',
        isCompleted: false
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
    <div className="w-[80%] ">
        <form  onSubmit={onSubmitHandler}>
            <div >
            <label htmlFor="title" className="text-lg text-white font-bold ">Title</label>
            <input  type="text" onChange={onChangeHandler} value={todo.title} name='title' className="w-full text-sm font-sans font-normal leading-5 px-3 py-3 rounded-md focus:shadow-outline-purple focus:shadow-lg hover:border-blue-500 focus:border-blue-500 bg-white text-slate-900 outline-none border border-solid"/>
            </div>
            <div>
            <label htmlFor="title" className="text-lg text-white font-bold ">Description</label>
            <input type="text" onChange={onChangeHandler} value={todo.description} name='description' className="w-full text-sm font-sans font-normal leading-5 px-3 py-3 rounded-md focus:shadow-outline-purple focus:shadow-lg hover:border-blue-500 focus:border-blue-500 bg-white text-slate-900 outline-none border border-solid"/>
            </div>

            <button type='submit' className="mt-6 w-full px-4 py-3 text-white text-lg font-semibold bg-black rounded-lg  ">Add Todo</button>
        </form>
    </div>
  )
}

export default AddTodo