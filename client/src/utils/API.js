export const fetchSecurityData = function(ticker){
  
    var apiKey = "YYN6L1UF6A17ZCV3";
    var apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="
    + ticker + "&out&apikey=" + apiKey;
    console.log(apiUrl);
    return fetch(apiUrl);
};