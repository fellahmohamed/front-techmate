import '../css/admin.css'
import React, { useState } from 'react';
import logo from '../images/new-logo.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export const Navbar = () => {
    // vars and states********************************
    const [isDisplay, setDisplay] = useState(false)
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate()
 

    //Functions***********************************

    const handleClick = () => {
        setDisplay((prev) => !prev)
    }

    const handleActiveClick = (event) => {
        console.log(event.target.textContent)
        setActiveLink(event.target.textContent);

    };
    // THE JSX*************************************
    return (
        <nav className="nav-container">
            <div className='img-container hover:cursor-pointer' onClick={() => navigate("/")}>
                <img src={logo} width="300px" alt="the logo" />
            </div>

            
            <Link to="/admin" className="link">
                <div className={activeLink === 'Dashboard' ? 'link-container active' : 'link-container'} onClick={handleActiveClick}>
                    <i className="fa-solid fa-house"></i>
                    <p >Dashboard</p>
                </div>
            </Link>


            
            <Link to="/admin/allproducts" className="link">
                <div className={activeLink === 'All Products' ? 'link-container active' : 'link-container'} onClick={handleActiveClick}>
                    <i className="fa-solid fa-shop"></i>
                    <p >All Products</p>
                </div>
            </Link>

            
            <Link to="/admin/createproduct" className="link">
                <div className={activeLink === 'All Orders' ? 'link-container active' : 'link-container'} onClick={handleActiveClick}>
                <i className="fa-solid fa-file-lines"></i>
                    <p>All Orders</p>
                    
                </div>
            </Link>
            

            <div className='cat'>
                <p>Categories</p>
                <i className={`fa-solid   ${isDisplay ? "fa-angle-up" : "fa-angle-down"}`} onClick={handleClick}></i>
            </div>
            <div className={`cat-container ${isDisplay ? "visible" : "hidden"}`}  >
                <div style={{ minHeight: 0, display: "grid", gap: "10px" }}>
                    <div className="category">
                        <p>Speakers</p>
                        <span>32</span>
                    </div>
                    <div className="category">
                        <p>Televisions</p>
                        <span>32</span>
                    </div>
                    <div className="category">
                        <p>Smartphones</p>
                        <span>10</span>
                    </div>
                    <div className="category">
                        <p>Tablets</p>
                        <span>32</span>
                    </div>
                    <div className="category">
                        <p>Watches</p>
                        <span>42</span>
                    </div>
                    <div className="category">
                        <p>laptops</p>
                        <span>22</span>
                    </div>
                    <div className="category">
                        <p>accessories</p>
                        <span>10</span>
                    </div>
                    <div className="category">
                        <p>computers</p>
                        <span>10</span>
                    </div>
                    <div className="category">
                        <p>gaming</p>
                        <span>10</span>
                    </div>
                    <div className="category">
                        <p>audio</p>
                        <span>10</span>
                    </div>


                </div>
            </div>



        </nav >
    )
}