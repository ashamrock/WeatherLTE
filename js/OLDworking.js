var refreshes = 0;
let power = false;

let fanCheck = true;

houseTemp = 50;
setTemp = 60;
variation = 2;

let fanOn = false;

let getHeat=false;
let getCool=false;

let heatOn=false;
let coolOn=false;


document.getElementById("setTemp").innerHTML = setTemp+"°";
document.getElementById("houseTemp").innerHTML = houseTemp+"°";

//---v-works-v---//
// function heatingOn() {
//   if (houseTemp > setTemp+variation) {
//   heating = false;
//   }else if(houseTemp < setTemp-variation) {
//   heating = true;
//   }
//   console.log("H "+heating)
//   setTimeout(heatingOn, 1000);
// }
// heatingOn();
//---^-works-^---//

//---v-works-v---//
function heatWatch() {
  if (houseTemp > setTemp+variation) {
    getHeat=false;
  }else if(houseTemp < setTemp-variation) {
    getHeat=true;
  }
  setTimeout(heatWatch,500);
}
heatWatch();
//---^-works-^---//


function fanControl() {
  if (getHeat === true) {
    fanOn = true
  }else if(heatOn === true) {
    fanOn = true
  }else{
    fanOn = false
  }
  setTimeout(fanControl,10000);
}
fanControl();


function startHeat() {
 if(fanCheck === false) {
    heatOn = false;
  }else if (fanOn === false) {
    heatOn = false;
 }else if (getHeat === true && fanOn === true && fanCheck === true) {
    heatOn = true;
  }else {
    heatOn = false;
  }
  setTimeout(startHeat,100);
}
startHeat();



function checkStatus(){
  //console.log("should heat "+ getHeat + "-- F "+fanOn + "-- heat on " +heatOn)
console.log("Fan " + fanOn + " --   heating " + heatOn)
  setTimeout(checkStatus, 500);
}
checkStatus()



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

  setTimeout(update, 1000);
}
update();








function turnUp(){
  setTemp ++
  // console.log(setTemp)
  document.getElementById("setTemp").innerHTML = setTemp+"°";
}

function turnDown(){
  setTemp --
  // console.log(setTemp)
  document.getElementById("setTemp").innerHTML = setTemp+"°";
}

document.addEventListener('keydown', logKey);
function logKey(e) {
  if (e.code==="KeyQ"){
    houseTemp++
    document.getElementById("houseTemp").innerHTML = houseTemp+"°";
  }
  if (e.code==="KeyA"){
    houseTemp--
    document.getElementById("houseTemp").innerHTML = houseTemp+"°";
  }

}







// function powerToggle(){
//   power = !power;

// if(power = true){

//   setInterval(function(){ 
//     console.log("power!" + power) 
//   }, 2000);
// }

// console.log(power)

// }













function weatherBalloon() {

  myApi = "https://api.openweathermap.org/data/2.5/onecall?lat=41.667070&lon=-81.325810&units=imperial&exclude={part}&appid=21430ad3b0a3d0f259cf25939a71772c"
  key = '21430ad3b0a3d0f259cf25939a71772c';
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

    for (i = 1; i < 6; i++) {
      tomorrow = new Date(data.daily[i].dt* 1000).toLocaleString(undefined, {weekday: 'short'});
      tomorrowText = tomorrowText + '<div class="tomorrow">' + tomorrow+" <br>"+Math.round(data.daily[i].temp.min)+"° | "+ Math.round(data.daily[i].temp.max)+"°"  + "</div>";
    }
    document.getElementById("forecast").innerHTML = tomorrowText;
    }

    function bigIcons(){
      var climate ;
      var timeOfDay = date.getHours()

      refreshes++
      console.log(refreshes)

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
        default:
            text = '<div icon="supermoon" data-label="Cool!"><span class="moon"></span><span class="meteor"></span></div>';
      }

    }

      document.getElementById("getIcon").innerHTML = climate;
    }

    currentTemp()
    forecast()
    bigIcons()
    setTimeout(weatherBalloon, 300000 );
    //1800000
  })
  .catch(function() {
    // catch any errors
  });
}

weatherBalloon()


