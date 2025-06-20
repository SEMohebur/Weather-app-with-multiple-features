import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1">© {year} WeatherApp by Md Mohebur</p>
        <p className="mb-0">
          API source: <a>OpenWeather</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
