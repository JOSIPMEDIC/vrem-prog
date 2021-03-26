import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/NextDays.css";
import { Link } from "react-router-dom";

const weekDays = ["ned", "pon", "uto", "sri", "čet", "pet", "sub"];

function NextDays(props) {
	const [days, setDays] = useState([]);

	useEffect(() => {
		const fetchWeather = async () => {
			const res = await axios(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&exclude=current,minutely,alerts&appid=&units=metric`
			);
			setDays(res.data.daily);
		};

		fetchWeather();
	}, []);

	return (
		<>
			<Container>
				<Row className="title">
					<h2>{`Vremenska prognoza za ${props.city}`}</h2>
				</Row>
				<Col resonsive className="card-wrapper">
					{days.slice(0, 5).map((day, i) => {
						const date = new Date(day.dt * 1000 - 3600 * 1000);
						const dayWeek = date.getDay();

						if (i >= 0 && i < 2) {
							return (
								<Link
									className="card-container"
									to={`/${props.city}/${weekDays[dayWeek]}`}
									key={Math.random(day.weather[0].id)}
								>
									<h3 className="cardTitle">{weekDays[dayWeek]}</h3>
									<img
										src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
										alt={day.weather[0].description}
									/>
									<Row>
										<h4 className="temperature">
											{Math.round(day.temp.max)}ºC
										</h4>
										<h4 className="temperature min-temp">
											{Math.round(day.temp.min)}ºC
										</h4>
									</Row>
								</Link>
							);
						} else {
							return (
								<div
									className="card-container"
									key={Math.random(day.weather[0].id)}
								>
									<h3 className="cardTitle">{weekDays[dayWeek]}</h3>
									<img
										src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
										alt={day.weather[0].description}
									/>
									<Row>
										<h4 className="temperature">
											{Math.round(day.temp.max)}ºC
										</h4>
										<h4 className="temperature min-temp">
											{Math.round(day.temp.min)}ºC
										</h4>
									</Row>
								</div>
							);
						}
					})}
				</Col>
			</Container>
		</>
	);
}

export default NextDays;
