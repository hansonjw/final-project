import React, { useState, useEffect } from 'react';
import { fetchSecurityData } from '../utils/API';

import StockChart from '../components/StockChart.js';
import GetPerspectives from '../components/GetPerspectives.js';
import AddPerspective from './AddPerspective.js';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GET_SECURITY } from '../utils/queries';
import { Link } from "react-router-dom";


const StockQuery = () => {

    const [searchTicker, setSearchTicker] = useState('');
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState('');

    console.log(stockData);

    const handleChange = event => {
        setSearchTicker(event.target.value.toUpperCase());
    };

    // API call to alphavantage...
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // need to refactor this into the component instead of direct on this page
        // idea: submit ticker to component and API...all data munging should happen there, not here... 
        try {
            const response = await fetchSecurityData(searchTicker);

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
            setTicker(searchTicker);
            console.log(ticker);
            setSearchTicker('');
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
                    value={searchTicker}
                    onChange={handleChange}
                    type="text"
                />
                <button type='submit'>
                    Get Data
                </button>
            </form>
            <StockChart chartData={stockData} />
            <Link to={`/addperspective/${ticker}`}><h2>{ticker} - Add a Perspective</h2></Link>
            <GetPerspectives ticker={ticker} />
        </div>
    )
}

export default StockQuery;