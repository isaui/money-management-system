import React, { useState } from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, YAxis} from 'recharts';
import { MenuItem, Select } from '@mui/material';
import { ILineGraph } from '../interface/ILineGraph';



const LineGraph: React.FC<ILineGraph<any>> = ({
  dropdownValues, onClickDropdownValue, yAxisLabel, xAxisLabel, lineValues, lineColors, lineLabels
}) => {
  const [timeRange, setTimeRange] = useState<string|null>(dropdownValues.length == 0? null : dropdownValues[2]);

  const handleChange = (event: any) => {
    setTimeRange(event.target.value as string);
    onClickDropdownValue(event.target.value as string)
  };
  return (
      <div className='p-4 linear-gradient-dark-blue rounded-lg flex font-semibold  flex-col items-center justify-center'>
       <div className='flex w-full items-center'>
        <h1>Amount</h1>
        {
        dropdownValues.length != 0 && <div  className='ml-auto'>
        <Select
        className='text-white bg-pink-700'
          value={timeRange}
          onChange={handleChange}
          size="small"
        >
          {
            dropdownValues.map((value, index)=>{
              return <MenuItem key={index + '--' + value } value={value}>{value}</MenuItem>
            })
          }
        </Select>
      </div>
       }
       </div>
        <ResponsiveContainer width="100%"  height={380} >
          <LineChart
            data={lineValues}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
            
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={xAxisLabel}
              angle={0} 
              textAnchor="end"
            />
            <YAxis label={{ value: '', angle: -90, position: 'insideRIght',  }} 
            />
            <Tooltip />
            <Legend />
            {
              lineLabels.map((label, index)=>{
                return <Line key={label + '--'+index} type="monotone" dataKey={label} stroke={lineColors[index]} />
              })
            } 
          </LineChart>
        </ResponsiveContainer>
      </div>
  );
};


export default LineGraph;

