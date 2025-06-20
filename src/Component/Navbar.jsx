import React, { useState } from "react";
import { CiCloudRainbow } from "react-icons/ci";
import { MdMyLocation } from "react-icons/md";

const Navbar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };
  return (
    <nav className="  p-3 navbarColor">
      {/*perent div*/}
      <div className=" p-2  d-md-flex text-center gap-2 justify-content-between">
        {/*weather icon*/}
        <div className=" mt-1 text-white">
          <CiCloudRainbow className=" h3" />
          <span>Weather</span>
        </div>

        {/*Search input*/}
        <div className=" d-flex bg-secondar">
          <input
            type="text"
            value={searchCity}
            placeholder="Search city"
            onChange={(e) => setSearchCity(e.target.value)}
            className=" form-control"
          />
          <button onClick={handleSearchClick} className=" btn btn-primary ms-1">
            Search
          </button>
        </div>

        {/*current location*/}
        <div className=" mt-1 m-md-0">
          <button className=" btn btn-primary">
            <MdMyLocation />
            <span className=" ms-1">Current Location</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
