import React, { useState ,useEffect } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { useCookies } from "react-cookie";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import './indexauth.css'

function ForgetPassword({setform}) {
  // useEffect(() => {
  //   import('./indexauth.css');
  // }, []);
  const schema = yup.object().shape({
    email: yup.string().email().required(""),   
  });
  
  const [email, setemail] = useState("");
  
  const { register, handleSubmit , getValues, formState : {errors} } = useForm({
    resolver: yupResolver(schema),
  });
 
   //const navigate = useNavigation();
   const navigate = useNavigate();

   const submit =async ()=>{
    try {
      console.log(email);
       await axios.post("http://localhost:3001/auth/reset", 
       {email} 
      );
    } catch (error) {
      alert('Reset Erreur ');
      console.log(error.message);
    }
  }
  
  return (
    <div className=' flex justify-center items-center '>
    <div className='flex flex-col bg-blue-800 items-start rounded-xl p-12 max-[500px]:px-10 ' style={{marginTop : '50px'}}>
          <div className='mb-7'>
            <h1 className='flex text-4xl font-bold mb-2'>Forget Password</h1>
          </div>
          
    <form className='flex flex-col items-start' onSubmit={handleSubmit(submit)}>
    <div className='mb-5'>
        <input 
           {...register("email")}
             className= {`border-2 border-gray 
             px-2 py-4 rounded-lg w-96 h-12 max-[500px]:w-72 outline-none focus:border-black
             ${errors.email && "focus:border-red-700"} `} type="text"
             onChange={(e)=>{setemail(e.target.value)}}
             name='email' placeholder='exemple@gmail.com '/>
                 <p className='text-red-700 text-xs flex items-start'>{errors.email?.message}</p>
        </div>
        <button type='submit' 
        //  onMouseEnter={()=>{ const values = getValues();
        //   setemail( values?.email);
        //   setpassword(values?.password);
        //   console.log(password);
        //   console.log(email)
        //  }}
         className='
        mb-4 
        border-none mt-4 transition duration-500 ease-in-out outline-none rounded-lg w-96 h-12 max-[500px]:w-72 text-white bg-black font-medium
        hover:bg-white hover:text-black hover:font-medium focus:outline-none 
        '
        >Send</button>
    </form>
    </div>
    </div>
  )
}

export default ForgetPassword