import { Navbar } from "../components/navbar"
import { AdminDashboard } from "./adminDashboard"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import '../css/admin.css'
import { ProductCard } from "../components/productCard"
import { PaginateCompenent } from "../components/pagination"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { ProductsList } from "../components/productsList"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Cookies from "js-cookie"
import API from "../../../API"
import { useRef } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UseProductDeletedContextProvider } from "../components/useContext"
// import { headers } from "./adminDashboard"
export const notify = (message, type) => {
  if (type === "Error") {
      toast.error(message);
  } else if (type === "Success") {
      toast.success(message);
  }
}


export const AllProducts = () => {
  //*********************states and vars
  const cookieValue = Cookies.get('access_token');
  const [cookie, setCookie] = useState(Cookies.get("access_token"))

  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pages, setPages] = useState(0)
  const [subsetProducts, setSubsetProdcuts] = useState([])
  const [filterType, setFilterType] = useState("All products")
  const [activePage, setActivePage] = useState(1)

  const location = useLocation()
  const getAllProducts = async () => {
    try {

      // const res = await axios.get("http://localhost:3001/admin/products/statistics", {headers})
      const res = await API.get("/admin/products/statistics")
      setProducts(res.data.products)
      setSubsetProdcuts(res.data.products)
    } catch (error) {
      console.error(error)
    }

  }



  // **************************functions
  useEffect(() => {
    getAllProducts()
  }, []) 
  // useEffect( () => {
  //   headers.Authorization = `Barear ${cookie}`
  // }, [cookie])

  const getPage = (page) => { 

    if (page === 1) {
      setPageIndex(0)
    } else {
      
      setPageIndex((page - 1) * 9)

    }


  }
  const getProductsByType = (type) => {
    if (type === "All products") {
      setProducts(subsetProducts)
    } else {
      setProducts(subsetProducts.filter((product) => product.type === type));
    }


  }
  // useEffect(() => {
  //   getProductsByType(filterType)
  // }, [filterType])

  useEffect(() => {  
    if ((products.length % 9) === 0) {
      setPages(products.length / 9)
    } else {
      setPages(Math.trunc(products.length / 9) + 1)
    }
    getPage(1)

  }, [products])




  const getType = (type) => {
    // setFilterType(type)

    getProductsByType(type)
  }

  //********************JSX */
  return (

    <div style={{ display: 'flex' }}  >
      <Navbar getType={getType} />
      <div style={{ flex: 1 }}>
        <Header />
        <div style={{ backgroundColor: '#dadada', paddingInline: "20px" }}>
          <div className='main-container'>
            <div className='main-title'>
              <h2 className="text-2xl font-semibold">All Products</h2>
              <div className='date-title'>
                <p>Home &gt; All Products</p>
                <button className="flex bg-blackColor justify-center items-center gap-2.5 uppercase rounded-lg hover:cursor-pointer px-4 py-2
                 " onClick={() => navigate("/admin/createproduct")}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="9" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                  </svg>
                  <p className="text-white">add a new product</p>
                </button>
              </div>
            </div>

            <div className="mt-8 grid-cols-card grid gap-3.5 ">



              <ProductsList products={products}  pageIndex={pageIndex} />


            </div>
            {products.length >= 1 ? (
              <div>
                <PaginateCompenent getPage={getPage} pages={pages} products={products} />
              </div>
            ) : null}

            {/* <ToastContainer style={{ width: "400px" }} /> */}
          </div>
          <Footer />
        </div>
      </div>
    </div>

  )
}