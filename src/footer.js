import logo from './sideicons/logo.svg'
import bytes from './sideicons/Group2.svg'
export default function Footer(){
return(<footer >
    <div className="footer">
<div className="column">
    <img src={logo} alt="logo" width="150px"></img>
    <h3>about us</h3>
    <p>Techmate is an electronics and technology E-Commerce company that provides users with a seamless experience.</p>
</div>
<div className="column">
    
    <h3>Contact Information</h3>
    <p>Adress : ESi-SBA Sidi-Belabbes ALGERIA</p>
    <p>Phone number : 0797932323</p>
    <p>Email address : techmate.store.dz@gmail.com</p>
</div>
<div className="column">
    <h3>Fast links</h3>
    <p className="clickable">Home</p>
    <p className="clickable">Featured products</p>
    <p className="clickable">Profile</p>
    <p className="clickable">Bag</p>
</div>
<div className="column">
    <h3>Join our Newsletter</h3>
    <p>By joining our newsletter you will receive updates and offers directly to your personal email inbox .</p>
    <div  className="searchbar abcd" >
        <button className='join'><b>Join</b></button>
        <input className="footSearch" placeholder=" Your Email Address...."/>
    </div>
</div>
</div>
<hr className='line'></hr>
<div className="copyright">copyright©2023 all rights reserved | Built BY BYTEBUILDERS &nbsp;&nbsp; <img src={bytes} alt="bytebuilderslogo" height="15px"></img></div>
</footer>);

}