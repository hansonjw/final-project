// code from project #1

//Load google charts libraries
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

// external API call for stock data...

var fetchWeekData = function(ticker){
  
    var apiKey = "YYN6L1UF6A17ZCV3";
    var apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol="
    + ticker + "&out&apikey=" + apiKey;
    console.log(apiUrl);
    return fetch(apiUrl).then(function(response) {
      // request was successful
      if (response.ok) {
          return response.json().then(function(data) {
              
              return data;
             // console.log(allData);
             // console.log(allData['weekly']);
          });
      }
      else {
          //console.log("There was a problem with the request")
          displayModal("There was a problem with the request, please wait for a minute and try again!");
      }
    });
}

// code for google charts



// Draws the chart utilizing google charts
function drawChart(arr,xAxis,yAxis,chart_div,moneyFormat) {
    var data = new google.visualization.DataTable();
  
    data.addColumn('date', xAxis);
    data.addColumn('number', yAxis);
    data.addRows(arr);
  
    var options = {
      width: 500,
      height: 400,
      hAxis: {
        title: xAxis,
        format: 'M/d/y'
      },
      vAxis: {
        title: yAxis,
        format: moneyFormat
      },
      legend: 'none',
      series: {
        0: {color: '#e2431e'}
      }
    };
   
    resize(chart_div,data,options);
    
  }
  
  //parse weekly data
  function parsePriceDataWeekly(data){
  
      var parsedData = [];
      // tsData = data["Time Series (Daily)"];
      tsData = data["Weekly Adjusted Time Series"];
      tsDataKeys = Object.keys(tsData);
      tsDataKeysConv = [];
  
      // Creates an array of dates for just 2020 to limit data size in chart
      for (i = 0; i < tsDataKeys.length; i++){
        aDate = moment(tsDataKeys[i]);
        if (aDate.year() == 2020){
          tsDataKeysConv.push(aDate);
        };
      };
  
      // Generate data set for use in Google charts API
      for (i = 0; i < tsDataKeysConv.length; i++){
        date = new Date(tsDataKeysConv[i].year(), tsDataKeysConv[i].month(), tsDataKeysConv[i].date());
        price = Number(tsData[tsDataKeysConv[i].format("YYYY-MM-DD")]["5. adjusted close"]);
        datePriceAr = [date, price];
        parsedData[tsDataKeysConv.length-1-i] = datePriceAr;
      };
  
      drawChart(parsedData,'Date','Price','chart_div','$#,###');
  }
  