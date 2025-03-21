import axios from "axios";
import { useEffect, useState } from "react"


export const useWebsites=()=>{
    const [websites,setwebsites]=useState([]);


   async function refreshWebsites(){
      const resp=await axios.get("http://localhost:3000/api/v1/userwebsites",{withCredentials:true});
      setwebsites(resp.data.websites);
    }

    useEffect(()=>{
       refreshWebsites();

       const interval=setInterval(()=>{
        refreshWebsites();
       },1000*60*1)

       return ()=> clearInterval(interval);
    },[])
    
    return {websites,refreshWebsites};
}