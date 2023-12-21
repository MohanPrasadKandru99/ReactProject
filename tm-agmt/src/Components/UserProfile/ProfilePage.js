import React, { useEffect, useState } from "react";
import DisplayClock from "../Clock/DisplayClock";

function ProfilePage() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone", { method: "GET" })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Failed to fetch timezones");
      })
      .then((data) => setCountries(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    fetch(`http://worldtimeapi.org/api/timezone/${event.target.value}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Failed to fetch timezone");
      })
      .then((res) => setCurrentTime(res))
      .catch((error) => console.error(error));
  };

  return (
    <div className="profile-segment">
      <div className="child-segment">
        <select
          id="countrySelector"
          onChange={handleCountryChange}
          value={selectedCountry}
          autoFocus
        >
          {countries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
      </div>
      &nbsp;&nbsp;&nbsp;
      <div className="child-segment">
        <div className="clock-box ">
          <DisplayClock clockTime={currentTime} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
