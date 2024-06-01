// import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";

const Todo = ({todo, deleteTodo, editTodo, toggleComplete}) => {
  return (
    <div className="text-white flex justify-between items-center mb-4 p-4">
        <div>
        <h3>{todo.title}</h3>
        <p >{todo.description}</p>
        </div>
        <div className="flex justify-between items-center">
        {/* <img className="edit-icon" src={FaRegPenToSquare} onClick={() => editTodo(task.id)} />
        <img className="delete-icon" src={FaRegTrashAlt} onClick={() => deleteTodo(task.id)} />
        <img className="" src={IoMdCheckboxOutline} /> */}

        <FaRegPenToSquare />
        <FaRegTrashAlt />
        <IoMdCheckboxOutline />

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