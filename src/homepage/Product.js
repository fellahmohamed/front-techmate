export default function Product({imagesrc,type,price,name}){
   
    return(
        <div className="product">
         <Image imagesrc={imagesrc} />
        <div className="productdetails">
        <div className="producttype">{type}</div>
        <div className="productname">{name}</div>
        <div className="price">${price} </div>
        
        </div>
        </div>
    );
}
export function Image({imagesrc}){
    if (typeof imagesrc === "undefined" ){
    return(<div className="productdetails">No image uploaded</div>);
    }
    else return(<div className="productimage"><img src={imagesrc} alt={"image"} ></img></div> );
}