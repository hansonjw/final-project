import React, { useState, useEffect } from 'react';

import Auth from '../utils/auth';

// import { getSecurityData } from '..util/API';

import { Chart } from "react-google-charts";
 
 
const StockChart = (chartData) => {

  const options = {
    title: "Age vs. Weight comparison",
    hAxis: { title: "Price", viewWindow: { min: 0, max: 100} },
    vAxis: { title: "Date", viewWindow: { min: 0, max: 1000 } },
    legend: "none"
  };
  // const bdata = [
  //   ["Age", "Weight"],
  //   [8, 12],
  //   [4, 5.5],
  //   [11, 14],
  //   [4, 5],
  //   [3, 3.5],
  //   [6.5, 7]
  // ];
  // console.log(bdata);

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
 
