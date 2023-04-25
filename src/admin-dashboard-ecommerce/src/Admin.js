
import './css/admin.css';
import { Navbar } from './components/navbar';
import { Header } from './components/header';

import { CreateProduct } from './pages/createProduct';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AdminDashboard } from './pages/adminDashboard';
// import { AddProduct } from './components/addProduct';
import  { Footer } from './components/footer'

function Admin() {
 
  
  return (
    // <Router>
    <div style={{display: 'flex' }}  >
      <Navbar/>
      <div style={{flex: 1}}>
        <Header />
        <div style={{backgroundColor: '#dadada', paddingInline: "20px"}}>
        <Routes>
          <Route path='/' element={<AdminDashboard />} />
          <Route path='/createproduct' element={<CreateProduct />} />
          
        </Routes> 
       
        <Footer />
        </div>
      </div>
    </div>
    //  </Router>
  );
}

export default Admin;
