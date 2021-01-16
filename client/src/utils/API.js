


// export const fetchSecurityData = function(ticker){
  
//     var apiKey = "YYN6L1UF6A17ZCV3";
//     var apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="
//     + ticker + "&out&apikey=" + apiKey;
//     console.log(apiUrl);

//     return fetch(apiUrl).then(function(response) {
//       // request was successful
//       if (response.ok) {
//           return response.json().then(function(data) {
//             console.log(data);
//             return data;
//           });
//       }
//       else {
//           console.log("There was a problem with the request")
//       }
//     });
// };


export const fetchSecurityData = function(ticker){
  
    var apiKey = "YYN6L1UF6A17ZCV3";
    var apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="
    + ticker + "&out&apikey=" + apiKey;
    console.log(apiUrl);
    return fetch(apiUrl);
};