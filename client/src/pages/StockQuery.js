import React, { useState, useEffect } from 'react';
import { fetchSecurityData } from '../utils/API';

import StockChart from '../components/StockChart.js';
import GetPerspectives from '../components/GetPerspectives.js';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GET_SECURITY } from '../utils/queries';


const StockQuery = () => {

    const [tickerSymbol, setTickerSymbol] = useState('');
    const [stockData, setStockData] = useState('');

    console.log(stockData);

    // API call to alphavantage...
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        if (!tickerSymbol) {
            console.log("please enter a ticker symbol...");
            return false;
        }

        // need to refactor this into the component instead of direct on this page
        // idea: submit ticker to component and API...all data munging should happen there, not here... 
        try {
            const response = await fetchSecurityData(tickerSymbol);

            if(!response.ok) {
                throw new Error('something is amiss...check your ticker symbol')
            }

            const securityData = await response.json().then(function(data) {
                
                const stockData = [['date', 'price']];
                const rawData = data['Time Series (Daily)'];

                for (const property in rawData) {
                    let aDate = property;
                    let aPrice = Number(rawData[property]['5. adjusted close']);
                    stockData.push([aDate, aPrice]);
                };

                return stockData;
            });
            
            setStockData(securityData);

        } catch(err) {
            console.error(err);
        }
    };


    return (
        <div>
            <h1>Stock Query Page</h1>

            <form onSubmit={handleFormSubmit}>

                <label>Get price data:</label>
                <input
                    placeholder="enter a ticker symbol"
                    name="tickerSymbol"
                    value={tickerSymbol}
                    onChange={(e) => setTickerSymbol(e.target.value)}
                    type="text"
                />
                <button type='submit'>
                    Get Data
                </button>
                <StockChart chartData={stockData} />
                <GetPerspectives ticker={tickerSymbol} />
            </form>

        </div>
    )
}

export default StockQuery;