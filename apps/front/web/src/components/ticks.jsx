export const Ticks=({ticktype})=>{
    console.log("type yeah hain",ticktype)
    return <div className={` ${ticktype==="good" ? "bg-green-400": ticktype==="bad" ? "bg-red-400":"bg-gray-300" } rounded-xl h-2 w-8`}>

    </div>
}