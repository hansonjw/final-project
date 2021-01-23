import React from 'react';


import { Chart } from "react-google-charts";
 
 
const StockChart = (chartData) => {

  const options = {
    // hAxis: { title: "Price", viewWindow: { min: 0, max: 100} },
    hAxis: { title: "Date", format: 'M/d/y' },
    // vAxis: { title: "Date", viewWindow: { min: 0, max: 1000 } },
    vAxis: { title: "Price ($/share)" },
    legend: "none"
  };

  if (chartData.chartData.length<=1){
    return (
      <div>no data to plot...</div>
    )
  }

  else return (
    <div>
      <h1>StockChart component...</h1>
      <Chart
        chartType="ScatterChart"
        data={chartData.chartData}
        options={options}
        width="80%"
        height="400px"
        legendToggle
      />
    </div>
  );
};

export default StockChart;
 
