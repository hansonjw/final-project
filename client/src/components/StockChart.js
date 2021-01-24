import React from 'react';
import { Stack, Box, Spacer, Heading, Flex, Center, Text, Button } from '@chakra-ui/react';

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
    
        <Stack spacing={5}>
          <Spacer/>
          <Center>
            <Box w={[300, 400, 1000]} borderWidth="1px" borderColor="#e65c00" borderRadius="lg" bg='white'>
            {/* <Box w="60%" borderWidth="1px" borderColor="red.400" borderRadius="lg" bg='white'> */}
              <Box p="3">
              <Chart
                chartType="ScatterChart"
                data={chartData.chartData}
                options={options}
                width="100%"
                height="400px"
                legendToggle
              />
              </Box>
            </Box>
          </Center>
          <Spacer/>
          
        </Stack>
  );
};

export default StockChart;
 
