import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SecurityTrends = () => {
  const [viewType, setViewType] = useState('bar');
  
  const data = [
    { month: 'NOV-23', residential: 19, commercial: 10, total: 29 },
    { month: 'DEC-23', residential: 24, commercial: 13, total: 37 },
    { month: 'JAN-24', residential: 43, commercial: 0, total: 43 },
    { month: 'FEB-24', residential: 29, commercial: 0, total: 29 },
    { month: 'MAR-24', residential: 34, commercial: 0, total: 34 },
    { month: 'APR-24', residential: 48, commercial: 0, total: 48 },
    { month: 'MAY-24', residential: 37, commercial: 0, total: 37 },
    { month: 'JUN-24', residential: 30, commercial: 0, total: 30 },
    { month: 'JUL-24', residential: 24, commercial: 0, total: 24 },
    { month: 'AUG-24', residential: 28, commercial: 24, total: 52 },
    { month: 'SEP-24', residential: 45, commercial: 15, total: 60 },
    { month: 'OCT-24', residential: 41, commercial: 17, total: 58 }
  ];

  const getMonthlyChange = () => {
    const lastMonth = data[data.length - 1].total;
    const previousMonth = data[data.length - 2].total;
    const change = ((lastMonth - previousMonth) / previousMonth * 100).toFixed(1);
    return { change, increased: lastMonth > previousMonth };
  };

  const monthlyChange = getMonthlyChange();
  
  const totalIncidents = data.reduce((sum, item) => sum + item.total, 0);
  const avgIncidents = totalIncidents / data.length;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold mb-2">{label}</p>
          <p className="text-blue-600">Residential: {payload[0].value}</p>
          <p className="text-green-600">Commercial: {payload[1].value}</p>
          <p className="font-bold mt-1">Total: {payload[0].value + payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Combined Security Incidents</h2>
            <p className="text-gray-600">NOV-23 to OCT-24</p>
          </div>
          <div className="space-x-2">
            <button 
              onClick={() => setViewType('bar')}
              className={`px-4 py-2 rounded ${viewType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Bar
            </button>
            <button 
              onClick={() => setViewType('line')}
              className={`px-4 py-2 rounded ${viewType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Line
            </button>
          </div>
        </div>

        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            {viewType === 'bar' ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="residential" fill="#0088FE" name="Residential" />
                <Bar dataKey="commercial" fill="#00C49F" name="Commercial" />
              </BarChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="residential" 
                  stroke="#0088FE" 
                  strokeWidth={2}
                  name="Residential"
                />
                <Line 
                  type="monotone" 
                  dataKey="commercial" 
                  stroke="#00C49F" 
                  strokeWidth={2}
                  name="Commercial"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded">
            <p className="font-bold">Total Incidents</p>
            <p className="text-2xl">{totalIncidents}</p>
            <p className="text-sm text-gray-600">Combined</p>
          </div>
          <div className="bg-green-100 p-4 rounded">
            <p className="font-bold">Monthly Average</p>
            <p className="text-2xl">{avgIncidents.toFixed(1)}</p>
            <p className="text-sm text-gray-600">Incidents/Month</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded">
            <p className="font-bold">Peak Month</p>
            <p className="text-2xl">{Math.max(...data.map(item => item.total))}</p>
            <p className="text-sm text-gray-600">
              {data.find(item => item.total === Math.max(...data.map(item => item.total))).month}
            </p>
          </div>
          <div className={`${monthlyChange.increased ? 'bg-red-100' : 'bg-green-100'} p-4 rounded`}>
            <p className="font-bold">Recent Trend</p>
            <p className="text-2xl">{monthlyChange.change}%</p>
            <p className="text-sm text-gray-600">Month-over-Month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTrends;