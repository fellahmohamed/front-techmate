
import { Navigate, Outlet } from "react-router-dom"
import { getRoles } from "../../utils"

export const SuperManagerMiddleware = () => {
    
    const hasAccess = getRoles().find( (role) => {
        return  role === "superAdmin"
    })
    console.log(hasAccess)
    if (!hasAccess) {
        return <Navigate to={"/admin"} state={{message: 'Not Allowed'}} />
    }
    return (
        <Outlet />
    )
  
}