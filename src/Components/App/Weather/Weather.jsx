import React from "react";
import { useEffect, useState } from "react";
import "./weather.css";
import axios from "axios";
import imagebase from "./img/1.jpg";
import imageday from "./img/2.jpg";
import imagenight from "./img/3.jpg";
export default function Weather() {
  const apiKey = "9964e5d9d5f1458388c130154242201";
  const [Val, setVal] = useState("");
  const [Weather, setWeather] = useState(null);
  const [backgroundimg, setbackgroundimg] = useState(imagebase);

  const axiousweather = async () => {
    try {
      axios
        .get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${Val}`)
        .then((res) => {
          setWeather([res.data]);
          const isDay = res.data.current.is_day;
          if (isDay === 1) {
            setbackgroundimg(imageday);
          } else {
            setbackgroundimg(imagenight);
          }
        });
      setVal("");
    } catch (error) {
      if (error) {
        alert("درخواست موفقیت امیز نبود");
      }
    }
  };

  useEffect(() => {
    document.body.classList.add("bg-cover");
    document.body.style.backgroundImage = `url(${backgroundimg})`;
    document.body.style.transition =
      "background-image 1s ease-in-out, opacity 1s ease-in-out";
  }, [backgroundimg]);
  return (
    <div>
      <div className="">
        <div className="header text-white text-center py-10 font-extrabold tracking-[0.5rem] text-[50px]">
          FORECAST WEATHER API
        </div>
        <div className="flex flex-wrap justify-center gap-y-[10px] gap-x-[20px]">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter city ..."
            onChange={(e) => {
              setVal(e.target.value);
            }}
            value={Val}
            className="w-[30%] h-[50px] rounded-xl mt-2 outline-none text-center p-3  text-sm bg-[#e2e9e6]  shadow-inner"
          />
          <button
            className="bg-orange-500 hover:bg-orange-800  font-semibo text-white py-2 px-4 border-orange-500 duration-700  hover:border-transparent rounded-[15px] mt-3"
            onClick={axiousweather}
            id="result"
          >
            result
          </button>
        </div>
        <div>
          <div className="my-10 mx-auto px-3">
            {Weather &&
              Weather.map((elem) => {
                return (
                  <div key={elem.location.name}>
                    <div
                      className={
                        elem.current.is_day === 1
                          ? "information flex flex-col gap-y-[1px]  text-center mt-[60px] bg-[#9ec5fb60] text-[19px] mx-auto   pb-5 rounded-xl"
                          : "information flex flex-col gap-y-[1px]   text-center mt-[70px] bg-[#272728d8] text-[19px] mx-auto   pb-5 rounded-xl"
                      }
                    >
                      <div>
                        <img
                          className="cursor-pointer mx-auto text-center img-fluid"
                          src={elem.current.condition.icon}
                        />
                      </div>
                      <div className="flex flex-col bg-red-  gap-y-[17px]">
                        <div
                          className={
                            elem.current.is_day == 1
                              ? "text-rose-600 font-bold"
                              : "text-stone-100 font-bold"
                          }
                        >
                          {" "}
                          Weather condition : {elem.current.condition.text}
                        </div>
                        <div
                          className={
                            elem.current.is_day == 1
                              ? "text-rose-600"
                              : "text-stone-100"
                          }
                        >
                          City : {elem.location.name}
                        </div>
                        <div
                          className={
                            elem.current.is_day == 1
                              ? "text-rose-600"
                              : "text-stone-100"
                          }
                        >
                          Country : {elem.location.country}
                        </div>
                        <div
                          className={
                            elem.current.is_day == 1
                              ? "text-rose-600 font-bold"
                              : "text-stone-100 font-bold"
                          }
                        >
                          temperature to celsius : {elem.current.feelslike_c} °C
                        </div>
                        <div
                          className={
                            elem.current.is_day == 1
                              ? "text-rose-600"
                              : "text-stone-100"
                          }
                        >
                          temperature to fahrenheit : {elem.current.feelslike_f}{" "}
                          °F
                        </div>

                        <div
                          className={
                            elem.current.is_day == 1
                              ? "text-rose-600 font-bold"
                              : "text-stone-100 font-bold"
                          }
                        >
                          Humidity : {elem.current.humidity} %
                        </div>

                        <div
                          className={
                            elem.current.is_day == 1
                              ? "text-rose-600"
                              : "text-stone-100"
                          }
                        >
                          Data & time : {elem.location.localtime}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
