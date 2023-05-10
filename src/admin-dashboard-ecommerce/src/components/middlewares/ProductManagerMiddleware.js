
import { Navigate, Outlet } from "react-router-dom"
import { getRoles } from "../../utils"

export const ProductManagerMiddleware = () => {
    
    const hasAccess = getRoles().find( (role) => {
        return role === "product management" || role === "superAdmin"
    })
    console.log(hasAccess)
    if (!hasAccess) {
        return <Navigate to={"/admin"} state={{message: 'Not Allowed'}} />
    }
    return (
        <Outlet />
    )
  
}