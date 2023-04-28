import { useParams } from "react-router-dom"


export const ProductDetails = () => {
    const params = useParams()
    console.log(params.id)

    return (
        <div>the product is here</div>
    )
}