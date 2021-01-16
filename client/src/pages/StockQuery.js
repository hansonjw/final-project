import React, { useState, useEffect } from 'react';
import { fetchSecurityData } from '../utils/API';

import StockChart from '../components/StockChart.js';


const StockQuery = () => {

    const [tickerSymbol, setTickerSymbol] = useState('');
    const [stockData, setStockData] = useState('');

    console.log(stockData);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        if (!tickerSymbol) {
            console.log("ticker symbol is not being collected or passed, data function not executed...");
            return false;
        }

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
            setTickerSymbol('');

        } catch(err) {
            console.error(err);
        }
    };


    return (
        <div>
            <h1>Stock Query Page</h1>

            <form onSubmit={handleFormSubmit}>

                <label htmlFor="email">Get price data:</label>
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
                <StockChart chartData={stockData}/>
            </form>

        </div>
    )
}

export default StockQuery;