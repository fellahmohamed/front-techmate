import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Navbar } from "../components/navbar.js"
import { Header } from "../components/header.js"
import Cookies from "js-cookie"
import { yupResolver } from '@hookform/resolvers/yup'
import { Color } from "../components/Color.js"
import axios from "axios"
import { Image } from "../components/Image.js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loading1, Loading2 } from "../components/loading.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import '../components/css/selectmenu.css'
import { useEffect } from "react"
import API from "../../../API.js"
// import { headers } from "./adminDashboard.js"

export const CreateProduct = () => {
    const [colorsList, setColorsList] = useState([])
    const cookieValue = Cookies.get('access_token');

    const [inputValue, setInputValue] = useState("")
    const [isImages, setIsImages] = useState(false)
    const [imagesList, setImagesList] = useState([])
    const [newColor, setNewColor] = useState("")
    // const cookieValue = Cookies.get('accUploadUploadess_token');
    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Barear ${cookieValue}`
    }

    const fileInputRef = useRef(null)

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const shema = yup.object().shape({
        name: yup.string().min(4).required("You must add the name of the product"),
        price: yup.number().positive().required('Price is required'),
        quantity: yup.number().integer().positive().min(1).required("You must add the Stock Quantity"),
        file: yup.mixed().test("min", "upload one image at least to create the product and the max number of images is 6", () => {
            if (imagesList.length >= 1 && imagesList.length <= 6) {
                setIsImages(false)
                return true

            } else {
                setIsImages(true)
                return false
            }
        })
    })
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(shema)
    })

    const onSubmit = (data) => {
        data.type = selectedOption
        data.colors = colorsList.map((color) => color.colorName)
        data.images = imagesList
        console.log("the sent data is", data)
        CreateProduct(data)


    }

    const CreateProduct = (data) => {
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
        // axios.post("http://localhost:3001/admin/product", formData, { headers }, { timeout: 60000 })
        API.post("/admin/product", formData)
            .then(response => {
                setLoading(false)
                const message = response.data.message
                notify(message, "Success")
                reset()
                setColorsList([])
                setImagesList([])

            })
            .catch(error => {
                setLoading(false)
                const message = error.response.data.message
                notify(message, "Error")
            });


    }



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
            }               // const message = response.data.message
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
        const selectedFiles = e.target.files;

        console.log(selectedFiles)
        setImagesList([...imagesList, ...selectedFiles])
    }

    // to testify notfication function
    const notify = (message, type) => {
        if (type === "Error") {
            toast.error(message);
        } else if (type === "Success") {
            toast.success(message);
        }
    }
    //******************select menu code  */
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Smartphones");

    const handleSelectClick = () => {
        setIsOpen((prev) => !prev);
    };

    const getOption = (e) => {
        setSelectedOption(e.target.innerHTML);
        setIsOpen(true);
    };





    return (
        <>
            {loading ? <Loading2 /> : (
                <div className="flex"  >
                    <Navbar />
                    <div style={{ flex: 1 }}>
                        <Header />
                        <div style={{ backgroundColor: '#dadada', paddingInline: "20px" }}>
                            <div className='main-container'>
                                <div>
                                    <h2 className="text-2xl font-semibold">Product Details</h2>
                                    <div>
                                        <p>Home &gt; All Products &gt; Add New Product</p>
                                    </div>
                                </div>
                                <div className="prod-container">
                                    <div className="form-container">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <h4>Product Name</h4>
                                            <input type="text" placeholder='Lenovo ThinkPad' {...register("name")} />
                                            <p>{errors.name?.message}</p>
                                            <h4>Price of the Product</h4>
                                            <input type="number" step="0.01" placeholder='the price' {...register("price")} />
                                            <p>{errors.price?.message}</p>
                                            <h4>Select a Category</h4>
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

                                            {/* <input type="text" placeholder='It has to be one of the listed Categories' {...register("type")} /> */}
                                            {/* <p>{errors.type?.message}</p> */}
                                            <h4>Stock Quantity</h4>
                                            <input type="number" placeholder='How much we have?' {...register("quantity")} />
                                            <p>{errors.quantity?.message}</p>
                                            <h4>Colors</h4>
                                            {/* the colors section */}
                                            <div className="addColor">
                                                <input onChange={handleChange} value={inputValue} type="text" />
                                                <div onClick={addColor} id="addColor">Add Colors</div>
                                            </div>
                                            <div className='ColorsList'>
                                                {colorsList.map((color, index) => {
                                                    return <Color key={index} colorName={color.colorName} id={color.id} deleteColor={deleteColor} />
                                                })}
                                            </div>
                                            <h4>Upload The Photos of the Product here</h4>

                                            <button type="button" className="upload-imgs" onClick={() => fileInputRef.current.click()} {...register("file")} >upload pictures</button>
                                            <input multiple accept="image/*" type="file" tabIndex={-1} className="hiddenInput" ref={fileInputRef}
                                                onChange={handleImage} />
                                            <p>{errors.file?.message}</p>
                                            <div className='ImagesList'>
                                                {imagesList.map((image, index) => {
                                                    var index = imagesList.indexOf(image)
                                                    return <Image key={index} imageName={image.name} id={index} deleteImage={deleteImage} />
                                                })}
                                            </div>


                                            <div className="btns">
                                                <button id="u-btn">Upload Product</button>
                                                <button type="button" id="c-btn" onClick={() => {
                                                    navigate('/admin/allproducts')
                                                }}>Cancel</button>
                                            </div>

                                        </form>

                                    </div>




                                </div>

                            </div>

                        </div>
                    </div>
                    </div>
   
            )}

                </>


            )


            }