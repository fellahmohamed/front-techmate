import axios from 'axios';
import React, { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './indexauth.css'




function SingUp() {
  useEffect(() => {
    import('./indexauth.css');
  }, []);
  const schema = yup.object().shape({
    email: yup.string().email().required(""),
    phone: yup.string().min(10).max(10).required("phone must be exact 10 digits"),
    name: yup.string().required("enter your name"),
   
    password: yup.string().min(8).required("password must be > 8 and don't contain special characters"),
    confirmedPassword: yup.string().oneOf([yup.ref("password"), null], "enter the same password"),
    address: yup.string().required(),
  });
  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmedPassword, setconfirmedPassword] = useState("");
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");

  const { register, handleSubmit , getValues, formState : {errors} } = useForm({
    resolver: yupResolver(schema),
  });



  const navigate = useNavigate();


      const submit = async ()=>{
          //e.preventDefault();
            // const formatData = new FormData();
            // formatData.append('image' , imageUrl)
          try {
            await axios.post("http://localhost:3001/auth/signup" , 
              {email ,phone,name, password , confirmedPassword , address }
          );
          alert('register completed now Login');
           navigate('/login')
          } catch (error) {
              alert(error.message);
             console.log(error.message)
          }
      }

  //  const [openFileSelector,{imageURL, loading, errors}] = useFilePicker({
  //    readAs: 'DataURL',
  //    accept: [".png" , ".jpg" , "jpeg"],  
  //    multiple: true,
  //    limitFilesConfig: { min: 1, max:  1 },
  //   //   minFileSize: 0.1,  in megabytes
  //   //  maxFileSize: 50,
  //   //   imageSizeRestrictions: {
  //   //     maxHeight: 900, 
  //   //     maxWidth: 1600,
  //   //     minHeight: 600,
  //   //     minWidth: 768,
  //   //   },
  //  });
 

  return (

         <div className='  flex justify-center items-center'>
        <div className='flex flex-col bg-gray-100 items-start rounded-xl px-12 py-8 max-[500px]:px-10' style={{marginTop : '50px'}}>
        <div className='mb-2'>
        <h1 className='flex text-4xl font-bold m-0'>Register</h1>
        </div>
        <form className='flex flex-col items-start' onSubmit={handleSubmit(submit)}>

        <div className='mb-3'>
        <input    className= {`border-2 border-gray 
             px-2 py-4 rounded-lg w-96 h-12 max-[500px]:w-72 outline-none focus:border-black
           `}
           {...register("name")}
             onChange={(e)=>{setname(e.target.value)}}
      
        type="text" name='name' placeholder='Enter your name'/>
        </div>
     
       <div className='mb-3'>
       <input  className= {`border-2 border-gray 
             px-2 py-4 rounded-lg w-96 h-12 max-[500px]:w-72 outline-none focus:border-black
             ${errors.email && "focus:border-red-700"} `}
         type="text" name='email' placeholder='Enter your email'
          {...register("email")}
          onChange={(e)=>{setemail(e.target.value)}}
         />
         <p className='text-red-700 text-xs flex items-start'>{errors.email?.message}</p>

       </div>
        <div className='mb-3'>
        <input  className= {`border-2 border-gray 
             px-2 py-4 rounded-lg w-96 h-12 max-[500px]:w-72 outline-none focus:border-black
             ${errors.password && "focus:border-red-700"} `}
        
        type="password" name='password'  placeholder='Enter your password' 

        {...register("password")}
        onChange={(e)=>{setpassword(e.target.value)}}
        />
            <p className='text-red-700 text-xs flex items-start'>{errors.password?.message}</p>

        </div>
       
        <div className='mb-3'>
        <input className= {`border-2 border-gray 
             px-2 py-4 rounded-lg w-96 h-12 max-[500px]:w-72 outline-none focus:border-black
             ${errors.confirmedPassword && "focus:border-red-700"} `}
     
     type="password" name='confirmedPassword' placeholder='confirm your password' 
     {...register("confirmedPassword")}
     onChange={(e)=>{setconfirmedPassword(e.target.value)}}
     />
      <p className='text-red-700 text-xs flex items-start'>{errors.confirmedPassword?.message}</p>

        </div>

        <input 
         
         className= {` mb-3 border-2 border-gray 
         px-2 py-4 rounded-lg w-96 h-12 max-[500px]:w-72 outline-none focus:border-black`} type="text" name='address
         ' placeholder='Enter your address' 
         {...register("address")}
         onChange={(e)=>{setaddress(e.target.value)}}
         />
      
      <div >
      <input  
     className= {`border-2 border-gray 
     px-2 py-4 rounded-lg w-96 h-12 max-[500px]:w-72 outline-none focus:border-black
     ${errors.phone && "focus:border-red-700"} `}
    type="text"
    name='phone' placeholder='Enter your phoneNumber' 
    {...register("phone")}
    onChange={(e)=>{setphone(e.target.value)}}
    />
         <p className='text-red-700 text-xs flex items-start '>{errors.phone?.message}</p>

      </div>
        {/* <input type="file" name='file' onChange={(e)=>{setfile(e.target.files[0])}} /> */}
       
        {/* <div className='w-52'>
          {/* <button onClick={() => openFileSelector() } type="button">Select a pic for profile </button>
          <div>{!!imageURL &&<img src={imageURL[0]?.content} alt="" className='w-24' />}</div>  
        </div> */}
        <button type='submit' 
        
      className='
      mb-4 
      border-none mt-4 transition duration-500 ease-in-out outline-none rounded-lg w-96 h-12 max-[500px]:w-72 text-white bg-black font-medium
      hover:bg-white hover:text-black hover:font-medium focus:outline-none '
     >Create account</button>
    </form>
        </div>
    {/* <div>
    <a className='hover:underline ' href="/login">login</a>
    </div> */}
    </div>
  )
}

export default SingUp