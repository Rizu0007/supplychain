import React , {useState , useEffect, useContext} from "react";
import { TrackingContext } from "@/Context/Tracking";

import Nav1 from './SVG/Nav1';
import Nav2 from './SVG/Nav2';
import Nav3 from './SVG/Nav3';

const NavBar = () => {


  const [state , setState]=useState(false)
  const {currentUser , setCurrentUser}=useContext(TrackingContext);

  const navigation=[
    {title :"HOME", path:"#"},
    {title :"Services", path:"#"},
    {title :"Contact US", path:"#"},
    {title :"ERC20", path:"#"},
  ];

  useEffect(()=>{
    document.onclick=(e)=>{
      const target=e.target;
      if(!target.closest(".menu-btn")) setState(false);

    }
  }, [])
  return <div>
  
  <nav className={`bg-white pb-5 md:text-sm ${
    state
    ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:max-2 md:mt-0"

    :""

  }`}>
  <div className= "gap-x-14 items-center-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">

  <div className=" flex items-start justify-between py-5 md:block">
  
  <a href="javascript:void(0)">
  <img
  src="logo"
  alt="logo"
  width={120}
  height={50}
  />
  
  </a>


  <div className="md:hidden">
  <button
  className="menu-btn text-gray-600 hover:text-gray-900"
  onclick={()=>{
    setState(!state)
  }}
  >
  {state ? <Nav1/> : <Nav2/> }
  </button>
  </div>
  </div>

  <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
    state ? "block" :"hidden"}  `}>

    <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
    {navigation.map((item , idx)=>{
      return(
        <li key={idx} className="text-gray-700 hover:text-gray-900">
        <a href={item.path} className="block">
        
        {item.title}
        </a>
        
        </li>
      )
    })}
    
    </ul>



    <div className=" flex-1 gap-x-6  items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0 ">

    {currentUser ?(
    <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-700 hover:bg-gray-600 rounded-full  md:inline-flex">
    {currentUser.slice(0,20)}..

    
    </p>

    ):(
      <button
      onclick={()=>connectWallet()}
      className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-700 hover:bg-gray-600 rounded-full  md:inline-flex"
      >
      
  Connect Wallet
  <Nav3/>
      </button>
    )}
    
    
    
    </div>
    
    </div>
  </div>
  
  </nav>
  </div>;
};

export default NavBar;
