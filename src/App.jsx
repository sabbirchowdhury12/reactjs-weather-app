/* eslint-disable react/jsx-key */
import "./App.css";

// App.js
import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import Header from "./components/Header";
import dateService from "./service/dateService";
import { formatTime } from "./service/formateTime";

const API_KEY = "48067578739becc7133c43cd118e395a";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

const list = [
  "High Temperature",
  "Low Temperature",
  "Humidity",
  "Sunrise Time",
  "Sunset Time",
];
const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}?q=${city}&appid=${API_KEY}`
      );
      console.log(response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // 5 days forecast
  const dailyForecast =
    weatherData?.list?.filter((reading) =>
      reading.dt_txt.includes("12:00:00")
    ) || [];

  // convert to dms
  const latitude = weatherData?.city?.coord?.lat;
  const longitude = weatherData?.city?.coord?.lon;
  function convertDecimalToDMS(decimal) {
    const degrees = Math.floor(decimal);
    const minutesDecimal = (decimal - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = Math.round((minutesDecimal - minutes) * 60);

    return `${degrees}°${minutes}'${seconds}''`;
  }
  const latitudeDMS = convertDecimalToDMS(latitude);
  const longitudeDMS = convertDecimalToDMS(longitude);

  //date
  const formatedDate = dateService(dailyForecast[0]?.dt);

  //time
  const sunrise = new Date(weatherData?.city?.sunrise * 1000);
  const sunset = new Date(weatherData?.city?.sunset * 1000);

  const sunriseTime = formatTime(sunrise);
  const sunsetTime = formatTime(sunset);

  return (
    <div className="app body-bg h-screen">
      <Header setWeatherData={setWeatherData} />

      <div className=" px-4  lg:w-4/5 lg:mx-auto ">
        <div className="flex items-center justify-between border-b  py-8 border-gray-700">
          {Object.keys(weatherData).length > 0 ? (
            <div className="flex  gap-2">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-1"
              >
                <g id="material-symbols:share-location">
                  <path
                    id="Vector"
                    d="M16.2188 27.4375V24.9375C17.0938 24.8125 17.9425 24.5729 18.765 24.2188C19.5883 23.8646 20.3646 23.4167 21.0938 22.875L22.9063 24.6875C21.9271 25.4583 20.875 26.0783 19.75 26.5475C18.625 27.0158 17.4479 27.3125 16.2188 27.4375ZM24.6562 22.875L22.9063 21.125C23.4479 20.4375 23.8854 19.6821 24.2188 18.8587C24.5521 18.0362 24.7812 17.1667 24.9062 16.25H27.4688C27.3021 17.5417 26.9846 18.7446 26.5163 19.8587C26.0471 20.9737 25.4271 21.9792 24.6562 22.875ZM24.9062 13.75C24.7812 12.8125 24.5521 11.9321 24.2188 11.1087C23.8854 10.2863 23.4479 9.54167 22.9063 8.875L24.6562 7.125C25.4479 8.04167 26.0888 9.0625 26.5788 10.1875C27.0679 11.3125 27.3646 12.5 27.4688 13.75H24.9062ZM13.7188 27.4375C10.5313 27.0625 7.87 25.6929 5.735 23.3288C3.59917 20.9638 2.53125 18.1875 2.53125 15C2.53125 11.7708 3.59917 8.97917 5.735 6.625C7.87 4.27083 10.5313 2.91667 13.7188 2.5625V5.0625C11.2188 5.41667 9.14583 6.53125 7.5 8.40625C5.85417 10.2812 5.03125 12.4792 5.03125 15C5.03125 17.5 5.85417 19.6875 7.5 21.5625C9.14583 23.4375 11.2188 24.5625 13.7188 24.9375V27.4375ZM21.1562 7.125C20.4062 6.5625 19.6146 6.10417 18.7812 5.75C17.9479 5.39583 17.0938 5.16667 16.2188 5.0625V2.5625C17.4479 2.66667 18.625 2.95292 19.75 3.42125C20.875 3.89042 21.9271 4.52083 22.9063 5.3125L21.1562 7.125ZM15 21.25C13.3125 19.8125 12.0575 18.4842 11.235 17.265C10.4117 16.0467 10 14.9167 10 13.875C10 12.3125 10.5054 11.0679 11.5163 10.1412C12.5262 9.21375 13.6875 8.75 15 8.75C16.3125 8.75 17.4742 9.21375 18.485 10.1412C19.495 11.0679 20 12.3125 20 13.875C20 14.9167 19.5883 16.0467 18.765 17.265C17.9425 18.4842 16.6875 19.8125 15 21.25ZM15 15C15.375 15 15.6929 14.87 15.9537 14.61C16.2137 14.3492 16.3437 14.0312 16.3437 13.6562C16.3437 13.3021 16.2137 12.9896 15.9537 12.7188C15.6929 12.4479 15.375 12.3125 15 12.3125C14.625 12.3125 14.3075 12.4479 14.0475 12.7188C13.7867 12.9896 13.6562 13.3021 13.6562 13.6562C13.6562 14.0312 13.7867 14.3492 14.0475 14.61C14.3075 14.87 14.625 15 15 15Z"
                    fill="#1D2540"
                  />
                </g>
              </svg>
              <div>
                <p className="text-[24px] font-bold">
                  {city}, {weatherData?.city?.country}
                </p>

                <p className="text-[14px] text-[#606060] mt-1">
                  {`${latitudeDMS} N & ${longitudeDMS} E`}
                </p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex items-center rounded bg-white shadow-md px-4 py-2">
            <input
              type="text "
              onChange={(e) => setCity(e.target.value)}
              className="text-sm  text-[#444] focus:outline-none italic placeholder-gray-800"
              placeholder="enter your city here"
            />
            <button onClick={handleSearch}>
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Search Icon">
                  <path
                    id="Vector"
                    d="M18.7929 16.6517H17.86L17.5294 16.3328C18.7266 14.9442 19.3846 13.1714 19.3833 11.3379C19.3833 9.81986 18.9332 8.3359 18.0898 7.07368C17.2464 5.81147 16.0476 4.82769 14.6451 4.24676C13.2426 3.66582 11.6994 3.51382 10.2105 3.80998C8.72161 4.10614 7.35398 4.83715 6.28055 5.91058C5.20713 6.984 4.47611 8.35163 4.17996 9.84052C3.8838 11.3294 4.0358 12.8727 4.61673 14.2752C5.19766 15.6777 6.18144 16.8764 7.44366 17.7198C8.70587 18.5632 10.1898 19.0133 11.7079 19.0133C13.609 19.0133 15.3567 18.3166 16.7028 17.1594L17.0216 17.4901V18.4229L22.9258 24.3153L24.6852 22.5558L18.7929 16.6517ZM11.7079 16.6517C8.76762 16.6517 6.39414 14.2782 6.39414 11.3379C6.39414 8.39764 8.76762 6.02417 11.7079 6.02417C14.6482 6.02417 17.0216 8.39764 17.0216 11.3379C17.0216 14.2782 14.6482 16.6517 11.7079 16.6517Z"
                    fill="#444444"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex gap-8 mt-10">
          <div className="min-w-[150px] mt-10">
            <p>Select Date:</p>
            <div className="flex items-center gap-2 border border-gray-900 bg-[#D9D9D9] text-[#444] p-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="simple-line-icons:calender" clipPath="url(#clip0_5_171)">
                  <path
                    id="Vector"
                    d="M22.1674 2.31985L16.3366 2.31987V0.868546C16.3366 0.466209 16.0108 0.140335 15.6084 0.140335C15.2061 0.140335 14.8802 0.466209 14.8802 0.868546V2.31951H9.05453V0.868546C9.05453 0.466209 8.72865 0.140335 8.32631 0.140335C7.92398 0.140335 7.5981 0.466209 7.5981 0.868546V2.31951H1.77751C0.973204 2.31951 0.321091 2.97162 0.321091 3.77593V21.9812C0.321091 22.7855 0.973204 23.4376 1.77751 23.4376H22.1674C22.9717 23.4376 23.6238 22.7855 23.6238 21.9812V3.77593C23.6238 2.97196 22.9717 2.31985 22.1674 2.31985ZM22.1674 21.9812H1.77751V3.77593H7.5981V4.5096C7.5981 4.91191 7.92398 5.23781 8.32631 5.23781C8.72865 5.23781 9.05453 4.91191 9.05453 4.5096V3.77629H14.8802V4.50996C14.8802 4.9123 15.2061 5.23818 15.6084 5.23818C16.0108 5.23818 16.3366 4.9123 16.3366 4.50996V3.77629H22.1674V21.9812ZM17.0699 11.7866H18.5264C18.9283 11.7866 19.2546 11.4604 19.2546 11.0584V9.60196C19.2546 9.19998 18.9283 8.87375 18.5264 8.87375H17.0699C16.668 8.87375 16.3417 9.19998 16.3417 9.60196V11.0584C16.3417 11.4604 16.668 11.7866 17.0699 11.7866ZM17.0699 17.6119H18.5264C18.9283 17.6119 19.2546 17.286 19.2546 16.8837V15.4273C19.2546 15.0253 18.9283 14.6991 18.5264 14.6991H17.0699C16.668 14.6991 16.3417 15.0253 16.3417 15.4273V16.8837C16.3417 17.2864 16.668 17.6119 17.0699 17.6119ZM12.7007 14.6991H11.2443C10.8423 14.6991 10.516 15.0253 10.516 15.4273V16.8837C10.516 17.286 10.8423 17.6119 11.2443 17.6119H12.7007C13.1026 17.6119 13.4289 17.286 13.4289 16.8837V15.4273C13.4289 15.0257 13.1026 14.6991 12.7007 14.6991ZM12.7007 8.87375H11.2443C10.8423 8.87375 10.516 9.19998 10.516 9.60196V11.0584C10.516 11.4604 10.8423 11.7866 11.2443 11.7866H12.7007C13.1026 11.7866 13.4289 11.4604 13.4289 11.0584V9.60196C13.4289 9.19962 13.1026 8.87375 12.7007 8.87375ZM6.87499 8.87375H5.41857C5.0166 8.87375 4.69036 9.19998 4.69036 9.60196V11.0584C4.69036 11.4604 5.0166 11.7866 5.41857 11.7866H6.87499C7.27696 11.7866 7.6032 11.4604 7.6032 11.0584V9.60196C7.6032 9.19962 7.27696 8.87375 6.87499 8.87375ZM6.87499 14.6991H5.41857C5.0166 14.6991 4.69036 15.0253 4.69036 15.4273V16.8837C4.69036 17.286 5.0166 17.6119 5.41857 17.6119H6.87499C7.27696 17.6119 7.6032 17.286 7.6032 16.8837V15.4273C7.6032 15.0257 7.27696 14.6991 6.87499 14.6991Z"
                    fill="#444444"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5_171">
                    <rect
                      width="23.3028"
                      height="23.3028"
                      fill="white"
                      transform="translate(0.321091 0.137619)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="font-bold text-[13px]">{formatedDate}</p>
            </div>
            {list.map((item) => {
              return <p className="my-3 text-[15px] font-normal">{item}</p>;
            })}
          </div>
          <div className="flex gap-4 w-full">
            {dailyForecast.map((day) => (
              <WeatherCard
                key={day.dt}
                day={day}
                sunriseTime={sunriseTime}
                sunsetTime={sunsetTime}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
