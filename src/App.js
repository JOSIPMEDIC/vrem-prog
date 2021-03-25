import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrentWeather from "./components/CurrentWeather";
import NextDays from "./components/NextDays";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./app.css";
import { useState } from "react";

const cities = [
	{
		name: "Zagreb",
		lat: 45.815,
		lon: 15.9819,
	},
	{
		name: "Split",
		lat: 43.5089,
		lon: 16.4392,
	},
	{
		name: "Rijeka",
		lat: 45.3431,
		lon: 14.4092,
	},
	{
		name: "Osijek",
		lat: 45.5511,
		lon: 18.6939,
	},
];

function App() {
	const [index, setIndex] = useState(0);
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Container fluid="xl">
						<Row className="title">
							<h2>Vremenska prognoza</h2>
						</Row>
						<Col className="d-flex justify-content-between">
							{cities.map((town, i) => {
								return (
									<Link
										style={{
											textDecoration: "none",
										}}
										onClick={() => {
											setIndex(i);
										}}
										to={`/${town.name}`}
									>
										<CurrentWeather
											key={town.name}
											city={town.name}
											lat={town.lat}
											lon={town.lon}
										/>
									</Link>
								);
							})}
						</Col>
					</Container>
				</Route>
				{cities.map((town) => (
					<Route exact path={`/${cities[index].name}`}>
						<NextDays
							key={cities[index].name}
							city={cities[index].name}
							lat={cities[index].lat}
							lon={cities[index].lon}
						/>
					</Route>
				))}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
