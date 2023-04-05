
import { useEffect, useState } from 'react';
import { RiThunderstormsFill, RiDrizzleFill, RiRainyFill, RiSnowyFill, RiSunFill, RiCloudFill, RiMistFill} from 'react-icons/ri';


export default function Container({hour, today, temp, feelsLike, humidity, max, min, city, country, main, description, measurement}){
    //Custom Icons 
    const weather = {
        Thunderstorm : <RiThunderstormsFill className='w-full h-5/6'/>,
        Drizzle : <RiDrizzleFill className='w-full h-5/6'/>,
        Rain : <RiRainyFill className='w-full h-5/6'/>,
        Snow : <RiSnowyFill className='w-full h-5/6'/>,
        Clear : <RiSunFill className='w-full h-5/6'/>,
        Clouds : <RiCloudFill className='w-full h-5/6'/>,
        Mist : <RiMistFill className='w-full h-5/6'/>,
        Fog : <RiMistFill className='w-full h-5/6'/>,
        Squall : <RiMistFill className='w-full h-5/6'/>,
        Tornado : <RiMistFill className='w-full h-5/6'/>,
    };
    // Units of measurement
    const [newTemp, serNewTemp] = useState(0);
    const [newFeelsLike, serNewFeelsLike] = useState(0);
    const [newHumidity, serNewHumidity] = useState(0);
    const [newMax, serNewMax] = useState(0);
    const [newMin, serNewMin] = useState(0);

    useEffect(()=>{
        if (measurement != "imperial") {
            serNewTemp((temp * 1.8) + 32);
            serNewFeelsLike((feelsLike * 1.8) + 32);
            serNewHumidity((humidity * 1.8) + 32);
            serNewMax((max * 1.8) + 32);
            serNewMin((min * 1.8) + 32);
        }else{
            if (temp){
                serNewTemp(temp? temp : 0);
                serNewFeelsLike(feelsLike? feelsLike : 0);
                serNewHumidity(humidity? humidity : 0);
                serNewMax(max? max : 0);    
                serNewMin(min? min : 0);    
            }
        }
    },[temp, measurement])


    return(
        <div className="w-11/12 xl:w-10/12 h-2/5 md:h-3/5 rounded-3xl backdrop-blur flex flex-wrap border-slate-200 border-b border-r shadow shadow-slate-600 text-slate-800 text-truncate">
            <div className="w-full h-1/5 pl-4 pt-2 border-b">
                <div className="font-semibold text-2xl mt-1"> {city? city: "..." }  /  {  country? country : " .... "} </div>
                <div className='capitalize pl-2 pt-0 text-lg -mt-2'>{description? description: "..."}</div>    
            </div>
            <div className="w-2/5 h-4/5 flex flex-col justify-center items-center">
                <div className='text-5xl lg:text-7xl font-semibold'> {hour} </div>
                <div className='text-base lg:text-2xl font-light '> {today} </div>
            </div>
            <div className="w-3/5 h-4/5">
                <div className="h-2/5 flex justify-center items-center text-blue-500"> {main? weather[main]: "..."} </div>
                <div className="h-3/5 flex flex-col justify-start items-start">
                    <div className='w-full flex items-end justify-center border-b'>
                        <div className="text-3xl font-semibold "> {newTemp}º / </div>        
                        <div className='pb-1 pl-1 text-1xl font-semibold text-blue-500'> {main? main: "..."}</div>
                    </div>
                    <div className="w-full h-full flex lg:flex-wrap flex-col lg:flex-row justify-evenly items-center lg:text-xl text-center">
                        <div className='lg:w-1/2'>FeelsLike <span className="text-blue-500"> {newFeelsLike}º</span> </div>
                        <div className='lg:w-1/2'> Humidity <span className="text-blue-500"> {newHumidity}º</span> </div>
                        <div className='lg:w-1/2'>Max <span className="text-blue-500"> {newMax}º</span> </div>
                        <div className='lg:w-1/2'>Min <span className="text-blue-500"> {newMin}º</span> </div>
                    </div>    
                </div>
            </div> 
        </div>        
    )
    
}