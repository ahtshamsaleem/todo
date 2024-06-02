import { FaRegPenToSquare } from 'react-icons/fa6';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { IoMdDoneAll } from 'react-icons/io';
import { ClipLoader } from 'react-spinners';

const Todo = ({ todo, deleteTodo, editHandler, toggleComplete, onChangeHandler, editingId, editingTodo, submitUpdateHandler, isLoading, error, }) => {
    return (
        <div className={`text-white flex justify-center items-center mb-4 p-4  rounded-xl hover:scale-[1.02] transition-all  ${ todo.isComplete ? 'bg-emerald-600' : 'bg-slate-800' }`} >
            {isLoading.loading && todo.id === isLoading.id ? (
                <ClipLoader className='p-6 ' color='white' />
            ) : error.todo.message && todo.id === error.todo.id ? (
                <p className='text-red-600  text-xl text-center '>
                    {error.todo.message}
                </p>
            ) : (
                <>
                    <div className='p-2 w-[80%]'>
                        {todo.id === editingId ? ( <input type='text' onChange={onChangeHandler} value={editingTodo.title} name='edit_title' className='w-full text-md font-semibold font-sans px-3 py-1 mb-4 rounded-md focus:shadow-outline-purple focus:shadow-lg hover:border-blue-500 focus:border-blue-500 bg-white text-slate-900 outline-none border border-solid' /> ) : ( <h3 className='text-lg font-semibold '> {todo.title} </h3> )}
                        {todo.id === editingId ? ( <textarea type='text' onChange={onChangeHandler} value={editingTodo.description} name='edit_description' className='w-full text-md font-sans font-normal px-3 py-1 rounded-md focus:shadow-outline-purple focus:shadow-lg hover:border-blue-500 focus:border-blue-500 bg-white text-slate-900 outline-none border border-solid' /> ) : ( <p>{todo.description}</p> )}
                    </div>
                    <div className='flex justify-between items-center gap-2 scale-125 p-4 '>
                        {todo.id === editingId ? ( <IoMdDoneAll className='text-green-500 hover:cursor-pointer hover:scale-110 active:scale-90' onClick={() => submitUpdateHandler(todo.id)} /> ) : ( <FaRegPenToSquare className='hover:cursor-pointer hover:scale-110 active:scale-90' onClick={() => editHandler(todo.id)} /> )}
                        <FaRegTrashAlt className='hover:cursor-pointer hover:scale-110 active:scale-90' onClick={() => deleteTodo(todo.id)} />
                        <IoMdCheckboxOutline className={`hover:cursor-pointer hover:scale-110 active:scale-90 ${ todo.isComplete ? 'text-white' : 'text-green-500' }`} onClick={() => toggleComplete(todo.id)} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Todo;
