function changeBackground(){
//const Change = document.querySelector('body');
// console.log(Change);
const images = ['url("./img/back8.jpeg")','url("./img/back4.webp")'];

var bg = images[Math.floor(Math.random()* images.length)];

document.querySelector('body').style.background = bg;


  
}



const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
 const weatherIcon = document.querySelector(".icon");
 const forecast = document.querySelector(".click");

async function getWeather(city){
  var res = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=09b49b5a500f57bead1813c79d7856eb&&units=metric`);
   res.then(res => res.json()).then(data =>{

  // console.log(data);
      document.querySelector('.city').innerHTML = data.name;
   document.querySelector('.celcius').innerHTML = Math.round(data.main.temp )+ "°C";
   document.querySelector('.humidity').innerHTML = data.main.humidity+"%";
   document.querySelector('.winds').innerHTML = data.wind.speed + " km/h";

switch(data.weather[0].main)
{
   case 'Clouds':
       weatherIcon.src =  "./img/clouds.png";
      break;
       case 'Clear':
          weatherIcon.src =  "./img/clear.png";
          break;
          case 'Rain':
              weatherIcon.src =  "./img/rain.png";
              break;
              case 'Drizzle':
               weatherIcon.src =  "./img/drizzle.png";
               break;
               case 'Mist':
                   weatherIcon.src =  "./img/mist.png";

}

 document.querySelector(".weather").style.display = "block";
    searchBox.value = " ";
  });
}

async function getForcast(city){
   var res1 = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1c043f76b0c241d7b504b3045322c3f9&&units=metric`);

    res1.then(res1 => res1.json()).then(data =>{
     console.log(data);
for(i=0;i<5;i++){
         document.getElementById("day" +(i+1)+"Min").innerHTML = "Min:" +Number(data.list[i].main.temp_min -288.53).toFixed(1)+"0";
         document.getElementById("day" +(i+1)+"Max").innerHTML = "Max:" +Number(data.list[i].main.temp_max -288.53).toFixed(1)+"0";
      }
      for(i=0;i<5;i++){
          document.getElementById("day" +(i+1)+"Max").innerHTML = "Max:" +Number(data.list[i].main.temp_max -288.53).toFixed(1)+"0";
      }
      for(i=0;i<5;i++){
        document.getElementById("img"+(i+1)).src="http://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon+".png";
      }
    document.querySelector(".weather").style.display = "grid";
   })
  
   .catch(err => alert("Please Enter Valid City Name"))
 searchBox.value = " ";
   }

   
const d = new Date();
const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Sataurday"];

function checkDay(day){
   if(day +d.getDay()>6){
      return day+d.getDay()-7;
   }else{
      return day+d.getDay();
   }
}

for(i=0;i<5;i++){
   document.getElementById("day"+(i+1)).innerHTML =  weekday[checkDay(i)];
}
searchBtn.addEventListener("click",() =>{
     setInterval(changeBackground,5000);
      getWeather(searchBox.value); 
    getForcast(searchBox.value);

})

forecast.addEventListener("click",()=>{
    getForcast(searchBox.value);
})
 
