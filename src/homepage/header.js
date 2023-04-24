import './App.css';
import logos from './sideicons/logo.svg'
import { Link ,useNavigate } from "react-router-dom";

export default function Header({handleclick}){
  let navigate = useNavigate();

    return(
  <header >
    <div className="inner">
    <div className="logo clickable" onClick={()=>{handleclick("main")}}><img src={logos} alt="logo" width="150px"></img></div>
    <div className="menu">
        
        <div className="a">Today's deals <i className="fa-solid fa-angle-down b"></i> </div>
        <div className="a">Best sellers <i className="fa-solid fa-angle-down b"></i> </div>
        <div className="a">Customer service</div>
        <div className="a">New releases</div>
    </div>
<div className="right">
    <div  className="searchbar">
        
    
        <i className="fa-solid fa-magnifying-glass icon clickable"></i>
        <input className="Search" placeholder="Search goods..."/>
    </div>
<div className="clickable" onClick={()=>navigate('/login')}><i className="fa-solid fa-user"></i> &nbsp;&nbsp;&nbsp;Account</div>
<div className="clickable"><i className="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp; Bag</div>
</div>
    </div>
   </header>
    );
}