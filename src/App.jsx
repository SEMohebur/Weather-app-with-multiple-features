import React, { useEffect, useState } from "react";
import Navbar from "./Component/Navbar";
import WeatherPage from "./Page/WeatherPage";
import axios from "axios";
import Footer from "./Component/Footer";
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Bangladesh");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDaysForcast, setFiveDaysForCast] = useState(null);

  useEffect(() => {
    fetchWeatherApi();
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_Key = "5b122a6716e036d104813b02557ffe0e";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_Key}`
      )
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      });
  };

  const fetchWeatherApi = () => {
    const API_Key = "5b122a6716e036d104813b02557ffe0e";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`
      )

      .then((res) => {
        setWeatherData(res.data);
        fetchAirQualityData(res.data.coord.lat, res.data.coord.lon);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_Key}`
          )
          .then((response) => setFiveDaysForCast(response.data));
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (search) => {
    setCity(search);
  };

  const weatherCondition = weatherData?.weather?.[0]?.description;

  const getBackroundImage = () => {
    switch (weatherCondition) {
      case "overcast clouds":
        return "url('https://www.americanscientist.org/sites/americanscientist.org/files/200633011528_847.jpg')";
      case "clear sky":
        return "url('https://img.freepik.com/free-photo/white-cloud-blue-sky_1203-9446.jpg?ga=GA1.1.759070506.1714388588&semt=ais_hybrid&w=740')";
      case "heavy intensity rain":
        return "url('https://img.freepik.com/premium-photo/view-palm-trees-night_1048944-24134178.jpg?ga=GA1.1.759070506.1714388588&semt=ais_hybrid&w=740')";
      case "snow":
        return "url('https://img.freepik.com/free-vector/vector-illustration-winter-landscape_1441-130.jpg?ga=GA1.1.759070506.1714388588&semt=ais_hybrid&w=740')";
      case "scattered clouds":
        return "url('https://img.freepik.com/premium-photo/low-angle-view-mountain-against-sky_1048944-18448989.jpg?ga=GA1.1.759070506.1714388588&semt=ais_hybrid&w=740')";
      case "broken clouds":
        return "url('https://img.freepik.com/free-photo/dark-landscape-with-tree_198169-409.jpg?ga=GA1.1.759070506.1714388588&semt=ais_hybrid&w=740')";
      case "few clouds":
        return "url('https://img.freepik.com/premium-vector/abstract-blue-cloud-background-illustration_118124-8496.jpg?ga=GA1.1.759070506.1714388588&semt=ais_hybrid&w=740')";
      case "light rain":
        return "url('https://img.freepik.com/premium-vector/abstract-blue-cloud-background-illustration_118124-8496.jpg?ga=GA1.1.759070506.1714388588&semt=ais_hybrid&w=740')";
      default:
        return "url('https://img.freepik.com/free-vector/sunshine-background-poster_1284-9444.jpg?ga=GA1.1.759070506.1714388588&semt=ais_hybrid&w=740')";
    }
  };

  return (
    <div
      style={{
        backgroundImage: getBackroundImage(),

        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar onSearch={handleSearch} />
      <WeatherPage
        weatherData={weatherData}
        airQualityData={airQualityData}
        fiveDaysForcast={fiveDaysForcast}
      />
      <Footer />
    </div>
  );
};

export default App;
