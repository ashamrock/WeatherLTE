function update() {
  date = new Date();
  dayIndex = date.getDay()
  currentTime = date.toLocaleTimeString([], {timeStyle: 'short'})
  currentDate = date.toDateString();
  today = new Date().toLocaleString(undefined, {
    weekday: 'long', month: "long", day: "numeric", 
 });
  document.getElementById("time").innerHTML = currentTime;
  document.getElementById("date").innerHTML = today;

  setTimeout(update, 30000);
}
update();

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

console.log("Right Now- " + data.current.weather[0].main + " - " + data.daily[0].pop)

    function currentTemp(){
    document.getElementById("temp").innerHTML = todayTemp+"°";
    document.getElementById("hiLow").innerHTML = minTemp+"° | "+maxTemp+"°";
    document.getElementById("sunSchedule").innerHTML = "Sunrise <img src='./icon/Sun.png'> "+sunrise+"<br><br>Sunset <img src='./icon/moon.png'> "+sunset;
    };

    function forecast(){
      var i;
      var tomorrowText = "";
      var x="";
      var todayWeather = "";
      var rainHigh = 1;
      var rainLow = .8;

      if (data.daily[0].pop >= rainHigh) {
        todayWeather = "<img src='./icon/rain.png' style='height: 50px;'>";
      } else if (data.daily[0].pop >= rainLow) 
      {todayWeather = "<img src='./icon/clouds.png' style='height: 50px;'>";
      } else { todayWeather = "<img src='./icon/clear.png' style='height: 50px;'>";}
    document.getElementById("skyview").innerHTML = '<div class="tomorrow">' + todayWeather + "</div>";

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
    hours = (hours % 12) || 12;

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
  rainData.push(data.hourly[i].pop *10)
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