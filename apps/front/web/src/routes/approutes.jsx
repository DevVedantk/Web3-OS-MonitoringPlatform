import { Route, Routes } from "react-router-dom"
import { Home } from "../screen/home"
import { Explore } from "../screen/explore"
import { SignIn } from "../screen/signin"
import { SignUp } from "../screen/signup"
import { InputBox } from "../components/inputbox"
import { VM } from "../screen/vm"

export const AppRoutes=()=>{


    return  <div>

     <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/explore" element={<Explore/>}/>
     <Route path="/signin" element={<SignIn/>}/>
     <Route path="/signup" element={<SignUp/>}/>
     <Route path="/upload" element={<InputBox/>}/>
     <Route path="/vm" element={<VM/>}/>
     <Route/>
    </Routes>
    </div>
}