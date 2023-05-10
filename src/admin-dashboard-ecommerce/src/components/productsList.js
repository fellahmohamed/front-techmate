import { ProductCard } from "./productCard";
import { PaginateCompenent } from "./pagination"
import { Loading2 } from "../components/loading"
import { useEffect } from "react";
export const ProductsList = ({products,pageIndex, }) => {
    const subset = []
  
    for (let i = pageIndex;( i < pageIndex + 9 && products.length) ; i++) {
        subset.push(products[i])
    }
  
 
    return (
        <>
          {subset.length >= 1 ? (
            subset.map((prod, index) => {
                if (prod ) {
                 return <ProductCard key={index} product={prod}  />
                }
           
            })
          ) : (
            <Loading2/>
          )}
      
        
        </>
      );
    
}