import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/NextDays.css";
import {
	HashRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
} from "react-router-dom";
import HourlyWeather from "./HourlyWeather";

const weekDays = ["ned", "pon", "uto", "sri", "čet", "pet", "sub"];
const weekDaysFull = [
	"Nedjelja",
	"Ponedjeljak",
	"Utorak",
	"Srijeda",
	"Četvrtak",
	"Petak",
	"Subota",
];

function NextDays(props) {
	const [days, setDays] = useState([]);
	const [today, setToday] = useState();
	const { url, path } = useRouteMatch();
	const [indexDay, setIndexDay] = useState(0);
	let now = new Date().getHours() - 1;
	let tillMidnight = 24 - now;
	let nextMidnight = tillMidnight + 24;

	useEffect(() => {
		const fetchWeather = async () => {
			const res = await axios(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&exclude=current,minutely,alerts&appid=66ee595de65ccc06d616d113abe9858e&units=metric`
			);
			setDays(res.data.daily);
		};
		fetchWeather();
	}, []);

	return (
		<Router>
			<Container>
				<Row className="title">
					<h2>{`Vremenska prognoza za ${props.city}`}</h2>
				</Row>
				<Col resonsive className="card-wrapper">
					{days.slice(0, 1).map((day, i) => {
						const date = new Date(day.dt * 1000 - 3600 * 1000);
						const dayWeek = date.getDay();
						return (
							<Link
								onClick={() => {
									setToday(i);
									setIndexDay(dayWeek);
								}}
								className="card-container"
								to={`${url}/${weekDays[dayWeek]}`}
								key={Math.random(day.weather[0].id)}
							>
								<h3 className="cardTitle">{weekDays[dayWeek]}</h3>
								<img
									src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
									alt={day.weather[0].description}
								/>
								<Row>
									<h4 className="temperature">{Math.round(day.temp.max)}ºC</h4>
									<h4 className="temperature min-temp">
										{Math.round(day.temp.min)}ºC
									</h4>
								</Row>
							</Link>
						);
					})}
					{days.slice(1, 2).map((day, i) => {
						const date = new Date(day.dt * 1000 - 3600 * 1000);
						const dayWeek = date.getDay();
						return (
							<Link
								onClick={() => {
									setIndexDay(dayWeek);
									setToday(i + 1);
								}}
								className="card-container"
								to={`${url}/${weekDays[dayWeek]}`}
								key={Math.random(day.weather[0].id)}
							>
								<h3 className="cardTitle">{weekDays[dayWeek]}</h3>
								<img
									src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
									alt={day.weather[0].description}
								/>
								<Row>
									<h4 className="temperature">{Math.round(day.temp.max)}ºC</h4>
									<h4 className="temperature min-temp">
										{Math.round(day.temp.min)}ºC
									</h4>
								</Row>
							</Link>
						);
					})}
					{days.slice(2, 5).map((day) => {
						const date = new Date(day.dt * 1000 - 3600 * 1000);
						const dayWeek = date.getDay();
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
									<h4 className="temperature">{Math.round(day.temp.max)}ºC</h4>
									<h4 className="temperature min-temp">
										{Math.round(day.temp.min)}ºC
									</h4>
								</Row>
							</div>
						);
					})}
				</Col>
			</Container>
			<Switch>
				<Route exact path={`${path}/${weekDays[indexDay]}`}>
					<HourlyWeather
						now={today === 0 ? 1 : tillMidnight}
						tillMidnight={today === 0 ? tillMidnight : nextMidnight}
						lat={props.lat}
						lon={props.lon}
						weekDaysFull={weekDaysFull[indexDay]}
						city={props.city}
					/>
				</Route>
			</Switch>
		</Router>
	);
}

export default NextDays;
