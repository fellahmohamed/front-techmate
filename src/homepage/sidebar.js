import './App.css';

import speakers from './sideicons/speaker.svg'
import Televisions from './sideicons/tv.svg'
import Phone from './sideicons/phone_iphone.svg'
import tablet from './sideicons/tablet_mac.svg'
import watch from './sideicons/watch.svg'
import laptop from './sideicons/laptop_chromebook.svg'
import mouse from './sideicons/mouse.svg'
import desktop from './sideicons/desktop_mac.svg'
import game from './sideicons/videogame_asset.svg'
import audio from './sideicons/audiotrack.svg'
import { useState } from 'react';
  


export default function Sidebar({handleclick}){

  // let [a,seta]= useState("");

    return(<>
     <div className="container2">
        <div className="innercontainer2">
        <div className="element2 clickable" onClick={()=> handleclick("Speakers")}>
           <div className="innerelem2">
          <img src={speakers} alt="icon"></img>
            <p className="name2">Speakers</p>
            <i className="fa-solid fa-angle-right icon2"></i>
            
        </div> 
        </div> 
        <div className="element2 clickable" onClick={()=>handleclick("Televisions")}>
           <div className="innerelem2">
          <img src={Televisions} alt="icon"></img>
            <p className="name2">Televisions</p>
            <i className="fa-solid fa-angle-right icon2"></i>
            
        </div> 
        </div> 
        <div className="element2 clickable" onClick={()=>handleclick("Smartphones")}>
           <div className="innerelem2">
          <img src={Phone} className="ab" alt="icon"></img>
            <p className="name2">Smartphones</p>
            <i className="fa-solid fa-angle-right icon2"></i>
            
        </div> 
        </div> 
        <div className="element2 clickable" onClick={()=>handleclick("Tablets")}>
           <div className="innerelem2">
          <img src={tablet} className="ab" alt="icon"></img>
            <p className="name2">Tablets</p>
            <i className="fa-solid fa-angle-right icon2"></i>
            
        </div> 
        </div> 
        <div className="element2 clickable" onClick={()=>handleclick("Watches")}>
           <div className="innerelem2">
          <img src={watch} className="ab" alt="icon"></img>
            <p className="name2">Watches</p>
            <i className="fa-solid fa-angle-right icon2"></i>
            
        </div> 
        </div> 
        <div className="element2 clickable" onClick={()=>handleclick("laptops")}>
           <div className="innerelem2">
          <img src={laptop} className="ab" alt="icon"></img>
            <p className="name2">laptops</p>
            <i className="fa-solid fa-angle-right icon2"></i>
            
        </div> 
        </div>
        <div className="element2 clickable" onClick={()=>handleclick("accessories")}>
           <div className="innerelem2">
          <img src={mouse} className="ab" alt="icon"></img>
            <p className="name2">accessories</p>
            <i className="fa-solid fa-angle-right icon2"></i>
            
        </div> 
        </div>
        <div className="element2 clickable" onClick={()=>handleclick("computers")}>
           <div className="innerelem2">
          <img src={desktop} className="ab" alt="icon"></img>
            <p className="name2">computers</p>
            <i className="fa-solid fa-angle-right icon2"></i>
            
        </div> 
        </div>
        <div className="element2 clickable" onClick={()=>handleclick("gaming")}>
           <div className="innerelem2">
          <img src={game} className="ab" alt="icon"></img>
            <p className="name2">gaming</p>
            <i className="fa-solid fa-angle-right icon2"></i>
            
        </div> 
        </div>

        <div className="element2 clickable" onClick={()=>handleclick("audio")}>
           <div className="innerelem2">
          <img src={audio} className="ab" alt="icon"></img>
            <p className="name2">audio</p>
            <i className="fa-solid fa-angle-right icon2"></i>
            
        </div> 
        </div>


        </div>  
    </div></>);
}