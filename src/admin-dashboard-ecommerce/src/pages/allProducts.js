import { Navbar } from "../components/navbar"
import { AdminDashboard } from "./adminDashboard"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
export const AllProducts = () => {
        
    return (
        <div style={{display: 'flex' }}  >
        <Navbar/>
        <div style={{flex: 1}}>
          <Header />
          <div style={{backgroundColor: '#dadada', paddingInline: "20px"}}>
            <AdminDashboard/>
          <Footer />
          </div>
        </div>
      </div>
    )
}