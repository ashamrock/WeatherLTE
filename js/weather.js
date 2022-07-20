var stockName1 = $(".stock1-name");
var stockPrice1 = $(".stock1-price");

var stockName2 = $(".stock2-name");
var stockPrice2 = $(".stock2-price");


function update() {
  date = new Date();
  // dayIndex = date.getDay()
  currentTime = date.toLocaleTimeString([], {timeStyle: 'short'})
  currentDate = date.toDateString();
  updateTime = new Date().toLocaleString(undefined, {
    weekday: 'short', month: "short", day: "numeric", 
 });
  today = new Date().toLocaleString(undefined, {
    weekday: 'long', month: "long", day: "numeric", 
 });
  document.getElementById("time").innerHTML = currentTime;
  document.getElementById("date").innerHTML = today;

  setTimeout(update, 30000);
}
update();



function getStocks(){

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  // var yyyy = today.getFullYear();
  today = mm + '/' + dd 
  updateTime =today + " " + currentTime
  console.log(updateTime);

  document.getElementById("update-time").innerHTML = (today + " " + currentTime);

  stockKey = config.STOCK_KEY;
  stockKey2 = config.STOCK_KEY1;

  ticker1 = "NVDA";
  ticker2 = "ZM";
  ticker3 = "TSLA";
  Cryptik1 = "DOGE";

  const stock1 = {
    "async": true,
    "crossDomain": true,
    "url": 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + ticker1 + '&apikey=stockKey2',
    "method": "GET",
  };

  $.ajax(stock1).done(function (response) {
    var tickerName = response["Global Quote"]["01. symbol"];
    var tickerPrice = response["Global Quote"]["05. price"];
    document.getElementById("stock1-name").innerHTML = tickerName;
    document.getElementById("stock1-price").innerHTML = Number(tickerPrice);
  });

  const stock2 = {
    "async": true,
    "crossDomain": true,
    "url": 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + ticker2 + '&apikey=stockKey2',
    "method": "GET",
  };

  $.ajax(stock2).done(function (response) {
    var tickerName = response["Global Quote"]["01. symbol"];
    var tickerPrice = response["Global Quote"]["05. price"];
    document.getElementById("stock2-name").innerHTML = tickerName;
    document.getElementById("stock2-price").innerHTML = Number(tickerPrice);
  });

  const stock3 = {
    "async": true,
    "crossDomain": true,
    "url": 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + ticker3 + '&apikey=stockKey2',
    "method": "GET",
  };

  $.ajax(stock3).done(function (response) {
    var tickerName = response["Global Quote"]["01. symbol"];
    var tickerPrice = response["Global Quote"]["05. price"];
    document.getElementById("stock3-name").innerHTML = tickerName;
    document.getElementById("stock3-price").innerHTML = Number(tickerPrice);
  });

  const stock4 = {
    "async": true,
    "crossDomain": true,
    "url": 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + Cryptik1 + '&to_currency=USD&apikey=stockKey2',
    "method": "GET",
  };

  $.ajax(stock4).done(function (response) {
    var tickerName = response["Realtime Currency Exchange Rate"]["1. From_Currency Code"];
    var tickerPrice = response["Realtime Currency Exchange Rate"]["9. Ask Price"];
    document.getElementById("stock4-name").innerHTML = tickerName;
    document.getElementById("stock4-price").innerHTML = Number(tickerPrice);
  });

   setTimeout(getStocks, 3.6e+6)
};

getStocks();


function weatherBalloon() {

  la = config.SECRET_LA;
  lo = config.SECRET_LO;
  key = config.MY_KEY;
  myApi = "https://api.openweathermap.org/data/2.5/onecall?"+la+"&"+lo+"&units=imperial&exclude={part}&appid="+key;
  units = 'imperial';
  fetch("https://api.openweathermap.org/data/2.5/onecall?lat=41.667070&lon=-81.325810&units="+units+"&exclude={part}&appid=" + key)  
  .then(function(resp) { return resp.json() })
  .then(function(data) {
    maxTemp = Math.round(data.daily[0].temp.max);
    minTemp = Math.round(data.daily[0].temp.min);
    todayTemp = Math.round(data.current.temp);
    sunrise =  new Date(data.current.sunrise * 1000).toLocaleTimeString();;
    sunset =  new Date(data.current.sunset * 1000).toLocaleTimeString();;
    //ERROr ----------------------- ERROR ---------------------------------
//console.log("Right Now- " + data.current.weather[0].main + " - " + data.daily[0].pop)
// console.log(data)

    function currentTemp(){
    document.getElementById("temp").innerHTML = todayTemp+"°";
    document.getElementById("hiLow").innerHTML = minTemp+"° | "+maxTemp+"°";
    document.getElementById("sunSchedule").innerHTML = "Sunrise <img src='./icon/Sun.png'> "+sunrise+"<br><br>Sunset <img src='./icon/moon.png'> "+sunset;
    };

    function forecast(){
      var i;
      var tomorrowText = "";
      var todayWeather = "";
      var rainHigh = 0.6;
      var rainLow = 0.3;
      var rainForecast = [];

      for (i = 0; i < 16; i++) {
        rainForecast.push(data.hourly[i].pop)
      }

      rainForecast.sort()

      if (rainForecast.at(15) >= rainHigh) {
        todayWeather = "<img src='./icon/rain.png' style='height: 50px;'>";
      } else if (rainForecast.at(15) >= rainLow) 
      {todayWeather = "<img src='./icon/clouds.png' style='height: 50px;'>";
      } else { todayWeather = "<img src='./icon/clear.png' style='height: 50px;'>";}
    
    document.getElementById("skyview").innerHTML = '<div class="tomorrow">' + todayWeather + "</div>";
    rainForecast = [];

    for (i = 1; i < 6; i++) {
      nextWeather = "";

      if(data.daily[i].weather[0].main === "Clear") { 
        nextWeather = "<img src='./icon/clear.png' style='height: 25px;'>";
      } else {
      
        switch (data.daily[i].weather[0].main) {
          case "Thunderstorm":
            nextWeather = "<img src='./icon/thunderstorm.png' style='height: 25px;'>";
            break;
          case "Drizzle":
            nextWeather = "<img src='./icon/drizzle.png' style='height: 25px;'>";
            break;
          case "Mist":
            nextWeather = "<img src='./icon/mist.png' style='height: 25px;'>";
            break;
          case "Snow":
            nextWeather = "<img src='./icon/snow.png' style='height: 25px;'>";          
            break;
          case "Clouds":
            nextWeather = "<img src='./icon/clouds.png' style='height: 25px;'>";          
            break;
          case "Haze":
            nextWeather = "<img src='./icon/haze.png' style='height: 25px;'>";          
            break;
          case "Fog":
            nextWeather = "<img src='./icon/haze.png' style='height: 25px;'>";          
            break;
          case "Rain":
            if (data.daily[i].pop >= rainHigh) {
              nextWeather = "<img src='./icon/rain.png' style='height: 25px;'>";
            } else if (data.daily[i].pop >= rainLow) 
            {nextWeather = "<img src='./icon/clouds.png' style='height: 25px;'>";
            } else { nextWeather = "<img src='./icon/clear.png' style='height: 25px;'>";}
            break;
          default:
            nextWeather = "<img src='./icon/clear.png' style='height: 25px;'>";
          }
      }

      tomorrow = new Date(data.daily[i].dt* 1000).toLocaleString(undefined, {weekday: 'short'});
      tomorrowText = tomorrowText + '<div class="tomorrow">' + tomorrow +" "+ nextWeather + " <br>"+Math.round(data.daily[i].temp.min)+"° | "+ Math.round(data.daily[i].temp.max)+"°"  + "</div>";

    }

    document.getElementById("forecast").innerHTML = tomorrowText;
    }

    function bigIcons(){
      var climate ;
      var timeOfDay = date.getHours()

      if(timeOfDay < 6) { 
        climate = '<div icon="supermoon" data-label="Cool!"><span class="moon"></span><span class="meteor"></span></div>'
      } else if (timeOfDay > 19) {
        climate = '<div icon="supermoon" data-label="Cool!"><span class="moon"></span><span class="meteor"></span></div>'
      } else {
      
      switch (data.current.weather[0].main) {
        case "Thunderstorm":
          climate = '<div icon="stormy" data-label="Soggy"><span class="cloud"></span><span class="cloud"></span><ul><li></li><li></li><li></li><li></li><li></li></ul></div>';
          break;
        case "Drizzle":
          climate = '<div icon="stormy" data-label="Soggy"><span class="cloud"></span><ul><li></li><li></li><li></li><li></li><li></li></ul></div>';
          break;
        case "Mist":
          climate = '<div icon="stormy" data-label="Soggy"><span class="cloud"></span><ul><li></li><li></li><li></li><li></li><li></li></ul></div>';
          break;
        case "Rain":
          climate = '<div icon="stormy" data-label="Soggy"><span class="cloud"></span><ul><li></li><li></li><li></li><li></li><li></li></ul></div>';
          break;
        case "Snow":
          climate = '<div icon="snowy" data-label="Chilly"><span class="snowman"></span><ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>';
          break;
        case "Clear":
          climate = '<div icon="sunny" data-label="Sunny"><span class="sun"></span></div>';
          break;
        // case "Clouds":
        //   climate = '<div icon="cloudy" data-label="Perfect"><span class="cloud"></span></div>';
        //   break;
        case "Clouds":
          climate = '<div icon="cloudy" data-label="Perfect"><span class="cloud"></span><span class="cloud"></span></div>';
          break;
        case "Haze":
          climate = '<div icon="cloudy" data-label="Perfect"><span class="cloud"></span></div>';
          break;
        case "Fog":
          climate = '<div icon="cloudy" data-label="Perfect"><span class="cloud"></span></div>';
          break;
        default:
            text = '<div icon="supermoon" data-label="Cool!"><span class="moon"></span><span class="meteor"></span></div>';
      }

    }

      document.getElementById("getIcon").innerHTML = climate;
    }

  function graphIt(){

    var timeArray = [];
    var tempData = [];
    var rainData = [];
    var timeOffset=0;
    var timeOffset2=0;
    var dt = new Date();
    var hours = dt.getHours() ; 
    var hours = (hours % 12) || 12;

    for (i = hours; i < 13; i++) { 
    timeArray.push (hours+timeOffset)
    timeOffset++;
    }

    if (timeArray.length<12){
      for (i = timeArray.length; i < 12; i++) { 
      timeOffset2 ++
      timeArray.push (timeOffset2)
      }
    }

for (i = 0; i < 12; i++){
  tempData.push(data.hourly[i].temp)
  rainData.push(data.hourly[i].pop *100)

}

if(window.myNewChart1 != null){
  window.myNewChart1.destroy();
  }

window.myNewChart1 = new Chart("myChart", {
      type: "line",
      data: {
        labels: timeArray,
        datasets: [{ 
          data: tempData,
          borderColor: "red",
          fill: false,
          tension: 0.4,
        }, { 
          data: rainData,
          borderColor: "blue",
          fill: false,
          tension: 0.4,
        }]
      },
      options: {
        animation : false,
        scales: {
          y: {
            grid:{
              color: 'rgba(255, 255, 255, 0.24)',
            },
              ticks: {
                color: 'rgba(255, 255, 255, 0.836)',
                font: {
                     size: 18,
                },
              }
          },
          x: {
            ticks: {
              color: 'rgba(255, 255, 255, 0.836)',
              font: {
                   size: 18,
              },
            }
        },
      },
        plugins: {
          legend: {
           display: false,
          },
          title: {
            display: false,
          }
        },
      },
    });
    var timeArray = [];
    var tempData = [];
    var rainData = [];
  }

  
    currentTemp()
    forecast()
    bigIcons()
    graphIt()
    setTimeout(weatherBalloon, 900000 );

  })
  .catch(function() {
    // catch any errors
  });
  // setTimeout(weatherBalloon, 1000 );
  //15 minute updates
}

weatherBalloon()