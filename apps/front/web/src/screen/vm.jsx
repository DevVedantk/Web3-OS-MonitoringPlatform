import {
    LineChart,
    ResponsiveContainer,
    Legend,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
 
// Sample chart data
const pdata = [
    {
        name: "MongoDb",
        student: 11,
        CPU: 120,
    },
    {
        name: "Javascript",
        student: 15,
        CPU: 12,
    },
    {
        name: "PHP",
        student: 5,
        CPU: 10,
    },
    {
        name: "Java",
        student: 10,
        CPU: 5,
    },
    {
        name: "C#",
        student: 9,
        CPU: 4,
    },
    {
        name: "C++",
        student: 10,
        CPU: 8,
    },
];


export const VM=()=>{
    return <div className="h-screen w-full bg-[#111827]">
         <h1 className="text-heading">Line Chart Using Rechart</h1>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart height={50} width={50} data={pdata} margin={{ right: 900 }}>
                    <CartesianGrid />
                    <XAxis dataKey="name" interval={"preserveStartEnd"} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    {/* <Line
                        dataKey="student"
                        stroke="black"
                        activeDot={{ r: 8 }}
                    /> */}
                    <Line dataKey="CPU" stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
    </div>
}