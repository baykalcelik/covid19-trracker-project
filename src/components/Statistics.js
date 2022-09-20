

import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Infected',
    Infected: 2400,
  },
  {
    name: 'Recovered',
    Recovered: 1398,
  },
  {
    name: 'Deaths',
    Deaths: 9800,
  },
];

// export default class Example extends PureComponent {
    export default function Statistics(props){
        
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={props.data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Infected" stackId="a" fill="#473475" />
          <Bar dataKey="Recovered" stackId="b" fill="#59bd6e"  />
          <Bar dataKey="Deaths" stackId="c" fill="#b46464" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

