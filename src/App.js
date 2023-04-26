import Sidebar from './homepage/sidebar';

import Main from './homepage/home';
import Header from './homepage/header';
import Footer from './homepage/footer';
import { useState, useEffect } from 'react';
import { Route,Routes } from 'react-router-dom';
import ForgetPassword from "./auth/ForgetPassword";
import SingIn from "./auth/SingIn";
import SingUp from "./auth/SingUp";
import Admin from './admin-dashboard-ecommerce/src/Admin.js';
import { CreateProduct } from './admin-dashboard-ecommerce/src/pages/createProduct.js';



function App() {

  return(
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path="/login" element={<SingIn />}/>
          <Route path="/register" element={<SingUp />}/>
          <Route path="/forgetpassword" element={<ForgetPassword />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path='/admin/allproducts' element={<h1>all product</h1>}></Route>
          <Route path="/admin/createproduct" element={<CreateProduct />} />
      
  </Routes>)
}
export function Home(){
  let [display,setDisplay]=useState(localStorage.getItem('pageContent') || "main");
  function handleclick(a){
    setDisplay(a);
    console.log(a,display)
   
  } 
  useEffect(() => {
    localStorage.setItem('pageContent', display);
      
  }, [display]);
  return(
  <div className='homePageContainer'>
  <Header handleclick={handleclick}/>
  <div className='body'>
  <Sidebar handleclick={handleclick} />
  <Main page={display}/>
  </div>
  <Footer/>
  </div>)
}

export default App;
