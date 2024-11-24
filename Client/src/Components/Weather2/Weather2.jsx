import React, { useState } from 'react';
import './weather2.css';
import searchIcon from '../../assets/searchIcon.png';
import drizzle from '../../assets/drizzle.png';
import hail from '../../assets/hail.jpg';
import partlyCloudy from '../../assets/partlyCloudy.png';
import rain from '../../assets/rain.jpg';
import snow from '../../assets/snow.png';
import storm from '../../assets/storm.png';
import sunny from '../../assets/sunny.png';
import sunny2 from '../../assets/sunny2.png';
import wind2 from '../../assets/wind2.png';
import hum from '../../assets/hum.jpg';
import { useNavigate } from 'react-router-dom';
import { celToFar } from '../../utils/celToFar';

const Weather2 = () => {
    const [city, setCity] = useState('');
    const [searchCity, setSearchCity] = useState(''); // Triggers the API call
    const [weatherData, setWeatherData] = useState({
        temperature: null,
        humidity: null,
        windSpeed: null,
        location: '',
        icon: null,
    });

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
        '50n': hail,
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const search = async () => {
        if (!city.trim()) return; // Prevent empty searches
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                console.error('City not found');
                return;
            }

            const icon = allIcons[data.weather[0].icon] || sunny; // Default icon
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });

            setSearchCity(city); // Update searchCity state
        } catch (error) {
            console.log('ERROR fetching weather data!!!!', error);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        search(); // Trigger the search function
    };

    const handleLogout = () => {
        setCity('');
        setSearchCity('');
        setWeatherData({
            temperature: null,
            humidity: null,
            windSpeed: null,
            location: '',
            icon: null,
        });
        navigate('/');
    };

    return (
        <div id="main">
            <div className="weather">
                <div className="searchbar">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={city}
                            onChange={handleChange}
                        />
                        <img
                            src={searchIcon}
                            alt="SearchIcon"
                            id="searchIcon"
                            onClick={search}
                        />
                    </form>
                </div>

                {weatherData.icon && (
                    <img src={weatherData.icon} alt="Weather Icon" className="weatherIcon" />
                )}

                <p className="temp">
                    {weatherData.temperature ? `${weatherData.temperature} °F` : ''}
                </p>

                <div className="weatherData">
                    <div className="col">
                        <img src={hum} alt="Humidity Icon" className="hum" />
                        <div>
                            <p>{weatherData.humidity}</p>
                            <span>Humidity</span>
                        </div>
                    </div>

                    <div className="col">
                        <img src={wind2} alt="Wind Icon" className="wind" />
                        <div>
                            <p>{weatherData.windSpeed}</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>

                <button className="logoutButton" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Weather2;