import { createContext } from "react";


const ProductDeletedContext = createContext()


const UseProductDeletedContextProvider = ({children}) => {
    return (
        <ProductDeletedContext.Provider value={false}>
                {children}
        </ProductDeletedContext.Provider>

    )
}
export {ProductDeletedContext, UseProductDeletedContextProvider} 