import React, { useEffect, useState } from "react";

const DisplayClock = ({ clockTime }) => {
  const [isClockRunning, setIsClockRunning] = useState(true);
  const [dateTime, setDateTime] = useState(
    clockTime ? new Date(clockTime.utc_datetime) : new Date()
  );

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const utcYear = date.getUTCFullYear();
    const utcMonth = date.getUTCMonth();
    const utcDay = date.getUTCDate();

    return new Date(utcYear, utcMonth, utcDay).toLocaleDateString(
      "en-US",
      options
    );
  };

  const formatTime = (date) => {
    const utcHour = date.getUTCHours();
    const utcMinute = date.getUTCMinutes();
    const utcSecond = date.getUTCSeconds();

    return new Date(0, 0, 0, utcHour, utcMinute, utcSecond).toLocaleTimeString(
      "en-US",
      {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }
    );
  };

  useEffect(() => {
    let intervalId;
    setDateTime(clockTime ? new Date(clockTime.utc_datetime) : new Date());

    clearInterval(intervalId);

    if (isClockRunning) {
      intervalId = setInterval(() => {
        setDateTime((prevDateTime) => new Date(prevDateTime.getTime() + 1000));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isClockRunning, clockTime]);

  const handlePauseStartClick = () => {
    setIsClockRunning((prev) => !prev);
  };

  return (
    <div style={{display:'flex'}}>
    <div className="date-time-div">
      <div>{formatDate(dateTime)}</div>
      <div>{formatTime(dateTime)}</div>
      </div>
      &nbsp;&nbsp;&nbsp;
      <div>
        <button onClick={handlePauseStartClick} className="clock-button-div">
          {isClockRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default DisplayClock;
