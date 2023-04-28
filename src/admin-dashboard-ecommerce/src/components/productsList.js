import { ProductCard } from "./productCard";
import { PaginateCompenent } from "./pagination"

export const ProductsList = ({products, getPage, pageCount,pageIndex}) => {
    const subset = []

    for (let i = pageIndex;( i < pageIndex + 9 && products.length) ; i++) {
        subset.push(products[i])
    }
    
    return (
        <>
          {subset.length >= 1 ? (
            subset.map((prod, index) => {
                if (prod ) {
                 return <ProductCard key={index} product={prod} />
                }
           
            })
          ) : (
            <h1>No products found</h1>
          )}
      
        
        </>
      );
    
}