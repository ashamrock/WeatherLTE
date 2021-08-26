

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

      if (data.daily[0].rain >= 4) {
        todayWeather = "<img src='./icon/rain.png' style='height: 50px;'>";
      } else if (data.daily[0].rain >= 2) 
      {todayWeather = "<img src='./icon/clouds.png' style='height: 50px;'>";
      } else { todayWeather = "<img src='./icon/clear.png' style='height: 50px;'>";}
    document.getElementById("skyview").innerHTML = '<div class="tomorrow">' + todayWeather + "</div>";
    console.log("Right Now- " + data.daily[0].weather[0].main)
    console.log("rain- " + data.daily[0].rain)



    for (i = 1; i < 6; i++) {
      rainMeter = data.daily[i].rain;
      nextWeather = "";

dumbweather = "";
rainraingoaway = 5;

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
          case "Rain":
            if (data.daily[i].rain >= 4) {
              nextWeather = "<img src='./icon/rain.png' style='height: 25px;'>";
            } else if (data.daily[i].rain >= 2) 
            {nextWeather = "<img src='./icon/clouds.png' style='height: 25px;'>";
            } else { nextWeather = "<img src='./icon/clear.png' style='height: 25px;'>";}
            break;
          default:
            nextWeather = "<img src='./icon/clear.png' style='height: 25px;'>";
          }
      }


      tomorrow = new Date(data.daily[i].dt* 1000).toLocaleString(undefined, {weekday: 'short'});
      tomorrowText = tomorrowText + '<div class="tomorrow">' + tomorrow +" "+ nextWeather + " <br>"+Math.round(data.daily[i].temp.min)+"° | "+ Math.round(data.daily[i].temp.max)+"°"  + "</div>";

      console.log(tomorrow+"- "+rainMeter)
    }








    //console.log(data.daily)
    document.getElementById("forecast").innerHTML = tomorrowText;
    }

    function bigIcons(){
      var refreshes = 0;
      var climate ;
      var timeOfDay = date.getHours()

      // refreshes++
      // console.log(refreshes)

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
        default:
            text = '<div icon="supermoon" data-label="Cool!"><span class="moon"></span><span class="meteor"></span></div>';
      }

    }

      document.getElementById("getIcon").innerHTML = climate;
    }

    currentTemp()
    forecast()
    bigIcons()
    setTimeout(weatherBalloon, 900000 );
    //15 minute updates
    //1800000
  })
  .catch(function() {
    // catch any errors
  });
}

weatherBalloon()



