import { IoIosSunny } from "react-icons/io";
import { MdOutlineSevereCold } from "react-icons/md";
import { FaCloud } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { FaCloudMoon } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { LuWindArrowDown } from "react-icons/lu";
import { MdVisibility } from "react-icons/md";
import { CiTempHigh } from "react-icons/ci";
import { useEffect, useState } from "react";

const WeatherPage = ({ weatherData, airQualityData, fiveDaysForcast }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "city not available";
  const countryName = weatherData?.sys?.country || "country not avilable";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "Date not available";

  const rednderTampereture = () => {
    if (temperatureCelsius > 23) {
      return <IoIosSunny className=" h3 text-warning" />;
    } else if (temperatureCelsius < 10) {
      return <MdOutlineSevereCold className=" h3" />;
    } else return <FaCloud className=" h3" />;
  };

  //TodayHiligth

  const aqi = airQualityData?.main?.aqi;

  const randerAirQuantityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  const co = airQualityData?.components?.co ?? null;
  const no = airQualityData?.components?.no ?? null;
  const no2 = airQualityData?.components?.no2 ?? null;
  const o3 = airQualityData?.components?.o3 ?? null;

  const sunrise = weatherData?.sys?.sunrise ?? null;
  const sunset = weatherData?.sys?.sunset ?? null;

  const humidity = weatherData?.main?.humidity ?? null;
  const feels_like = weatherData?.main?.feels_like ?? null;
  const pressure = weatherData?.main?.pressure ?? null;
  const visibility = weatherData?.visibility ?? null;

  const formData = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  //fiveDaysForcast
  const firstDay = fiveDaysForcast?.list[1];
  const secendDay = fiveDaysForcast?.list[7];
  const thirdDay = fiveDaysForcast?.list[14];
  const fourthDay = fiveDaysForcast?.list[21];
  const fifthDay = fiveDaysForcast?.list[28];

  //current date time
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className=" pb-5 pt-4">
      <div className=" row  justify-content-center ">
        {/*left side*/}
        <div className=" col-3  text-white text-center">
          <div className=" bg-secondary rounded-3">
            <h4 className=" p-1">Now</h4>
            <div>
              <h4>{temperatureCelsius} c</h4> {rednderTampereture()}
            </div>
            <div>{weatherDescription}</div>
            <div className=" text-center">
              <IoCalendarOutline className=" me-1 mb-1" />
              {currentDate}
            </div>

            <div className=" pb-2">
              <FaLocationDot className="m-1" />
              <span>
                {cityName},{countryName}
              </span>
            </div>
          </div>

          {/*forCustFiveDays*/}
          <div className=" p-1 mt-4 secendaryCustomColor rounded">
            <h5 className=" text-secondary text-white rounded mt-2">
              Forecast
            </h5>
            <div className=" bg-secondary rounded mt-2">
              <div className=" d-md-flex justify-content-center gap-2 p-md-2">
                <div>
                  {" "}
                  {firstDay?.dt_txt ? formData(firstDay.dt_txt) : "N/A"}
                </div>
                <div>{firstDay ? Math.round(firstDay.main.temp) : "N/A"}°C</div>
                <div>{firstDay ? firstDay.weather[0].description : "N/A"}</div>
              </div>
            </div>
            <div className=" bg-secondary rounded mt-2">
              <div className="d-md-flex justify-content-center gap-2 p-md-2">
                <div>
                  {secendDay?.dt_txt ? formData(secendDay.dt_txt) : "N/A"}
                </div>
                <div>
                  {secendDay ? Math.round(secendDay.main.temp) : "N/A"}°C
                </div>
                <div>
                  {secendDay ? secendDay.weather[0].description : "N/A"}
                </div>
              </div>
            </div>
            <div className=" bg-secondary rounded mt-2">
              <div className="d-md-flex justify-content-center gap-2 p-md-2">
                <div>
                  {" "}
                  {thirdDay?.dt_txt ? formData(thirdDay.dt_txt) : "N/A"}
                </div>
                <div>{thirdDay ? Math.round(thirdDay.main.temp) : "N/A"}°C</div>
                <div>{thirdDay ? thirdDay.weather[0].description : "N/A"}</div>
              </div>
            </div>
            <div className=" bg-secondary rounded mt-2">
              <div className="d-md-flex justify-content-center gap-2 p-md-2">
                <div>
                  {" "}
                  {fourthDay?.dt_txt ? formData(fourthDay.dt_txt) : "N/A"}
                </div>
                <div>
                  {fourthDay ? Math.round(fourthDay.main.temp) : "N/A"}°C
                </div>
                <div>
                  {fourthDay ? fourthDay.weather[0].description : "N/A"}
                </div>
              </div>
            </div>
            <div className=" bg-secondary rounded mt-2">
              <div className=" d-md-flex justify-content-center gap-2 p-md-2">
                <div>
                  {" "}
                  {fifthDay?.dt_txt ? formData(fifthDay.dt_txt) : "N/A"}
                </div>
                <div>{fifthDay ? Math.round(fifthDay.main.temp) : "N/A"}°C</div>
                <div>{fifthDay ? fifthDay.weather[0].description : "N/A"}</div>
              </div>
            </div>
          </div>
        </div>

        {/*right side*/}
        <div className=" col-7 text-white ">
          <div className=" bg-secondary rounded-3 p-3">
            <div className=" d-flex justify-content-between align-items-center">
              <div className="">Today Highlights</div>
              <div className=" secendaryCustomColor p-1 rounded">
                {dateTime.toLocaleString()}
              </div>
            </div>
            <div className="">
              <div className=" row d-flex justify-content-center">
                {/*air quality index*/}
                <div
                  style={{ height: 200, width: 300 }}
                  className=" col-md-3 secendaryCustomColor p-2 m-1 rounded-2"
                >
                  <div className=" d-flex justify-content-between mt-3">
                    <span>Air Quality Index</span>
                    <span className=" renderDescColor p-1 rounded-2">
                      {randerAirQuantityDescription(aqi)}
                    </span>
                  </div>
                  <div className=" mt-3 ms-3">
                    <FaWind className=" h3" />
                  </div>
                  <div className=" d-flex justify-content-evenly">
                    <div>
                      <div>CO</div>
                      <div>
                        <span className=" extraSmall">{co} µg/m³</span>
                      </div>
                    </div>
                    <div>
                      <div>NO</div>
                      <div>
                        <span className=" extraSmall">{no} µg/m³</span>
                      </div>
                    </div>
                    <div>
                      <div>NO₂</div>
                      <div>
                        <span className=" extraSmall">{no2} µg/m³</span>
                      </div>
                    </div>
                    <div>
                      <div>O₃</div>
                      <div>
                        <span className=" extraSmall">{o3} µg/m³</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/*sunrise and sunset*/}
                <div
                  style={{ height: 200, width: 300 }}
                  className=" col-md-3 secendaryCustomColor p-2 m-1 rounded-2"
                >
                  <div className=" mt-3">
                    <span>Sunrise And Sunset</span>
                  </div>
                  <div className=" d-flex justify-content-evenly mt-4 text-center ">
                    {/*sunrise*/}
                    <div>
                      <div>
                        <IoMdSunny className=" h2" />
                      </div>
                      <div>
                        <span>
                          {new Date(sunrise * 1000).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    {/*sunrise*/}
                    <div>
                      <div>
                        <FaCloudMoon className=" h2" />
                      </div>
                      <div>
                        <span>
                          {new Date(sunset * 1000).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Humidity, pressure, visibility, feelslike*/}
            <div className="my-1 mx-2">
              <div className=" row gap-2">
                <div
                  style={{ height: 80 }}
                  className=" col secendaryCustomColor rounded"
                >
                  <h6 className=" mt-3">Humidity</h6>
                  <div className=" d-flex justify-content-between">
                    <div>
                      <IoIosWater className=" h5" />
                    </div>
                    <div className=" h6">{humidity}%</div>
                  </div>
                </div>
                <div
                  style={{ height: 80 }}
                  className=" col secendaryCustomColor rounded"
                >
                  <h6 className=" mt-3">Pressure</h6>
                  <div className=" d-flex justify-content-between">
                    <div>
                      <LuWindArrowDown className=" h5" />
                    </div>
                    <div className=" h6">{pressure} hPa</div>
                  </div>
                </div>
                <div
                  style={{ height: 80 }}
                  className=" col secendaryCustomColor rounded"
                >
                  <h6 className=" mt-3">Visibility</h6>
                  <div className=" d-flex justify-content-between">
                    <div>
                      <MdVisibility className=" h5" />
                    </div>
                    <div className=" h6">{visibility / 1000}km</div>
                  </div>
                </div>
                <div
                  style={{ height: 80 }}
                  className=" col secendaryCustomColor rounded"
                >
                  <h6 className=" mt-3">Feels Like</h6>
                  <div className=" d-flex justify-content-between">
                    <div>
                      <CiTempHigh className=" h5" />
                    </div>
                    <div className=" h6">{feels_like} °C</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
