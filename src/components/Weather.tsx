import { useState } from "react";

const API_KEY = "582745360bae644e532f8a242cbdd85f"


export default function Weather() {
    const [city,setCity] = useState("");
    const [country,setCountry] = useState("");
    const [weather, setWeather] = useState<any>(null);

    const fetchWeather = async () => {
        if(!city || !country) return;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric&lang-en`;
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data)
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">🌤️Weather in your city</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded text-black"
        />
        <input
          type="text"
          placeholder="Country (eg: SV, MX, EX)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-2 rounded text-black"
        />
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-yellow-400 rounded font-semibold hover:bg-yellow-500"
        >
          Search
        </button>
      </div>

      {weather && weather.main ? (
        <div className="bg-white/20 p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
            <p className="text-lg capitalize">{weather.weather[0].description}</p>
            <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
            <p className="text-sm">Humidity: {weather.main.humidity}%</p>
            <p className="text-sm">Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p className="mt-4"> Enter a city & country to check its weather</p>
      )}


    </div>
  );
}
