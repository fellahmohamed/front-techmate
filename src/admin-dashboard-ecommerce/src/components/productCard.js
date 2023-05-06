import productImage from '../images/phone.png' 
import {Link} from 'react-router-dom'
export const ProductCard = ({product}) => {


    return(
        <div className='bg-whiteColor  rounded-2xl'>
            <div className='p-4 gap-4 flex flex-col items-start justify-center '>
            <div className='flex gap-3 w-full items-center justify-between'>
            <div className='relative h-28'>
                <img src={product.imageUrl[0]} alt="the image sample" className='  w-full h-full roubnded-lg object-contain '  />
            </div>
            <div>
                <h6 className='font-semibold text-blackColor'>{product.name}</h6>
                <p className=' opacity-60 '>{product.type}</p>
                <p className='font-semibold text-blackColor'>${product.price}</p>
            </div>
            <Link to={`/admin/product/${product._id}`}>
            <button className="flex bg-blueColor rounded-lg hover:cursor-pointer px-1 py-1 text-white outline-none border-none">View Details</button>
            </Link>
            </div>
            <div className='flex flex-col w-full rounded-2xl p-4 border border-solid border-gray-300'>
                <div className='flex justify-between '>
                    <p>Sales</p>
                    <p className='opacity-60'>{product.sales}</p>
                    
                </div>
                <div className='h-px w-full bg-blackColor opacity-20 my-2'></div>
                <div className='flex  justify-between'>
                    <p>Remaining Products</p>
                    <p className='opacity-60'>{product.quantity}</p>
                </div>
            </div>
        </div>
        </div>
    )
}