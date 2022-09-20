import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


// {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },


const data = [
  {
    name: 'Page A',
    Infected: 4000,
    Deaths: 2400,
  },
  
  {
    name: 'Page A',
    Infected: 4000,
    Deaths: 2400,
  },
  {
    name: 'Page A',
    Infected: 4000,
    Deaths: 2400,
  },
  {
    name: 'Page A',
    Infected: 4000,
    Deaths: 2400,
  },
  {
    name: 'Page A',
    Infected: 4000,
    Deaths: 2400,
  },

];

export default function GlobalStatistics(props) {
    // console.log("globalstat içi : ", props.globalData);
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={1000}
          height={300}
          // data={data}
          data={props.globalData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tarihx" />
          {/* <YAxis /> */}
          <YAxis width={100}/>
          <Tooltip />
          <Area type="natural" dataKey="toplamInfected" stackId="1" stroke="#aa90e7" fill="#98a2b4" />
          <Area type="natural" dataKey="toplamDeaths" stackId="2" stroke="#ff0000" fill="#f57f7f" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
