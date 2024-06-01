// import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";

const Todo = ({isEditing, todo, deleteTodo, updateTodo, editTodo, toggleComplete, onChangeHandler, editingId}) => {

    console.log(editingId, todo.id)
  return (
    <div className="text-white flex justify-between items-center mb-4 p-4 bg-slate-800 rounded-xl ">
        <div className="p-2 w-[80%]">
        
        {todo.id === editingId ? <input  type="text" onChange={onChangeHandler} value={todo.title} name='title' className="w-full text-sm font-sans font-normal leading-5 px-3 py-3 rounded-md focus:shadow-outline-purple focus:shadow-lg hover:border-blue-500 focus:border-blue-500 bg-white text-slate-900 outline-none border border-solid"/> : <h3 className="text-lg font-semibold ">{todo.title}</h3>}
        <p >{todo.description}</p>
        </div>
        <div className="flex justify-between items-center gap-2 scale-125 p-4">
        {/* <img className="edit-icon" src={FaRegPenToSquare} onClick={() => editTodo(task.id)} />
        <img className="delete-icon" src={FaRegTrashAlt} onClick={() => deleteTodo(task.id)} />
        <img className="" src={IoMdCheckboxOutline} /> */}

        <FaRegPenToSquare onClick={() => updateTodo(todo.id)}/>
        <FaRegTrashAlt onClick={() => deleteTodo(todo.id)}/>
        <IoMdCheckboxOutline className="text-green-500"/>

        </div>
    </div>
  )
}

export default Todo;










// const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => {
//     return (
//       <div className="Todo">
//           <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
//           <div>
//           <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} />
//           <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
//           </div>
//       </div>
//     )
//   }
  
//   export default Todo;