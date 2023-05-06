import { useNavigate, useParams } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { Header } from "../components/header"
import phone from "../images/phone.png"
import API from "../../../API"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { ProductImage } from "../components/productImages"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [price, setPrice] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const getProduct = async () => {
        const response = API.get(`/products/${params.id}`)
            .then(res => {
                setProduct(res.data.product)
                setPrice(`$${res.data.product.price}`)

            })
            .catch(error => {
                console.error(error)
            });
    }
    
    useEffect(() => {
        getProduct()
    }, [])

    const deleteProduct = (id) => {
        setLoading(true)
        const res = API.delete(`/admin/product/${params.id}`)
        .then( response => {
            setLoading(false)
            changeLocation(response.data.message)
        }).catch(error => {
            setLoading(false)
                const message = error.response.data.message
                notify(message, "Error")
        })

    } 
    const notify = (message, type) => {
        if (type === "Error") {
            toast.error(message);
        } else if (type === "Success") {
            toast.success(message);
        }
    }
    const changeLocation =  async (message) => {
        await notify(message, "Success")
        navigate("/admin/allproducts")
    }
  

    return (
   
        
            <div className="flex"  >
            <Navbar />
            <div style={{ flex: 1 }}>
                <Header />
                <div style={{ backgroundColor: '#dadada', paddingInline: "20px" }}>
                    <div className='main-container'>
                        <div className='main-title'>
                            <h2 className="text-2xl font-semibold">Product Details</h2>
                            <div className='date-title'>
                                <p>Home &gt; All Products &gt; Product Details</p>
                            </div>
                        </div>
                        <div className="bg-white mt-6 p-6 rounded-2xl flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-5">
                            <div className="w-full">
                                <h2 className="mb-4  text-2xl">Product Name</h2>
                                <input type="text" className="border border-gray-900 border-solid w-full rounded-xl p-4 outline-none" placeholder="enter the name of the product" value={product.name} />
                            </div>
                            <div className="w-full">
                                <h2 className="mb-4  text-2xl">Product Category</h2>
                                <input type="text" className="border border-gray-900 border-solid w-full rounded-xl p-4 outline-none" placeholder="enter the category of the product"
                                    value={product.type} />
                            </div>

                            <div className="w-full">
                                <h2 className="mb-4  text-2xl">Stock Quantity</h2>
                                <input type="text" className="border border-gray-900 border-solid w-full rounded-xl p-4 outline-none" placeholder="enter the stock of the product"
                                    value={product.quantity} />
                            </div>
                            <div className="w-full">
                                <h2 className="mb-4  text-2xl">Product Sales</h2>
                                <input type="text" className="border border-gray-900 border-solid w-full rounded-xl p-4 outline-none" placeholder="enter the sales of the product"
                                    value={product.sales} />
                            </div>

                            <div className="w-full">
                                <h2 className="mb-4  text-2xl">Product Price</h2>
                                <input type="text" className="border border-gray-900 border-solid w-full rounded-xl p-4 outline-none" placeholder="enter the price of the product"
                                    value={price} />
                            </div>
                            <div className="w-full">
                                <h2 className="mb-4  text-2xl">Product Colors</h2>
                                <input type="text" className="border border-gray-900 border-solid w-full rounded-xl p-4 outline-none" placeholder="enter the price of the product"
                                    value={
                                        product?.colors && product?.colors.length >= 1 ? (product.colors[0].split(",").map((color) => {
                                            return (color)
                                        })) : "There is no colors for the time being"
                                    } />
                            </div>
                            </div>
                            <div>
                                <h2 className="mb-4  text-2xl">Product Images</h2>
                                <div className="mt-2 grid-cols-card grid gap-3.5 w-full">
                                    {product?.imageUrl && product?.imageUrl.length >= 1 ? (
                                        product?.imageUrl.map((image) => {
                                            return <ProductImage imageLink={image} />

                                        })

                                    ) : (<h2>There is no images for the product</h2>)}

                                </div>
                            </div>
                            <div className="flex items-center justify-end mt-7 gap-4">
                      
                                <button className="bg-blackColor text-white rounded-lg py-2 px-4 hover:cursor-pointer hover:border-none w-36"
                                onClick={() => navigate(`/admin/product/${params.id}/edit`)}>EDIT</button>
                                <button className="bg-red-600 text-white rounded-lg py-2 px-4 hover:cursor-pointer hover:border-none w-36" onClick={ () => deleteProduct(params.id)}>DELETE</button>
                               
                            </div>
                       
                        </div>


                     
                    </div>
             
                </div>
              
            </div>
   
     
        </div>
    
        


      
   
    )
}