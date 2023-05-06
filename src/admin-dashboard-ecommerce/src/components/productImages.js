

export const ProductImage = ({imageLink}) => {
    return (
        <div className="rounded-2xl  bg-gray-100 h-80 ">
        <img src={imageLink} alt="the product images" className="w-full h-full   object-contain  hover:scale-110 duration-300 hover:rotate-3 " />
    </div>
    )

}