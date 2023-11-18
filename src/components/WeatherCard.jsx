import dateService from "../service/dateService";
import { iconService } from "../service/iconService";

/* eslint-disable react/prop-types */
const WeatherCard = ({ day, sunriseTime, sunsetTime }) => {
  //covert date
  const formattedDate = dateService(day?.dt);

  //generete max, min temperature
  const temperatureMaxCelsius = day?.main?.temp_max - 273.15;
  const temperatureMinCelsius = day?.main?.temp_min - 273.15;

  // generate icon
  const icon = iconService(day?.weather[0]?.main);

  return (
    <div className="weather-card w-full ">
      <p className="text-center font-bold">{formattedDate}</p>

      <div className="card card-style text-center text-white p-4">
        <div className="flex items-center gap-2 justify-center border-b pb-2">
          {icon}
          <p>{day?.weather[0].main}</p>
        </div>
        <p className="my-2">{temperatureMaxCelsius.toFixed(0)}°C </p>
        <p>{temperatureMinCelsius.toFixed(0)}°C </p>
        <p className="my-2">{day?.main?.humidity}% </p>
        <p>{sunriseTime}</p>
        <p className="my-2">{sunsetTime}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
