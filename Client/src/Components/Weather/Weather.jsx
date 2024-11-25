import React, { useEffect, useState, useRef } from 'react'
import './weather.css'
import searchIcon from '../../assets/searchIcon.png'
import drizzle from '../../assets/drizzle.png'
import hail from '../../assets/hail.jpg'
import partlyCloudy from '../../assets/partlyCloudy.png'
import rain from '../../assets/rain.jpg'
import snow from '../../assets/snow.png'
import storm from '../../assets/storm.png'
import sunny from '../../assets/sunny.png'
import sunny2 from '../../assets/sunny2.png'
import wind2 from '../../assets/wind2.png'
import hum from '../../assets/hum.jpg'
// import humid from '../../assets/humid.png'
import { useNavigate } from 'react-router-dom';
// import '../../.env'
import axios from 'axios'
// import { celToFar } from '../../utils/celToFar'
import L2 from '../../assets/L2.jpg'

const Weather = () => {

    const [city, setCity] = useState('')
    const [isCelsius, setIsCelsius] = useState(false)

    const [weatherData, setWeatherData] = useState({

    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.warn('position=', position)

                axios({
                    method: 'GET',
                    url: `http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${import.meta.env.VITE_APP_ID}`

                })
                    .then(res => {
                        // console.log("UseEffect", res)
                        setCity(res.data[0].name)
                        

                            handleSubmit(res.data[0].name)
                        

                    }
                    )


            }
        )




    }, [])


    const inputRef = useRef()






    // const [searchCity, setSearchCity] = useState('')


    // i really need to work on the icons  and i may need to just use the ones from 
    const allIcons = {
        '01d': sunny,
        '01n': sunny2,
        '02d': partlyCloudy,
        '02n': partlyCloudy,
        '03d': partlyCloudy,
        '03n': partlyCloudy,
        '04d': drizzle,
        '04n': drizzle,
        '09d': rain,
        '09n': rain,
        '10d': rain,
        '10n': rain,
        '11d': storm,
        '11n': storm,
        '13d': snow,
        '13n': snow,
        '50d': hail,
        '50n': hail
    }
    const navigate = useNavigate();


    const handleChange = (e) => {
        setCity(e.target.value);
        // console.log('e.target.val=', e.target.value)
    };




    const handleSubmit = (input) => {

        console.warn("SUMIT HIT", input)
        // if (city) {
        console.warn("SUMIT HIT  DSAFZSDFASZDTSAZEDRDSAZ")

        axios({
            method: "GET",
            url: city 
            ? 
            (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`) 
            : 
            (`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`) 
        })



            .then(res => {
                console.warn('res.data==', res.data)

                const weatherIconCode = res.data.weather[0].icon
                const weatherIcon = allIcons[weatherIconCode]
                setWeatherData({
                    temp: res.data.main.temp,
                    city: res.data.name,
                    humid: res.data.main.humidity,
                    wind: res.data.wind.speed,
                    icon: weatherIcon

                })
            })



            .catch(err => {
                console.warn(err)
                setWeatherData({})
            })


    }





    const handleLogout = () => {
        setCity('')
        setWeatherData(null)
        console.log('Logged out')
        navigate('/')
    };









    const convertTemperature = (tempInFarenheit) => {

        return isCelsius ? ((tempInFarenheit - 32) * 5) / 9 : tempInFarenheit

    }


    return (



        <div id='main'>


            {console.log('nav.geoloc', navigator.geolocation)}

            {console.log('city', city)}
            {/* {console.log('process.env',process.env.VITE_APP_ID)} */}
            <div className='weather'>

                {console.log('weatherData====', weatherData)}
                {/* <h1>Weather</h1> */}

                {/* always console.log comp */}
                {console.log("Weather Comp HIT obj values", Object.values(weatherData))}


                <div className="searchbar">


                    <input type="text" ref={inputRef} placeholder='Search' value={city} onChange={(e) => handleChange(e)} />

                    <img src={L2} alt="SearchIcon" id='searchIcon' onClick={(e) => handleSubmit(e)} />


                </div>

                {Object.values(weatherData).length != 0


                    ?
                    (

                        <>


                            <img src={weatherData.icon} alt="weatherIcon" className='weatherIcon' />

                            <p className='temp'>
                                {`${convertTemperature(weatherData.temp).toFixed()} °${isCelsius ? 'C' : 'F'}`}
                            </p>


                            <p className='location'>{weatherData.city}</p>

                            <button onClick={() => setIsCelsius(!isCelsius)}>
                                {isCelsius ? 'Fahrenheit' : 'Celsius'}
                            </button>

                            <div className='weatherData'>


                                <div className='col'>

                                    <img src={hum} alt="humidIcon" className='hum' />

                                    <div id='humidityDiv'>

                                        <p>{weatherData.humid}</p>

                                        <span>Humidity</span>

                                    </div>

                                </div>


                                <div className='col'>

                                    <img src={wind2} alt="windIcon" className='wind' />

                                    <div id='windSpeedDiv'>

                                        <p>{weatherData.wind}</p>

                                        <span>Wind Speed</span>

                                    </div>

                                </div>


                            </div>

                        </>

                    )
                    :
                    (
                        <p></p>
                    )
                }



                <button className='logoutButton' onClick={handleLogout}>

                    Logout

                </button>



            </div>

        </div >
    )
}

export default Weather







