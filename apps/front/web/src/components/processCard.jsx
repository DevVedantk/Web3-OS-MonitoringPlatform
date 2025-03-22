import { Ticks } from "./ticks"

export const Card=({items})=>{

  console.log("processed sites are : ",items)
  // const websiteTicks=items.websiteTick;
  const ticks=items.uptimeTicks;
  console.log("ticks are ",ticks);

    return <div className="h-36 w-96 mt-6 border rounded border-[#374151] bg-[#1F2937]">
          
          <div className="flex justify-between p-2 border-b-1 border-[#374151]">
            <h1 className="text-white font-medium">{items.url}</h1>
            <h1 className="text-white font-medium">{items.uptimePercentage}.0% uptime</h1>
          </div>

          <div>
           <h1 className="text-white ml-2"> Last 30 minute status: </h1>
           <div className="flex gap-1 items-center justify-center mt-1">
            {ticks.map((ticktype,idx)=>
              <Ticks key={idx} ticktype={ticktype}/>
            )}
           </div>
           <div>
            <h1 className="text-white mt-4 ml-1">Last Checked at : {items.lastChecked}</h1>
           </div>
          </div>
    </div>
}