
import { Navbar } from "../components/navbar"
import { Header } from "../components/header"
export const AllOrders = () => {
    

    return(
        <div className="flex"  >
        <Navbar />
        <div style={{ flex: 1 }}>
            <Header />
            <div style={{ backgroundColor: '#dadada', paddingInline: "20px" }}>
                <div className='main-container'>
            
                    <div>
                        <h2 className="text-2xl font-semibold">Product Details</h2>
                        <div>
                            <p>Home &gt; All Orders </p>
                        </div>
                    </div>
                    <div>
                        {/* start your code here */}
                    </div>
                    
        </div>
        </div>
        </div>
                    </div>
    )
}