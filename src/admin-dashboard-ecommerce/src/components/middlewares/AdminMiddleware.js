
import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom"


export const AdminMiddleware = () => {
    const isAdmin = localStorage.getItem("admin")


    if (!isAdmin) {
        return <Navigate to={"/"} state={{message: 'Not Allowed! Only Admins'}} />
    }
    return (
        <Outlet />
    )
  
}