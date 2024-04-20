// citiesVisualization.js
let baseUrl = "";
let citiesData;
let dataReceived = false;
const zoom = 1.5;

function preload() {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    baseUrl = "http://localhost:3000";
  } else {
    baseUrl = "https://one-api-jwr7.onrender.com";
  }

  loadJSON(`${baseUrl}/cities`, (data) => {
    citiesData = data;
    console.log("Dados carregados");
  });
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(0);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  for (let i = 0; i < citiesData.length; i++) {
    const population = citiesData[i].population;
    const x = mercX(citiesData[i].lng) - mercX(0);
    const y = mercY(citiesData[i].lat) - mercY(0);

    const circleSize = map(population, 0, 37732000, 1, 37732000 / 1000000);

    noStroke();
    fill(255, 127);
    ellipse(x, y, circleSize);
  }
}

function mercX(lon) {
  lon = radians(lon);
  let a = (height / 4 / PI) * pow(2, zoom);
  let b = lon + PI;
  return a * b;
}
function mercY(lat) {
  lat = radians(lat);
  let a = (height / 4 / PI) * pow(2, zoom);
  let b = tan(PI / 4 + lat / 2);
  let c = PI - log(b);
  return a * c;
}
