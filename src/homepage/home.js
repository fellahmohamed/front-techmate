import Product from "./Product";
import {useState , useEffect } from 'react'
import airpods from './sideicons/airpods-removebg-preview.png'
import ipads from './sideicons/ipads.png'
import controller from './sideicons/controller.png'
import samsung from './sideicons/samsung.png'
import macbook from './sideicons/macbook.png'
import { Link ,useNavigate } from "react-router-dom";


export default function Main({page}) {
  let [dataTable, setDataTable] = useState([]);
  let [isLoading , setLoading]= useState(true);
  let navigate = useNavigate();
  
  let productlist =(page)=> dataTable.products.filter((product,index) => {return product.type === page}).map((product) =>{
    return (
        <Product
    key = {product.id}
    imagesrc = {product.imageUrl[0] }
    name = {product.name}
    price = {product.price}
    type={product.type}
  />)
   })
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {setDataTable(data); setLoading(false)});
     
  }, [page]);
  
  if (isLoading) {
   console.log("loading")
    return <div>Loading...</div>;
  }
 
   
else if (page ==="main" ){
// console.log(dataTable.products)

  return (
    <>
      <div className="main">
        <div className="sectiontitle">
          <h1>Featured Products</h1>
          <button className="signup"  onClick={()=>navigate('/register')}>Sign up</button>
        </div>
        <div className="hero">
          <div className="firsthero2">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <h2>The new Ipad pro</h2>
            <img src={ipads} alt="ipads"></img>
          </div>
          <div className="firsthero">
           
            <div className="airpodimg"> <img src={airpods}></img> </div>
            <div className="detailsairpods">

              <h2>AirPods pro</h2>
              <div>Magic like you've never heard.</div>
              <div><span >Learn more</span>  <span>&nbsp;&nbsp;&nbsp;buy</span></div>

            </div>
          </div>
          <div className="secondhero secondhero3"><h2>The new macbook</h2> <div className="macbook"><img src={macbook} height="170px"></img></div>   </div>
          <div className="secondhero secondhero2"> <h2>Sony PS5 controller</h2><div className="cercle"></div><img src={controller} height="200px"></img> </div>
          <div className="secondhero secondhero3"><h2>Samsung smart watch</h2> <img src={samsung} height="200px"></img> </div>
        </div>
        <div className="sectiontitle">
          <h1>Our Latest Products</h1>
          
        </div>
        <div className="productcontainer">
           {dataTable.products.filter((product,index) => {return index <= 7}).map( (product) =>{
            return (
                <Product
            key = {product.id}
            imagesrc = {product.imageUrl[0] }
            name = {product.name}
            price = {product.price}
            type={product.type}
          />)
           })}
   

        </div>
      </div>
    </>
  );
}
else  {return( <>
<div className="main"><div className="sectiontitle">
<h2>Main - {page}</h2>

</div>
<div className="productcontainer">
 {productlist(page).length !== 0 ? productlist(page) : <div>no products of {page}</div> 
 }
  
</div></div></>
)}
}