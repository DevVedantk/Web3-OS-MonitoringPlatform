import { Link, useNavigate } from "react-router-dom"
import Squares from "../components/Squares"
import axios from "axios"
import { useEffect, useState } from "react"

export const Home=()=>{
    const navigate=useNavigate();
    const [auths,setauths]=useState(false);

    const handlelogout=async()=>{
       const resp=await axios.post("http://localhost:3000/api/v1/user/logout",{},{withCredentials:true});
         if(resp.data.message==="logout"){
            navigate("/signin");
         }
    }

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/auths",{withCredentials:true}).then((resp)=>{
            if(resp.data.message==="authenticated"){
                setauths(true)
            } 
        }) 
    },[])

    
    return  <div className="h-screen w-full bg-black relative">
    {/* Background Animation */}
    <div className="absolute h-screen w-full z-[3]">
      <Squares
        speed={0.3} 
        squareSize={40}
        direction='down' // up, down, left, right, diagonal
        borderColor='#222222'
        hoverFillColor='#222'
      />
    </div>

    {/* Foreground Content */}
    <div className="relative text-white flex flex-col h-full pb-32">
      <div className="z-10 relative justify-end border-b-1 border-[#A1A1AA] list-none gap-8 items-center h-20 w-full flex">
      <div className="mr-64 z-10 flex gap-8 uppercase font-medium">
      <li className="cursor-pointer"><Link to="/"/>Home</li>
     { auths? <li  onClick={handlelogout} className="font-semibold cursor-pointer">LOGOUT</li>
      : <li onClick={()=> navigate("/signup")} className="font-semibold cursor-pointer"><Link to="/signup"/>SIGNUP</li>}
      <li onClick={()=> navigate("/explore")} className="cursor-pointer"> <Link to="/explore"/>EXPLORE</li>
      <li onClick={()=> navigate("/vm")} className="cursor-pointer"> <Link to="/vm"/>VMs</li>
       
      </div>
      </div>

      <div className="relative z-10 h-screen w-full flex-col flex items-center justify-center">
    <div className="relative text-white flex items-center justify-center">
     <h1 className="uppercase text-7xl font-bold z-10">
    WEB3 based OS Monitoring
      </h1> 
    </div>
      <div className="relative text-white flex items-center justify-center">
    <h1 className="uppercase text-7xl font-bold z-10">
      In Real Time
    </h1>
      </div>
        
        <div className="realtive z-10 mt-4 flex flex-col items-center justify-center">
      <h1 className="realtive text-[#A1A1AA] font-bold z-10">Know the usage of your All Processes,HardDisk,Memory Usage ,CPU Usage,website status in Real Time✅</h1>
      <h1 className="realtive text-[#A1A1AA] font-bold z-10">Get statistics of your Machine ⚙</h1>
    </div>

      <div className="mt-8">
        <button className=" cursor-pointer rounded-xl h-10 w-32 border-2 border-blue-900 z-10 relative font-bold bg-[#599CF7]">Try it Free</button>
      </div>
      </div>
        </div>
  </div>
}