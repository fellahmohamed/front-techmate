import axios from 'axios';
import React, { useEffect, useState } from 'react'
import minus from "../images/icon-minus.svg";
import plus from "../images/icon-plus.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Lightbox from '../components/Lightbox'

function ProductPage({ID}) {
     const id = "644c1252d428fa0417c213a2";
     const [productinfo, setproductinfo] = useState("");
 useEffect(() => {
  axios.get(`http://localhost:3001/products/${id}`, (req,res) => {
    res.json()
  }).then(data => setproductinfo(data.data.product)) 

}, []);

//  console.log(productinfo);
const sortedArray = productinfo?.colors?.sort();
const sortedArrayImag = productinfo?.imageUrl?.sort();
var firstImage = sortedArrayImag?.[0];

const [showLightbox, setShowLightbox] = useState(false);
// console.log(sortedArray);
const [amount, setAmount] = useState(0);
const [value, setValue] = useState(0);

   const [slideIndex, setSlideIndex] = useState(1);
   const nextSlide = () => {
     if (slideIndex !== sortedArrayImag.length) {
       setSlideIndex(slideIndex + 1);
      } else if (slideIndex === sortedArrayImag.length) {
        setSlideIndex(1);
      }
    };
    
    const previousSlide = () => {
     if (slideIndex !== 1) {
       setSlideIndex(slideIndex - 1);
      } else if (slideIndex === 1) {
        setSlideIndex(sortedArrayImag.length);
      }
    };
    
    
    var [Slider, setSlider] = useState(null); 
    console.log("/////////////////////////////----------------ààààà-----");
    //  Slider = sortedArrayImag?.[0];

   console.log(Slider) ;
   var [image, setimage] = useState(null)
   var immage = firstImage
   const handlClick= (index)=>{
     console.log("*/*///**/*/*//");

      var slider = sortedArrayImag?.[index];

    firstImage =sortedArrayImag?.[index] ;
    immage = firstImage;
    setSlider(slider);
    console.log(immage) 

  }
   console.log(sortedArrayImag)
   
  return (
    <>     
    {showLightbox && (
      <Lightbox
        products={sortedArrayImag}
        slideIndex={slideIndex}
        nextSlide={nextSlide}
        previousSlide={previousSlide}
        setShowLightbox={setShowLightbox}
      />
    )}
     <div className='
     max-w-7xl mx-auto grid grid-cols-1 lg:place-items-center lg:grid-cols-2 gap-10 lg:py-20
     '>
          <div className='flex flex-col'>
                    {/* <div className=" text-red-700 ">
                    {sortedArrayImag?.map(item=>{
                    return  <img src={item} alt=""/>
                    })}
               </div> */}
     <div className="lg:hidden">
          {sortedArrayImag?.map((item,index) => (
            <div
              key={index}
               className={slideIndex === index + 1 ? "relative" : "hidden"}
            >
              <img
                src={item}
                alt=""
                className="lg:rounded-2xl cursor-pointer w-full"
                 onClick={() => setShowLightbox(true)}
              />

              <ul className="lg:hidden">
                <li>
                  <button
                     onClick={previousSlide}
                    className="bg-white top-1/2 rounded-full p-5 shadow absolute left-4 -translate-y-1/2"
                  >
                    <FaChevronLeft />
                  </button>
                </li>
                <li>
                  <button
                          onClick={nextSlide}
                    className="bg-white top-1/2 rounded-full p-5 shadow absolute right-4 -translate-y-1/2"
                  >
                    <FaChevronRight />

                  </button>
                </li>
              </ul>
            </div>
          ))}
        </div>
        {/* Math.floor(Math.random() *sortedArrayImag.length) */}
        <div className="lg:flex  hidden
        justify-center
         items-center
         ">
          <img
            src={Slider===null ? sortedArrayImag?.[0] : Slider}
          // src={immage===sortedArrayImag?.[0] ? immage: image }
             //src={slid===sortedArrayImag?.[0] ? sortedArrayImag?.[0] : Slider}
            alt=""
            className="lg:rounded-2xl cursor-pointer max-w-full"
            onClick={() => setShowLightbox(true)}
          />
        </div>
        {sortedArrayImag?.length > 1 &&
        <ul className="hidden lg:flex items-center justify-start gap-5 mt-5 flex-wrap
 
        ">
        {sortedArrayImag?.map((item, index) => (
          <li
            key={item}
            onClick={() =>{ 
            handlClick(index)
            }}
            className={`${
              index === value && "border-2  opacity-80 border-black"
            } border-2 border-transparent rounded-2xl overflow-hidden cursor-pointer`}
          >
            <img src={item} alt="" className="w-20 " />
          </li>
        ))}
      </ul>
        }
        
     </div>
     <div className='w-96 pb-10 flex flex-col justify-start'>
     <h1 className="text-slate-900  font-bold text-3xl lg:text-4xl">
          {productinfo.name}
          </h1>
          <h1 className="text-slate-900 font-bold text-xl lg:text-4xl">
          {productinfo.type}
        </h1>
        <h1 className=" text-red-700 mb-10 font-bold text-lg lg:text-2xl">
          {sortedArray?.map(item=>{
              return  <p key={item}>
                {item}
              </p>
          })}
        </h1>
        <div className=' px-4'>
        <p className="text-slate-600 mb-10 bg-red-700">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
          , culpa. Minus totam nesciunt libero fugiat! Praesent
          ium natus odit ea, omnis maxime possimus, eveniet exer
          citationem doloribus in nesciunt iure veritatis sed.
        </p>
        </div>
        <h1 className='text-slate-900 font-bold text-2xl'>
          ${productinfo.price}
        </h1>
        <div className="lg:flex items-center justify-between gap-2 mt-10">
          <ul className="flex items-center justify-between bg-slate-100 py-2 px-4 rounded lg:flex-1 shadow">
            <li onClick={()=>{
               setAmount(amount - 1);
               if (amount <= 0) setAmount(0);
            }} className="cursor-pointer">
              <img src={minus} alt="" />
            </li>
            <li className='font-bold text-xl'>{amount}</li>
            <li
              onClick={() => {setAmount(amount + 1)
               if(amount>=productinfo.quantity){
                    setAmount(productinfo.quantity)
               }
          }}
              className="cursor-pointer"
            >
              
              <img src={plus} alt="" />
            </li>
          </ul>

          <div className="lg:flex-1 group">
            <button className="flex items-center justify-center gap-4 outline-none bg-black py-2 px-4 text-white font-bold
             rounded-lg shadow mt-5 w-full hover:bg-white hover:text-black
            hover:outline-none hover:border-none
            transition-all duration-200 lg:mt-0">
              <AiOutlineShoppingCart className="text-2xl text-white group-hover:text-black" />
              Add to Cart
            </button>
          </div>
     </div>
     </div>
 
        </div>
    </>
  )
}

export default ProductPage