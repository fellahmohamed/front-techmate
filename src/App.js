import Sidebar from './homepage/sidebar';

import Main from './homepage/home';
import Header from './homepage/header';
import Footer from './homepage/footer';
import { useState, useEffect } from 'react';
import { Route,Routes, useLocation } from 'react-router-dom';
import ForgetPassword from "./auth/ForgetPassword";
import SingIn from "./auth/SingIn";
import SingUp from "./auth/SingUp";
import Admin from './admin-dashboard-ecommerce/src/Admin.js';
import { CreateProduct } from './admin-dashboard-ecommerce/src/pages/createProduct.js';
import { AllProducts } from './admin-dashboard-ecommerce/src/pages/allProducts';
import { AllOrders } from './admin-dashboard-ecommerce/src/pages/allOrders';
import { ProductDetails } from './admin-dashboard-ecommerce/src/pages/productDetails';
import { EditProduct } from './admin-dashboard-ecommerce/src/pages/editProduct';
import { ToastContainer, toast } from 'react-toastify';
import { ProductManagerMiddleware } from './admin-dashboard-ecommerce/src/components/middlewares/ProductManagerMiddleware';
import { OrderManagerMiddleware } from './admin-dashboard-ecommerce/src/components/middlewares/OrderManagerMiddleware';
import { AllUsers } from './admin-dashboard-ecommerce/src/pages/AllUsers';
import {SuperManagerMiddleware} from './admin-dashboard-ecommerce/src/components/middlewares/SuperManagerMiddleware'
import { AdminMiddleware } from './admin-dashboard-ecommerce/src/components/middlewares/AdminMiddleware';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const notify = (message, type) => {
    if (type === "Error") {
        toast.error(message);
    } else if (type === "Success") {
        toast.success(message);
    }
  }
  const {state } = useLocation()
  const adminError = state?.message
  if (adminError) {
    notify(adminError, "Error")
  }
  

  return(
    <>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path="/login" element={<SingIn />}/>
          <Route path="/register" element={<SingUp />}/>
          <Route path="/forgetpassword" element={<ForgetPassword />}/>


      <Route element={<AdminMiddleware/>}>

          <Route path="/admin" element={<Admin />}/>
          <Route element={<ProductManagerMiddleware/>}>
          <Route path='/admin/allproducts' element={<AllProducts/>}/>
          <Route path='/admin/product/:id' element={<ProductDetails/>}/>
          <Route path='/admin/product/:id/edit' element={<EditProduct/>}/>
          <Route path="/admin/createproduct" element={<CreateProduct />} />
          </Route>

        <Route element={<OrderManagerMiddleware/>}>
          <Route path="/admin/allorders" element={<AllOrders/>} />
        </Route>

        <Route element={<SuperManagerMiddleware/>}>
          <Route path="/admin/allusers" element={<AllUsers/>} />
          </Route >

          </Route>
       
      
  </Routes>
  <ToastContainer style={{ width: "400px" }} /> 
    </>)
  
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
  <ToastContainer  /> 
  </div>)
}

export default App;
