import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col } from "react-bootstrap";
import "./css/CurrentWeather.css";
import "bootstrap/dist/css/bootstrap.min.css";

function City(props) {
	const [weather, setWeather] = useState("");
	const [weatherDecsription, setWeatherDecsription] = useState("");
	const [temperature, setTemperature] = useState(0);
	const cityName = props.city;

	useEffect(() => {
		const fetchWeather = async () => {
			const res = await axios(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&exclude=minutely,hourly,daily,alerts&appid=66ee595de65ccc06d616d113abe9858e&units=metric
`
			);
			setTemperature(Math.round(res.data.current.temp));
			setWeather(res.data.current.weather[0].icon);
			setWeatherDecsription(res.data.current.weather[0].description);
		};
		fetchWeather();
	}, []);

	return (
		<Container className="card-container">
			<Col>
				<h1 className="card-title">{cityName}</h1>
			</Col>
			<Col>
				<img
					src={`https://openweathermap.org/img/wn/${weather}@2x.png`}
					alt={weatherDecsription}
				/>
			</Col>
			<Col>
				<h2>{temperature}ºC</h2>
			</Col>
		</Container>
	);
}

export default City;
