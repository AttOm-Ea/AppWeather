import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios';
import Container from './components/Container';
import { RiThunderstormsFill, RiDrizzleFill, RiRainyFill, RiSnowyFill, RiSunFill, RiCloudFill, RiMistFill} from 'react-icons/ri';
import { FaSearchLocation } from "react-icons/fa";


function App() {
  // Splash screen
  const [onSplash, setOnSplash] = useState("");
  const [offSplash, offOnSplash] = useState("hidden");
  // Latitude and longitude
  const [lat, setLat] = useState("25.7751");
  const [long, setLong] = useState("-80.2105");
  // Data
  const [data, setData] = useState([]);
  // background
  const [bg, setBg] = useState("pocasNubes");
  const [classBg, setClassBg] = useState("bg-[url('/img/Clouds.jpg')]");
  // Units of measurement
  const [measurement, setMeasurement] = useState("imperial")
  const [unitMeasurement, setUnitMeasurement] = useState(true);
  // Hour and Date
  const [hour, setHour] = useState("00:00");
  const [today, setToday] = useState("Sunday / 01 / January");
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Agust', 'Septiember', 'October', 'November', 'December'];
  // Search New City
  const [city, setCity] = useState ("");
    
  useEffect(()=>{
    let today = new Date();
    setHour(today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setToday(days[today.getDay()] + " " + today.getDate()  + " / " + months[today.getMonth()]);
  },[]);

  useEffect(()=>{
    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
    };
    function success(pos) {
      const crd = pos.coords;
      setLat(crd.latitude);
      setLong(crd.longitude);
    }
    function error(err) {
      // alert("Problemas para obtener tu geolocalación, favor de permitir acceso... " + ` ** ${err.message} **`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  },[]); 
  
  useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3c4632ec6bdef3757692674f660daf23&units=${measurement}&lang=es`)
    .then(response => {
      setData(response);
      setTimeout(() => {
        switchSplash();  
      }, 4000);
    })
    .catch(console.error());
  },[lat]);

  useEffect(()=>{
    if(measurement == "metric"){
      setMeasurement("imperial");
    }else{
      setMeasurement("metric");
    }
  },[unitMeasurement]);

  useEffect(()=>{
    setBg(data.data?.weather[0].main);
    console.log(data.data?.weather[0].main);
  },[data]);

  useEffect(()=>{
    setClassBg("bg-[url('/img/" +  bg  + ".jpg')]");
  },[bg]);

  function switchSplash(load) {
    if (load) {
      setOnSplash("");
      offOnSplash("hidden");
    }else{
      setOnSplash("h-0")
      setTimeout(() => {
        setOnSplash("h-0 hidden")
      }, 3100);
      offOnSplash("");
    }
  }

  function searchCity(newCity) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=3c4632ec6bdef3757692674f660daf23&units=${measurement}&lang=es`)
    .then(response => {
      switchSplash(true);
      setData(response);
      setTimeout(() => {
        switchSplash();  
      }, 2000);
      })
    .catch(console.error());
  }
  

  return (
    <>
      <div className={'w-full h-screen bg-slate-700 flex justify-center items-center transition-all duration-[3000ms] ease-linear ' + onSplash}>
        <RiThunderstormsFill className='w-full md:w-1/12 h-1/5  text-white animate-pulse duration-[1000ms] delay-[1000ms]'/>
        <RiDrizzleFill className='w-full md:w-1/12 h-1/5 text-white animate-pulse duration-[2000ms] delay-[2000ms]'/>
        <RiRainyFill className='w-full md:w-1/12 h-1/5 text-white animate-pulse duration-[3000ms] delay-[3000ms]'/>
        <RiSnowyFill className='w-full md:w-1/12 h-1/5 text-white animate-pulse duration-[4000ms] delay-[4000ms]'/>
        <RiSunFill className='w-full md:w-1/12 h-1/5 text-white animate-pulse duration-[5000ms] delay-[5000ms]'/>
        <RiCloudFill className='w-full md:w-1/12 h-1/5 text-white animate-pulse duration-[6000ms] delay-[6000ms]'/>
        <RiMistFill className='w-full md:w-1/12 h-1/5 text-white animate-pulse duration-[7000ms] delay-[7000ms]'/>
      </div>
      <div className='w-full h-screen bg-slate-700 transition-all duration-[2000ms] ease-linear font-Montserrat'>
        <div className={"w-full h-full " + classBg + " bg-center bg-cover flex flex-col items-center transition-all duration-[2000ms] ease-linear " + offSplash +""}>
          <div className='w-full h-1/4 flex justify-center'>
            <div className='w-11/12 flex flex-col justify-center items-center'>
              <h1 className='w-full font-semibold text-blue-500 text-3xl text-left'> Weather app </h1>
              <div className='w-full flex justify-center items-center'>
                <input type="text" placeholder="Buscador de ciudad" onChange={(e)=>setCity(e.target.value)} onBlur={()=>searchCity(city)} className='w-11/12 h-7 bg-[#eeeded8b] focus:bg-white active:border-slate-300  border-slate-500 border pl-2 text-blue-400 rounded-bl-lg rounded-tl-lg capitalize'/>
                <button  className='w-1/12 h-7 p-1 bg-slate-500 rounded-br-md rounded-tr-md'> <FaSearchLocation className='h-full w-full text-white'/> </button>  
              </div>
            </div>
          </div>
          <Container hour={hour} today={today} data={data} temp={data.data?.main.temp} feelsLike={data.data?.main.feels_like} humidity={data.data?.main.humidity} max={data.data?.main.temp_max} min={data.data?.main.temp_min} city={data.data?.name} country={data.data?.sys.country} main={data.data?.weather[0].main} description={data.data?.weather[0].description} measurement={measurement}/>
          <div className='w-full h-10 flex justify-center items-center'>
            <div className='w-3/6 h-full bg-[#eeeded8b] flex rounded-bl-3xl rounded-br-3xl shadow shadow-slate-600'>
              <div className='w-1/2 flex justify-center items-center'>
                ºF <input type="radio" name="unitMeasurement" value="ºC" onClick={()=>setUnitMeasurement(true)} className='w-1/6 h-1/2 ml-3'/>   
              </div>
              <div className='w-1/2 flex justify-center items-center'>
                <input type="radio" name="unitMeasurement" value="ºF" onClick={()=>setUnitMeasurement(false)} className='w-1/6 h-1/2 mr-3'/> ºC    
              </div>
            </div>
          </div>  
        </div>  
      </div>
    </>
  )
}

export default App
