import '../css/admin.css'


export const Header = () => {
    return(
        <div className='head-container'>
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-bell"></i>
            <div className='admin-box'>
                admin 
                <i class="fa-solid fa-angle-down"></i>

            </div>
        </div>
    )
}