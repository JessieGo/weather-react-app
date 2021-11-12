import React, { useState } from "react";

const api = {
  key: "ac23ab5b10264bd97d5359c32964a04c",
  base: "https://api.openweathermap.org/data/2.5/weather",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  //!if isError sets false when loading, the app will crash becasue
  //! it couldn't find the weather data below in jsx.
  let [isError, setIsError] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  console.log(isError);

  const handleChange = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  // handle submit without form tag using onKeyPress
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(query);
      fetch(`${api.base}?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => {
          //!manually catch 400 and 500 err here!
          if (res.ok) return res.json();
          else throw new Error(`couldn't find data of ${query}`);
        })
        .then((result) => {
          setWeather(result);
          //console.log(result);
          // ! setIsError has to be after setWeather, otherwise app will crash
          // ! because couldn't find the weather data below in jsx.

          setIsError(false);

          setQuery("");
          setErrMsg("");
        })
        //! the default catch only catch network error
        .catch((err) => {
          // alert(err.message);
          setErrMsg(err.message);
          setIsError(true);
          console.log(err.message);
        });
    }
  };

  // handle submit using form tag
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("submit");
  // };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main className="container">
        <form
          className="search-box"
          // onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </form>
        <p className="err-msg">{errMsg}</p>

        {isError === false && (
          <div>
            <h2 className="city">
              {weather.name} {weather.sys.country}
            </h2>
            <h3 className="date">{new Date().toDateString()}</h3>
            <p className="temp">{Math.round(weather.main.temp)}°c</p>
            <p className="weather">{weather.weather[0].main}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
