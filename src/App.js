import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrentWeather from "./components/CurrentWeather";
import NextDays from "./components/NextDays";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./app.css";
import HourlyWeather from "./components/HourlyWeather";

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

const weekDaysFull = [
	"Nedjelja",
	"Ponedjeljak",
	"Utorak",
	"Srijeda",
	"Četvrtak",
	"Petak",
	"Subota",
];

const weekDays = ["ned", "pon", "uto", "sri", "čet", "pet", "sub"];

function App() {
	let now = new Date().getHours() - 1;
	let tillMidnight = 24 - now;
	let nextMidnight = tillMidnight + 24;
	const date = new Date();
	const dayWeek = date.getDay();

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
					<Route exact path={`/${town.name}`}>
						<NextDays
							key={town.name}
							city={town.name}
							lat={town.lat}
							lon={town.lon}
						/>
					</Route>
				))}

				{cities.map((city) =>
					weekDays.map((day, i) => {
						return (
							<Route key={day} exact path={`/${city.name}/${day}`}>
								<HourlyWeather
									now={i === dayWeek ? 1 : tillMidnight}
									tillMidnight={i === dayWeek ? tillMidnight : nextMidnight}
									lat={city.lat}
									lon={city.lon}
									weekDaysFull={weekDaysFull[i]}
									city={city.name}
								/>
							</Route>
						);
					})
				)}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
