import { Navbar } from "../components/navbar"
import { Header } from "../components/header"
import '../components/css/selectmenu.css'
import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Color } from '../components/Color'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import API from '../../../API'
import { yupResolver } from '@hookform/resolvers/yup'
import { Image } from '../components/Image'
import axios from "axios"
import Cookies from "js-cookie"
import { Loading2 } from "../components/loading"
import { ProductImage } from "../components/productImages"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const EditProduct = () => {
    //************************states and vars**************************
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const params = useParams()
    const [colorsList, setColorsList] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [imagesList, setImagesList] = useState([])
    const [newColor, setNewColor] = useState("")
    const cookieValue = Cookies.get('access_token');
    const fileInputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})
    // const [cookie, setCookie] = useState(Cookies.get("access_token"))
    const navigate = useNavigate()
    const images = []
    const colors = []







    //******************************functions********************* */
    const shema = yup.object().shape({
        name: yup.string().min(4).required("You must add the name of the product"),
        price: yup.number().positive().required('Price is required'),
        quantity: yup.number().integer().positive().min(1).required("You must add the Stock Quantity"),
        file: yup.mixed().test("min", "upload one image at least to create the product and the max is 6", () => {
            if (imagesList.length >= 1 && imagesList.length <= 6) {

                return true

            } else {

                return false
            }
        })
    })

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(shema)
    })


    const getProduct = async () => {

        const res = await axios.get(`http://localhost:3001/products/${params.id}`)
        
        setProduct(res.data.product)
        setSelectedOption(res.data.product.type)
    }
    
    useEffect(() => {
        getProduct()
   

    }, [])


    useEffect(() => {
        if (product && product.colors) {
            product.colors[0].split(",").map((item, index) => {
                const color = {
                    id: index + 1,
                    colorName: item
                }
                colors.push(color)
            })
        }

        setColorsList(colors)
        if (product && product.imageUrl) {
            const fetchImages = async () => {
                const images = await Promise.all(
                    product.imageUrl.map(async (url) => {
                        const arrayName = url.split("-")[3].split(".");
                        const imageName = `${arrayName[0]}.${arrayName[1]}`;
                        const res = await fetch(url);
                        const blob = await res.blob();
                     
                        const file = new File([blob], imageName, { type: "image/*" })
                        const image = {
                            link: url,
                            imageFile: file
                        }
                        return image
                    })
                );

                setImagesList(images);
            };

            fetchImages();
        }

    }, [product]);




    const handleSelectClick = () => {
        setIsOpen((prev) => !prev);
    };

    const getOption = (e) => {
        setSelectedOption(e.target.innerHTML);
        setIsOpen(true);
    };
    const handleChange = (event) => {
        setNewColor(event.target.value)
        setInputValue(event.target.value)
    }
    const addColor = () => {
        if (inputValue !== "") {
            const color = {
                id: colorsList.length === 0 ? 1 : colorsList[colorsList.length - 1].id + 1,
                colorName: newColor
            }

            setColorsList([...colorsList, color])
        }
        setInputValue("")

    }

    const deleteColor = function (id) {

        const newColorsList = colorsList.filter((color) => {
            if (color.id === id) {
                return false
            } else {
                return true
            }
        })
        setColorsList(newColorsList)
    }
    const deleteImage = function (id) {
        const newImagesList = imagesList.filter((image) => {
            if (id === imagesList.indexOf(image)) {
                return false
            } else {
                return true
            }
        })

        setImagesList(newImagesList)


    }
    const handleImage = (e) => {
        const images = []
        for (let i = 0; i < e.target.files.length; i++) {
            const image = {
                link: "",
                imageFile: e.target.files[i]
            }
            images.push(image)
        }

        setImagesList([...imagesList, ...images])
    }
    const onSubmit = async (data) => {
   
        data.type = selectedOption
        data.colors = colorsList.map((color) => color.colorName)
        data.images = imagesList.map( (image) => image.imageFile)

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('type', data.type);
        formData.append('quantity', data.quantity);
        formData.append('colors', data.colors)
    
        data.images.forEach(image => {
            formData.append('images', image)
        });
        setLoading(true)
        // await axios.patch(`http://localhost:3001/admin/product/${params.id}`, formData, {headers}, { timeout: 60000 })
        await API.put(`/admin/product/${params.id}`, formData)
        .then(response => {
            setLoading(false)
          
            changeLocation(response.data.message)
            // notify(response.data.message, "Success")
       
            // setTimeout( () => {
            //     navigate("/admin/allproducts")
            // }, 6000)
    
           

        })
        .catch(error => {
            setLoading(false)
            const message = error.response.data.message
            notify(message, "Error")
        });

    }
        const changeLocation =  async (message) => {
            await notify(message, "Success")
            navigate("/admin/allproducts")
        }
    const notify = async (message, type) => {
        if (type === "Error") {
            toast.error(message);
        } else if (type === "Success") {
            toast.success(message);
        }
    }




    return (
        <>
        {loading ? <Loading2 /> : (
        <div className="flex"  >
            <Navbar />
            <div style={{ flex: 1 }}>
                <Header />
                <div style={{ backgroundColor: '#dadada', paddingInline: "20px" }}>
                    <div className='main-container'>
                    <ToastContainer />
                        <div>
                            <h2 className="text-2xl font-semibold">Product Details</h2>
                            <div>
                                <p>Home &gt; All Products &gt; Edit Product Informations</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="bg-white mt-6 p-6 rounded-2xl flex gap-12">
                            <div className="w-1/2">
                                <div>
                                    <h2 className="mb-4  text-2xl">Product Name</h2>
                                    <input type="text"  className="border text-xl placeholder:text-xl   border-gray-900 border-solid w-full rounded-xl p-4 outline-none" 
                                    placeholder={product.name} {...register("name")} />
                                </div>
                                <div className="mt-6">
                                    <h2 className="mb-4  text-2xl">Select The new category of the product</h2>
                                    <div class="select-menu" onClick={handleSelectClick}>
                                        <div class="select">
                                            <span>{selectedOption}</span>
                                            <i class={`fas ${isOpen ? "fa-angle-up" : "fa-angle-down"} `}></i>
                                        </div>
                                        <div class={`options-list ${isOpen ? "active" : ""}`}>
                                            <div className="option" onClick={(e) => getOption(e)}>Speakers</div>
                                            <div class="option" onClick={(e) => getOption(e)}>Televisions</div>
                                            <div class="option" onClick={(e) => getOption(e)}>Smartphones</div>
                                            <div class="option" onClick={(e) => getOption(e)}>Tablets</div>
                                            <div class="option" onClick={(e) => getOption(e)}>Watches</div>
                                            <div class="option" onClick={(e) => getOption(e)}>laptops</div>
                                            <div class="option" onClick={(e) => getOption(e)}>accessories</div>
                                            <div class="option" onClick={(e) => getOption(e)}>computers</div>
                                            <div className="option" onClick={(e) => getOption(e)}>gaming</div>
                                            <div className="option" onClick={(e) => getOption(e)}>audio</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h2 className="mb-4  text-2xl">Stock Quantity</h2>
                                    <input type="text" className="border text-xl  placeholder:text-xl    border-gray-900 border-solid w-full rounded-xl p-4 outline-none"
                                     placeholder={product.quantity} {...register("quantity")} />
                                </div>


                                <div className="mt-6">
                                    <h2 className="mb-4  text-2xl">Product Price</h2>
                                    <input type="number" step="0.01" className=" text-xl border  placeholder:text-lg  border-gray-900 border-solid w-full rounded-xl p-4 outline-none"
                                        placeholder={product.price} {...register("price")} />
                                </div>
                            </div>
                            <div className="w-1/2" >
                                <h2 className="mb-4  text-2xl">Add Colors</h2>
                                <div className="flex gap-4">
                                    <input onChange={handleChange} value={inputValue} type="text" className="border border-black p-4 rounded-lg " />
                                    <div onClick={addColor} className="bg-blueColor w-fit py-4 px-4 text-white font-semibold text-center
                                    rounded-lg hover:cursor-pointer ">Add a Color</div>
                                </div>
                                <div className='flex gap-2'>
                                    {colorsList.map((color, index) => {
                                        return <Color key={index} colorName={color.colorName} id={color.id} deleteColor={deleteColor} />
                                    })}
                                </div>
                                <div className="mt-6">
                                    <h2 className="mb-4 text-2xl">The Images of the Product here</h2>
                                    <button type="button" className="w-fit p-3 hover:cursor-pointer bg-blueColor text-white font-semibold text-center rounded-lg border-none"
                                        onClick={() => fileInputRef.current.click()} {...register("file") } >upload pictures</button>
                                    <input multiple accept="image/*" type="file" tabIndex={-1} className="hidden" ref={fileInputRef}
                                        onChange={handleImage} />
                                    <p>{errors.file?.message}</p>
                                    <div className='flex gap-4 flex-wrap'>

                                        {imagesList.map((image, index) => {
                                            var index = imagesList.indexOf(image)
                                            return <Image key={index} imageName={image.imageFile.name} id={index} imageUrl={image.link}  deleteImage={deleteImage} />

                                        })}
                                    </div>
                                </div>
                                <div className="mt-5 flex justify-end gap-4">
                                    <button type="submit" className="bg-blackColor text-white rounded-lg py-2 px-4 hover:cursor-pointer hover:border-none w-40">Update Product</button>
                                    <button className="bg-red-600 text-white rounded-lg py-2 px-4 hover:cursor-pointer hover:border-none w-36" 
                                    onClick={ () => {
                                        navigate(`/admin/product/${params.id}`)
                                    }}>Cancel</button>
                                </div>

                            </div>


                        </div>
                        </form>
               
                    </div>
                 
                </div>
             
            </div>
            
        </div>
           
        )}
        </>
    )

}