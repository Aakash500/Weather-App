import axios from "axios";
import { useState, createContext, useEffect } from "react";

// components imported
import Search from "./Search";
import Temperature from "./Temperature";
import Wrapper from "./Wrapper";
import Weathericon from "./Weathericon";
import Contentwrapper from "./Contentwrapper";
import Tempload from "./Tempload";
import Rendermessage from "./Rendermessage";
import Forecast from "./Forecast";
import data from "./Data";
import Dayforecast from "./Dayforecast";

// context
export const Cityname = createContext("");

const Main = () => {
  const KEY = "d5b92cd493f6fed09a8226a3703645e7"
  const firstRenderMessage = "Please search with city name";
  const dataNotAvailable = "Data is not available for searched city";
  const [cityName, setCityName] = useState("");
  const [coords, setCoords] = useState({ lat: -1, log: -1 });
  const [weatherData, setWeatherData] = useState({});
  const [tempLoad, setTempLoad] = useState(true);
  const [errorMessage, setErrorMessage] = useState(firstRenderMessage);
  const [weatherInfo, setWeatherInfo] = useState({
    humidity: 0,
    feelsLike: 0,
    pressure: 0,
    wind: 0,
  });

  function handleCityChange(city) {
    setCityName((prevState) => {
      if (prevState === city) {
        setTempLoad(false);
      } else {
        setTempLoad(true);
      }
      return city;
    });
  }

  const kelvinTocelcius = (temp) => temp - 273.15;

  async function fetchCoords() {
    try {
      const resp = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${KEY}`
      );
      const data = resp.data[0];
      if (data !== undefined) {
        setCoords({
          ...coords,
          lat: data.lat,
          log: data.lon,
        });
        setErrorMessage("");
      } else {
        setCoords({
          ...coords,
          lat: -1,
          log: -1,
        });

        setErrorMessage(dataNotAvailable);
        setTempLoad(false);
      }
    } catch (error) {
      setTempLoad(false);
    }
  }

  async function fetchUIdata() {
    try {
      const { lat, log } = coords;
      const resp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${KEY}`
      );
      setWeatherData(resp.data);
      setTempLoad(false);

      setWeatherInfo({
        humidity: resp.data.main.humidity + " %",
        feelsLike:
          Math.floor(kelvinTocelcius(resp.data.main.feels_like)) + " \u00B0C",
        pressure: resp.data.main.pressure + " hPa",
        wind: resp.data.wind.speed + " m/s",
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (cityName != null) {
      fetchCoords();
    }
  }, [cityName]);

  useEffect(() => {
    if (coords.lat !== -1 && coords.log !== -1) {
      fetchUIdata();
    }
  }, [coords.log, coords.lat]);

  return (
    <Cityname.Provider value={{ handleCityChange: handleCityChange }}>
      <Wrapper>
        <Search />
        {errorMessage === firstRenderMessage ? (
          <Rendermessage messg={firstRenderMessage} />
        ) : tempLoad ? (
          <Tempload />
        ) : errorMessage === dataNotAvailable ? (
          <Rendermessage messg={dataNotAvailable} />
        ) : (
          <Contentwrapper>
            <Weathericon
              url={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
            <Temperature
              temp={Math.floor(kelvinTocelcius(weatherData.main.temp))}
              desc={weatherData.weather[0].description}
            />
            <Forecast>
              {data.map((item, i) => {
                return (
                  <Dayforecast
                    title={item.title}
                    icon={item.icon}
                    data={Object.values(weatherInfo)[i]}
                  />
                );
              })}
            </Forecast>
          </Contentwrapper>
        )}
      </Wrapper>
    </Cityname.Provider>
  );
};

export default Main;
