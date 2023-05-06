import '../css/admin.css'
import React, { useState } from 'react';
import logo from '../images/new-logo.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export const Navbar = ({ getType}) => {
    // vars and states********************************
    const [isDisplay, setDisplay] = useState(false)
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate()
    const [typesInfo, setTypesInfo] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [clickedType, setClickedtype] = useState("All products")


    const getTypes = async () => {
        try {
            const res = await axios.get("http://localhost:3001/products/types")
            setTotalProducts(res.data.totalProducts)
            setTypesInfo(res.data.typesCount)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTypes()
        const currentPage = window.location.pathname.split('/').pop();
        setActiveLink(currentPage)

    }, [])






    //Functions***********************************

    const handleClick = () => {
        setDisplay((prev) => !prev)
    }

    const handleActiveClick = (event) => {
        console.log(event.target.textContent)
        setActiveLink(event.target.textContent);
    };
    const handleTypeClick = (event) => {
        if (event.target.className === "") {
            getType(event.target.innerText)
            setClickedtype(event.target.innerText)
        } else {
            getType(event.target.innerText.split("\n")[0])
            setClickedtype(event.target.innerText.split("\n")[0])
        }   

       
    }

    // THE JSX*************************************
    return (
        <nav className="nav-container">
            <div className='img-container hover:cursor-pointer' onClick={() => navigate("/")}>
                <img src={logo} width="300px" alt="the logo" />
            </div>


            <Link to="/admin" className="link">
                <div className={activeLink === 'admin' ? 'link-container active' : 'link-container'} onClick={handleActiveClick}>
                    <i className="fa-solid fa-house"></i>
                    <p >Dashboard</p>
                </div>
            </Link>



            <Link to="/admin/allproducts" className="link">
                <div className={activeLink === 'allproducts' ? 'link-container active' : 'link-container'} onClick={handleActiveClick}>
                    <i className="fa-solid fa-shop"></i>
                    <p >All Products</p>
                </div>
            </Link>


            <Link to="/admin/allorders" className="link">
                <div className={activeLink === 'allorders' ? 'link-container active' : 'link-container'} onClick={handleActiveClick}>
                    <i className="fa-solid fa-file-lines"></i>
                    <p>All Orders</p>

                </div>
            </Link>


            <div className='cat'>
                <p>Categories</p>
                <i className={`fa-solid    ${isDisplay ? "fa-angle-up" : "fa-angle-down"}`} onClick={handleClick}></i>
            </div>
            <div className={`cat-container ${isDisplay ? "cat-visible" : "cat-hidden"}`}  >
                <div style={{ minHeight: 0, display: "grid", gap: "10px" }}>
                    <div className="category hover:cursor-pointer " onClick={handleTypeClick}>
                        <p>All products</p>
                        <span className={clickedType === "All products" ? 'duration-300 w-11 h-11 bg-blueColor text-center text-white rounded': 'duration-300 w-11 h-11 text-center'}>{totalProducts}</span>
                    </div>
                    {typesInfo.length >= 1 ? (typesInfo.map((type, index) => {
                        return (
                            <div className="category hover:cursor-pointer" onClick={handleTypeClick} key={index}>
                                <p>{type.type}</p>
                                <span className={clickedType === type.type ? 'duration-300 w-11 h-11 bg-blueColor text-center text-white rounded': 'duration-300 w-11 h-11 text-center rounded'}>{type.count}</span>
                   
                            </div>
                        )
                    })) : (<h5>There is a problem with types</h5>)}


                </div>

            </div>



        </nav >
    )
}