import { Activity } from "lucide-react";
import { useNavigate } from "react-router-dom"

export const Navbar=()=>{
    const navigate=useNavigate();
    return <div className="h-16 w-full border-b-[#374151] flex items-center justify-between bg-[#1F2937]">
             
             <div className="flex ml-32 items-center">
            <Activity className="h-8 mr-2 w-8 text-indigo-400" />
            <h1 className="font-bold text-white text-3xl">Process Monitor</h1>
             </div>
            <div className="mr-16 gap-2 flex">
            <button onClick={()=>navigate("/")} className="h-10 cursor-pointer rounded w-32 font-bold text-white bg-[#6366F1]">Go Back</button>
            <button  onClick={()=>navigate("/upload")} className="h-10 cursor-pointer rounded w-32 font-bold text-white bg-[#6366F1]">Add Website</button>
            </div>
        
    </div>
}