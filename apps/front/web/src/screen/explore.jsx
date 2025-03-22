import { StatsCard } from "../components/statsCard";
import { Navbar } from "../components/navbar";
import { useWebsites } from "../hook/useWebsite"
import { Card } from "../components/processCard";
import { useMemo } from "react";

export const Explore=()=>{

    const [website,refreshWebsites]=useWebsites();

    console.log("sites are :",website);


    const processedWebsites = useMemo(() => {
      return website.map(website => {
        // Sort ticks by creation time
        const sortedTicks = [...website.websiteTick].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
  
        // Get the most recent 30 minutes of ticks
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        const recentTicks = sortedTicks.filter(tick => 
          new Date(tick.createdAt) > thirtyMinutesAgo
        );
  
        // Aggregate ticks into 3-minute windows (10 windows total)
        const windows=[];
  
        for (let i = 0; i < 10; i++) {
          const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000);
          const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000);
          
          const windowTicks = recentTicks.filter(tick => {
            const tickTime = new Date(tick.createdAt);
            return tickTime >= windowStart && tickTime < windowEnd;
          });
  
          // Window is considered up if majority of ticks are up
          const upTicks = windowTicks.filter(tick => tick.status === 'Good').length;
          windows[9 - i] = windowTicks.length === 0 ? "unknown" : (upTicks / windowTicks.length) >= 0.5 ? "good" : "bad";
        }
  
        // Calculate overall status and uptime percentage
        const totalTicks = sortedTicks.length;
        const upTicks = sortedTicks.filter(tick => tick.status === 'Good').length;
        const uptimePercentage = totalTicks === 0 ? 100 : (upTicks / totalTicks) * 100;
  
        // Get the most recent status
        const currentStatus = windows[windows.length - 1];
  
        // Format the last checked time
        const lastChecked = sortedTicks[0]
          ? new Date(sortedTicks[0].createdAt).toLocaleTimeString()
          : 'Never';
  
        return {
          id: website.id,
          url: website.url,
          status: currentStatus,
          uptimePercentage,
          lastChecked,
          uptimeTicks: windows,
        };
      });
    }, [website]);
  

    return <div className="h-screen w-full bg-[#111827]">
             <Navbar/>
              
              <div className="flex gap-8 w-full items-center justify-center">
             <StatsCard/>
             <StatsCard/>
             <StatsCard/>
            
              </div>

             <div className="w-full ml-0.4 flex justify-center">
             <div className="flex gap-8 w-8/10 flex-wrap items-center">
                 {processedWebsites.map(items=>
                   <Card key={items.id} items={items}/>
                 )}
              </div>
             </div>
    </div>
}