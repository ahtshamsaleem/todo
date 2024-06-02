'use client'
import { validateEmail, validateName, validatePass } from '@/lib/validateInput';
import axios from 'axios';
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import { FaLink } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { PropagateLoader } from 'react-spinners';



const Signup = (props) => {



    const [formState, setFormState] = useState({
        success: false,
        message: '',
        loading: false
    });
    const [showPass, setShowPass] = useState(false);

    const inputRef = useRef();
    

    useEffect(() => {
        inputRef.current.focus();
    } ,[])

    const [name, setName] = useState({
        name: 'name',
        value: '',
        isValid: true,
        error: ''
    })

    const [email, setEmail] = useState({
        name: 'email',
        value: '',
        isValid: true,
        error: ''
    });

    const [password, setPassword] = useState({
        name: 'password',
        value: '',
        isValid: true,
        error: ''
    });


    

// INPUT HANDLER --------------------->>
    const onChangeHandler = (e) => {
        if (e.target.name === 'name') {
            setName((prev) => {
                return {
                    ...prev,
                    value: e.target.value,
                    isValid: validateName(e.target.value),
                    error: ''
                }
            })
        }

        if (e.target.name === 'email') {
            setEmail((prev) => {
                return {
                    ...prev,
                    value: e.target.value,
                    isValid: validateEmail(e.target.value),
                    error: ''
                }
            })
        }

        if (e.target.name === 'password') {
            setPassword((prev) => {
                return {
                    ...prev,
                    value: e.target.value,
                    isValid: validatePass(e.target.value),
                    error: ''
                    
                }
            })
        }

        return;
    }
    

// SUBMIT HANDLER --------------------->
    const submitHandler = async (event) => {
        
        event.preventDefault();
        let error = false;

        setName(prev => ({ ...prev, value: '' }));
        setEmail(prev => ({ ...prev, value: '' }));
        setPassword(prev => ({ ...prev, value: '' }));

        if(name.value.length === 0) {
            error = true;
            setName((prev) => ({ ...prev, error: 'Required' }));
        }

        if(email.value.length === 0) {
            error = true;
            setEmail((prev) => ({ ...prev, error: 'Required' }));
        }

        if(password.value.length === 0) {
            error = true;
            setPassword((prev) => ({ ...prev, error: 'Required' }));
        }   


        if(!error) {
            setFormState(prev => ({...prev,  loading:true, message: ''}));
            try {
                const {data} = await axios.post('api/auth/signup', {
                    name: name.value,
                    email: email.value,
                    password: password.value
                })
                setFormState(prev => ({...prev, message: data.message, success:data.success, loading:false}))
                
            } catch(err) {
                setFormState(prev => ({...prev, message: err.message, loading:false}))
            }
            
        }

        return;
    

    }





  return (
    <div className='flex flex-col justify-center items-center w-[50%] mt-20 px-10 py-8 border-1 rounded-xl shadow-md shadow-black/10 max-lg:w-full ' >
        <form onSubmit={submitHandler}  className='flex flex-col justify-center items-start gap-3 w-full mt-4' >
          {name.error && <p className='text-red-500 px-2 mb-[-8px] '>{name.error}</p>}
          <input ref={inputRef} onChange={onChangeHandler} value={name.value} type='text' name='name' placeholder='Name*' className={`w-full text-sm font-sans font-normal leading-5 px-3 py-3 rounded-md shadow-md shadow-slate-500 focus:shadow-outline-purple focus:shadow-lg hover:border-blue-500  bg-white text-slate-900 outline-none border border-solid ${name.isValid ? 'focus:border-blue-500' : 'focus:border-red-500'} ${name.isValid ? 'border-slate-300' : 'border-red-300 placeholder:text-red-500'}` }/>

          {email.error && <p className='text-red-500 px-2 mb-[-8px] '>{email.error}</p>}
          <input onChange={onChangeHandler} value={email.value} type='email' name='email' placeholder='Email*' className={`w-full text-sm font-sans font-normal leading-5 px-3 py-3 rounded-md shadow-md shadow-slate-500 focus:shadow-outline-purple focus:shadow-lg hover:border-blue-500  bg-white text-slate-900 outline-none border border-solid ${email.isValid ? 'focus:border-blue-500' : 'focus:border-red-500'} ${email.isValid ? 'border-slate-300' : 'border-red-300 placeholder:text-red-500'}` }/>

          {password.error && <p className='text-red-500 px-2 mb-[-8px] '>{password.error}</p>}
          <div className='w-full relative'>
          <div onClick={() => setShowPass(!showPass)} className='hover:cursor-pointer'>
          {showPass ? <IoMdEye className='absolute right-4 translate-y-[100%] text-slate-600' /> : <IoMdEyeOff className='absolute right-4 translate-y-[100%] text-slate-600' />}</div>
          <input onChange={onChangeHandler} value={password.value} type={showPass ? 'name' : 'password'} name='password' placeholder='Password' className={`w-full text-sm font-sans font-normal leading-5 px-3 py-3 rounded-md shadow-md shadow-slate-500 focus:shadow-outline-purple focus:shadow-lg hover:border-blue-500  bg-white text-slate-900 outline-none border border-solid ${password.isValid ? 'focus:border-blue-500' : 'focus:border-red-500'} ${password.isValid ? 'border-slate-300' : 'border-red-300 placeholder:text-red-500'}` } />  
          </div>

          <Link className='text-white' href={'/login'}>Go to Login Page</Link>
          {!formState.success && <p   className='text-red-500  mb-[-8px] '>{formState.message}</p>}
          {formState.success && <p className='text-white mb-[-8px] '>{formState.message} </p>}


          
          

          <button  type='submit' className="mt-6 w-full px-4 py-3 text-white text-lg font-semibold bg-black rounded-lg ">{formState.loading ? <PropagateLoader color="white" className="mb-[14px] scale-75" /> : 'Sign Up'}</button>
          </form>
    </div>
  )
}

export default Signup