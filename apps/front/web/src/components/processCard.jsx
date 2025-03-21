import { Ticks } from "./ticks"

export const Card=()=>{

    return <div className="h-36 w-96 mt-8 border rounded border-[#374151] bg-[#1F2937]">
          
          <div className="flex justify-between p-2 border-b-1 border-[#374151]">
            <h1 className="text-white font-medium">https://100xDevs.com</h1>
            <h1 className="text-white font-medium">100.0% uptime</h1>
          </div>

          <div>
           <h1 className="text-white ml-2"> Last 30 minute status: </h1>
           <div className="flex gap-1 items-center justify-center mt-2">
        <Ticks/>
        <Ticks/>
        <Ticks/>
        <Ticks/>
        <Ticks/>
        <Ticks/>
        <Ticks/>
        <Ticks/>
        <Ticks/>
        <Ticks/>
           </div>
           <div>
            <h1 className="text-white mt-4 ml-1">Last Checked at :</h1>
           </div>
          </div>
    </div>
}