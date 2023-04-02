import Product from "./Product"
async function getImageUrl() {
  const response = await fetch("http://localhost:3001/products");
  const jsonData = await response.json();
  return jsonData.products[0].imageUrl[1];
}

const img = document.createElement("img");
getImageUrl().then(url => {
  img.src = url;
});
export default function Main(){
  

    return(<>
    <div className="main">
      <div className="sectiontitle">
        <h1>Featured Products</h1>
        <button className="signup">Sign up</button>
      </div>
      <div className="hero">
        <div className="firsthero"></div>         
        <div className="firsthero">
        <div className="airpodsimg"></div>
          
         
        </div>
        
        <div className="secondhero"></div>
        <div className="secondhero"></div>

        <div className="secondhero"></div>
        
        
        
      </div>
      <div className="productcontainer">
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />

      </div>
    </div>  
    </>)
}