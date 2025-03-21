import { useState } from "react";
import { Globe, Plus } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const InputBox=()=>{

         const [url, setUrl] = useState("");
         const navigate=useNavigate();

         
const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("inside web input");
    
 const resp= await axios.post("http://localhost:3000/api/v1/website",{
        WebsiteUrl:url
    },{withCredentials:true})
    if(resp.data.message==="unauths"){
     alert("You're Not loggedIn");
     return;
    } else{
        navigate("/explore")
        console.log("website id",resp);
    }

    setUrl("");
  };
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-blue-400" />
        <h1 className="text-lg font-semibold text-white">Add Site</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-3 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
          <button
            type="submit"
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </form>

      <p className="mt-3 text-xs text-gray-400 text-center">
        Include http:// or https:// in the URL
      </p>
    </div>
  </div>
}