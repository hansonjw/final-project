import React, { useState, useEffect } from 'react';

import Auth from '../utils/auth';

// import { getSecurityData } from '..util/API';

import { Chart } from "react-google-charts";
import { render } from "react-dom";
 
const options = {
  title: "Age vs. Weight comparison",
  hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
  vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  legend: "none"
};
const data = [
  ["Age", "Weight"],
  [8, 12],
  [4, 5.5],
  [11, 14],
  [4, 5],
  [3, 3.5],
  [6.5, 7]
];
 
const StockChart = () => {
  return (
    <div>
      <div>StockChart page...</div>
      <Chart
        chartType="ScatterChart"
        data={data}
        options={options}
        width="80%"
        height="400px"
        legendToggle
      />
    </div>
  );
};

export default StockChart;
 
