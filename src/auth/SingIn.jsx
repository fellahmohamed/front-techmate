import React, { useState,useEffect } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import axios from 'axios';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './indexauth.css'

// import GoogleIcon from '@mui/icons-material/Google';

function SingIn() {
  // useEffect(() => {
  //   import('./indexauth.css');
  // }, []);
  const responseGoogle = async() => {
    // axios.get("http://localhost:3001/auth/google").then((response)=>{
  //   console.log(response.data);
  //  // window.location.href = response.data.redirectUrl
  // }).catch((err)=>{
  //   console.log(err);
  // })
  
  // const submit =async ()=>{
  //    try {
  //       const res = await axios.post("http://localhost:3001/auth/login", {
  //        email,password
  //      });
  //      setCookies('access_token',res.data.token);
  //      window.localStorage.setItem('userID',res.data.token);
  //      alert('login success')
  //      navigate('/home')
  //    } catch (error) {
  //      alert(error)
  //    }
  //  };
    try {
      console.log("-----")
  
    const newWindow =  window.open(
              "http://localhost:3001/auth/google",
              "_blank",
              "width=500,height=600",
            );
  
            // setTimeout(()=>{
            //   console.log(newWindow.close());
            //   if(newWindow.closed){
            //     alert('Login Success')
            //     navigate('/home')
            //   }
            // },5000)
  
            const timer = setInterval(() => {
              if (newWindow.closed) {
                clearInterval(timer);
                alert('Login Success')
                navigate('/')
                
              }
            }, 500);
  
           // const res = await axios.get("http://localhost:3001/auth/google" );
  
           // settoke(res);
            //  const res = await axios.get("http://localhost:3001/auth/login" );
            
            //  setCookies('access_token',res.data.token);
            //  window.localStorage.setItem('userID',res.data.token);
        // newWindow.addEventListener('load',()=>{
        //   console.log(newWindow.document.body.innerHTML);
        // })  
          //   try {
          //     const res = await axios.get("http://localhost:3001/auth/google/callback");
          //    setCookies('access_token',res.data.token);
          //    window.localStorage.setItem('userID',res.data.token);
          //    alert('login success')
          //    navigate('/home')
          //  } catch (error) {
          //    alert(error)
          //  }
          //  let response = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0MWM2ODBmYjM1YTc2M2NjNTU5NjNjNCIsIm5hbWUiOiJUSVRPVUFIIiwiZW1haWwiOiJ5LnRpdG91YWhAZXNpLXNiYS5keiIsInZlcmlmeSI6dHJ1ZSwiaXNBZG1pbiI6ZmFsc2UsIl9fdiI6MH0sImlhdCI6MTY3OTY1NTc0OCwiZXhwIjoxNjc5NjU5MzQ4fQ.9tWiL1kDUXEZXmrajZBog2Kjglp9wq32n3KARiBnQ0c"
          //  var userObject = jwt_decode(response)
          // console.log(userObject);
  
   } catch (error) {
     alert(error.message)
   }
  }


  //-----------------
  const schema = yup.object().shape({
    email: yup.string().email().required(""),
    password: yup.string().min(8).required(),    
  });
  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  
  const { register, handleSubmit , getValues, formState : {errors} } = useForm({
    resolver: yupResolver(schema),
  });

   const [_,setCookies] = useCookies(["access_token"])
   const navigate = useNavigate();

   const submit =async ()=>{
   // e.preventDefault()
    try {
       const res = await axios.post("http://localhost:3001/auth/login", {
        email,password
      });
      
      setCookies('access_token',res.data.token);
      window.localStorage.setItem('userID',res.data.token);
      console.log(res)

      alert('login success')

      if (!res.data.isAdmin){
      navigate('/')
    }else{
      
      window.localStorage.setItem('admin', res.data.isAdmin);

      const roles = res.data.user.adminRoles.roles
      localStorage.setItem("adminRoles", JSON.stringify(roles))
      navigate("/admin")
  

      
        
      }
    } catch (error) {
      console.log("---------");
      if(error.message.includes("404")){
        alert("No user found Or password wrong");
      }
      if(error.message.includes("500")){
        alert("Verify your account from your email and then login");
      }
    }
  };

 const [dede, setdede] = useState("")
 console.log(dede);
  return (
   <div className=' flex justify-center items-center'>
     <div className='flex flex-col bg-blue-800 items-start rounded-xl p-12 max-[500px]:px-10 ' style={{marginTop : '50px'}}>
           <div className='mb-7'>
            <h1 className='flex text-4xl font-bold mb-2'>Login</h1>
            <Link to="/forgetpassword" className='hover:underline '>
            Forgot your password ?
            </Link>
          </div>
        <form className='flex flex-col items-start' onSubmit={handleSubmit(submit)}>
        {/* <input type="text" id="floating_outlined" 
        class="relative block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Floating outlined</label> */}
{/* 
        <label htmlFor="email" className='text-lg mb-2'>Enter Your Email</label> */}
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

      <div>
      <input 
            {...register("password")}
            onChange={(e)=>{setpassword(e.target.value)}}
           className= {`
           border-2 border-gray 
             px-2 py-4 rounded-lg w-96 h-12 max-[500px]:w-72 outline-none focus:border-black
             ${errors.password && "focus:border-red-700"}`} type="password" name='password' placeholder='************'/>
               <p className='text-red-700 text-xs flex items-start'>{errors.password?.message}</p>
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
        >Email Login</button>
    </form>
   <div className='flex justify-between'>
      <p className='text-gray-500'>Don't have account?</p>
    <span className='ml-2 hover:underline font-semibold'><a href='/register' className='hover:underline'> 
     Sign up
    </a></span>
   </div>
   <div className='w-96 flex justify-center items-center my-3'>---------------------<span>OR</span>---------------------</div>
   <div className='flex w-full justify-center '>
    <button onClick={responseGoogle} 
    className=" hover:border-black "
                    >
                     <div className='w-5'>
                     <img
                      className='w-full'
                      src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'      /> 
                      </div>          
                  {/* <MaterialIcon icon="account_box" size={36}/> */}
                    </button> 
   </div>
    </div>
   </div>
  )
}

export default SingIn