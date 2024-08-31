import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DefaultCharts({title, datakey1, datakey2, chartsData, dataMaxVector, color}){
    return(
        <>
            <h2>{title}</h2>
            <ResponsiveContainer>
                <AreaChart
                    data={chartsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={datakey1} />
                <YAxis domain={[0, dataMax => dataMax * dataMaxVector]} />
                <Tooltip />
                <Area type="monotone" dataKey={datakey2} stroke={color} fill={color} />
                </AreaChart>
            </ResponsiveContainer>
        </>
    )
}