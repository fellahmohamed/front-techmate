import './css/admin.css';
import { Navbar } from './components/navbar';
import { Header } from './components/header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateProduct } from './pages/createProduct';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AdminDashboard } from './pages/adminDashboard';
import  { Footer } from './components/footer'

function Admin() {
  const { state } = useLocation()
  const error = state?.message
  const notify = (message, type) => {
    if (type === "Error") {
        toast.error(message);
    } else if (type === "Success") {
        toast.success(message);
    }
}
 if (error ) {
  notify(error, "Error")
 }
  return (
   
    <div style={{display: 'flex' }}  >
      <Navbar  />
      <div style={{flex: 1}}>
        <Header />
        <div style={{backgroundColor: '#dadada', paddingInline: "20px"}}>
          <AdminDashboard/>
        <Footer />
        </div>
      </div>
    </div>
  
  );
}

export default Admin;
