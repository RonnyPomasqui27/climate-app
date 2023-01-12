import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Climate = () => {

  const [climate, setClimate] = useState({});
  let iconUrl = climate.weather?.[0].icon;
  const [isTransform, setIsTransform] = useState(true)
  // CONVERSIONES 
  let celciusMax = Math.round(climate.main?.temp_max - 273.15),
    celciusMin = Math.round(climate.main?.temp_min - 273.15),
    celcius = Math.round(climate.main?.temp - 273.15);
  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4f06ad45ebda64f08b293021632d7f2d`)
        .then(res => setClimate(res.data));
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [])

  return (
    <section className='climate_container'>
      <div className="climate_flex">
        <div className="cli_info">
          <p>{climate.sys?.country} - {climate.name}</p>
        </div>
        <div className="container">
          <div className="img_container">
            <img src={`http://openweathermap.org/img/wn/${iconUrl}@2x.png`} className='img' />
          </div>
          <p>{isTransform ? celcius + ' °C' : climate.main?.temp + ' °K'}</p>
          <div className="con">
            <p><b>Temp Max: </b>{isTransform ? celciusMax + ' °C' : climate.main?.temp_max + ' °K'}</p>
            <p><b>Temp Min: </b>{isTransform ? celciusMin + ' °C' : climate.main?.temp_min + ' °K'}</p>
          </div>
          {/* <button >transform</button> */}
          <a onClick={() => setIsTransform(!isTransform)}><i className="fa-solid fa-shuffle"></i></a>
        </div>
      </div>
      <div className="extra_info">
        <h2>{climate.weather?.[0].description}</h2>
        <div className="info_pre">
          <div className="icnon">
            <i className="fa-solid fa-cloud active"></i>
            <div className='hola'>
              <p>Clouds:  {climate.clouds?.all}%</p>
            </div>
          </div>
          <div className="icnon">
            <i className="fa-solid fa-wind active"></i>
            <div className='hola'>
              <p>Wind Speed:  {climate.wind?.speed} m/s</p>
            </div>
          </div>
          <div className="icnon">
            <i className="fa-solid fa-ruler-vertical active"></i>
            <div className='hola'>
              <p>Pressure:  {climate.main?.pressure} Pa</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Climate;