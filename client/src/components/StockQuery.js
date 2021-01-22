import React, { useState, useEffect } from 'react';
import { fetchSecurityData } from '../utils/API';

import StockChart from './StockChart.js';
import PerspectiveList from './PerspectiveList.js';
import AddPerspective from './AddPerspective.js';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GET_SECURITY } from '../utils/queries';
import { Link } from "react-router-dom";


const StockQuery = () => {

    const [searchTicker, setSearchTicker] = useState('');
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState('');

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
                
                const headers = ['date', 'price'];
                const rawData = data['Time Series (Daily)'];
                const stockData = []

                for (const property in rawData) {
                    let aDate = property;
                    let aPrice = Number(rawData[property]['5. adjusted close']);
                    stockData.push([aDate, aPrice]);
                };
                // add headers then flip data set so dates go in chronological order
                stockData.push(headers);
                stockData.reverse();
                return stockData;
            });
            
            setStockData(securityData);
            setTicker(searchTicker);
            setSearchTicker('');
        } catch(err) {
            console.error(err);
        }
    };

    // get perspectives from ticker
    const { loading, data } = useQuery(QUERY_GET_SECURITY, {
        variables: { ticker: ticker }
    });
    const perspectiveData = data?.getSecurity || [];


    return (
        <div>
            <h1>Stock Query Component</h1>

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
            <AddPerspective ticker={ticker} />
            <PerspectiveList perspectiveData={perspectiveData} />
        </div>
    )
}

export default StockQuery;