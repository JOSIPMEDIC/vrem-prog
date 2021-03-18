import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

const HourlyWeather = ({ lat, lon, now, tillMidnight, weekDaysFull, city }) => {
	const [hours, setHours] = useState([]);
	useEffect(() => {
		const fetchWeather = async () => {
			const res = await axios(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=66ee595de65ccc06d616d113abe9858e&units=metric&lang=hr`
			);
			setHours(res.data.hourly);
		};
		fetchWeather();
	}, []);
	return (
		<Container>
			<Row className="d-flex justify-content-center mt-4 mb-4 font-weight-bold">
				<h5>{`${city} - ${weekDaysFull}`}</h5>
			</Row>
			<Row className="d-flex justify-content-center">
				<Table bordered size="sm" className="table-sm w-50">
					<thead>
						<tr>
							<th>Sat</th>
							<th>Vrijeme</th>
							<th>Temperatura</th>
						</tr>
					</thead>
					<tbody>
						{hours.slice(now, tillMidnight).map((hour) => {
							const date = new Date(hour.dt * 1000 - 3600 * 1000);
							const hourTime = date.getHours();

							return (
								<tr
									style={{
										backgroundColor: "rgb(112, 174, 224)",
										color: "white",
									}}
									key={Math.random(hour.weather[0].id)}
								>
									<td>
										<p
											style={{
												marginLeft: "2rem",
												marginTop: "1rem",
												fontWeight: "bold",
											}}
										>
											{hourTime < 10 ? "0" + hourTime : hourTime}:00h
										</p>
									</td>
									<td>
										{
											<img
												style={{
													width: "4rem",
													marginLeft: "2rem",
												}}
												src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
												alt={hour.weather[0].description}
											/>
										}
									</td>
									<td>
										<h5
											style={{
												marginLeft: "2rem",
												marginTop: "1rem",
											}}
										>
											{Math.round(hour.temp)}ºC
										</h5>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};

export default HourlyWeather;
