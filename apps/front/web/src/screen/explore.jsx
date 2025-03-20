import { StatsCard } from "../components/statsCard";
import { Navbar } from "../components/navbar";
import { useWebsites } from "../hook/useWebsite"
import { Card } from "../components/processCard";

export const Explore=()=>{

    const website=useWebsites();

    return <div className="h-screen w-full bg-[#111827]">
             <Navbar/>
              
              <div className="flex gap-8 w-full items-center justify-center">
             <StatsCard/>
             <StatsCard/>
             <StatsCard/>
            
              </div>

              <div className="flex gap-8 w-full items-center justify-center">
                <Card/>
                <Card/>
                <Card/>
              </div>
    </div>
}