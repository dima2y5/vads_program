//Карта
function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: 48.69785882053466, lng: 44.50109144809911 },
  });
  const trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
  directionsRenderer.setMap(map);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
    {
      origin: {
        query: document.getElementById("start").value,
      },
      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}


//Информация о погоде
var settings = {
  "url": "https://api.openweathermap.org/data/2.5/weather?q=Volgograd&units=metric&appid=5b5de993c9065a694361cf038e7e19b1",
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  console.log(response);

  //Перевод даты и времени из Unix в нормальную
  var d = new Date(response.dt * 1000);
  datenorm = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + " " + d.getHours() + ':' + d.getMinutes();
  hours = d.getHours();

  //Определение осадков
  var rain = response.weather.main;
  if (rain === "Clear") {
    rain1 = 'Нет';
  } else {
    rain1 = 'Есть';
  }

  //Определение гололеда
  var t = response.main.temp;
  var r = response.weather.main;
  if ((t < 0) || (r === 'Rain')) {
    ice = 'Есть';
  } else {
    ice = 'Нет';
  }

  

  //Добавление данных в таблицу
  var content = datenorm;
  var pres = response.main.pressure / 1.333
  $("#Date").append(content);
  $("#Temp").append(response.main.temp + ' C');
  $("#Pressure").append(pres.toFixed(2) + ' мм. рт. ст.');
  $("#Rain").append(rain1);
  $("#Ice").append(ice);

  //Интенсивность движения
  if (((hours >= 8) && (hours <= 9)) || ((hours >= 17) && (hours <= 18))) {
    $("#Intence").append("Интенсивность движения: высокая");
    outputRoad = 3;
  } else if (((hours >= 10) && (hours <= 12)) || ((hours >= 19) && (hours <= 20))) {
    $("#Intence").append("Интенсивность движения: средняя");
    outputRoad = 2;
  } else {
    $("#Intence").append("Интенсивность движения: низкая");
    outputRoad = 1;
  }

  if ((t < 0) || (r === 'Rain')) {
    $("#Intence").append("Интенсивность движения: средняя");
    outputRoad = 2;
  }
});

//Массив безопасности автомобилей
var CarData = [
  { value: 1, carName: "Hyundai Solaris", rating: 16.0 },
  { value: 2, carName: "Renault Arkana ", rating: 15.8 },
  { value: 3, carName: "Hyundai Creta", rating: 15.7 },
  { value: 4, carName: "Лада Веста", rating: 15.1 },
  { value: 5, carName: "Volkswagen Polo", rating: 14.3 },
  { value: 6, carName: "Лада XRAY", rating: 13.7 },
  { value: 7, carName: "Лада Веста SW Cross", rating: 11.7 },
  { value: 8, carName: "Ford Focus", rating: 11.6 },
  { value: 9, carName: "Daewoo Matiz", rating: 11.0 },
  { value: 10, carName: "Renault Logan", rating: 11.0 },
  { value: 11, carName: "Renault Symbol", rating: 10.9 },
  { value: 12, carName: "Лада Гранта Люкс", rating: 10.7 },
  { value: 13, carName: "Лада Калина Люкс", rating: 10.1 },
  { value: 14, carName: "Hyundai Accent", rating: 8.9 },
  { value: 15, carName: "Hyundai Solaris", rating: 8.5 },
  { value: 16, carName: "Лада Гранта", rating: 8.4 },
  { value: 17, carName: "Chevrolet Lanos", rating: 8.1 },
  { value: 18, carName: "Fiat Albea", rating: 7.5 },
  { value: 19, carName: "BYD F3", rating: 6.0 },
  { value: 20, carName: "Лада Приора", rating: 5.4 },
  { value: 21, carName: "Geely MK", rating: 6.5 },
  { value: 22, carName: "Лада ВАЗ-2110", rating: 0.7 },
  { value: 23, carName: "Лада ВАЗ-2109", rating: 2.7 },
  { value: 24, carName: "Chevrolet Niva", rating: 1.6 },
  { value: 25, carName: "Лада ВАЗ-21213 Нива", rating: 0.0 },
  { value: 26, carName: "ГАЗ Волга 3110", rating: 1.4 },
  { value: 27, carName: "Лада ВАЗ-2114", rating: 3.2 },
  { value: 28, carName: "Chery Amulet", rating: 1.7 },
  { value: 29, carName: "Daewoo Nexia", rating: 0.6 },
  { value: 30, carName: "Лада ВАЗ-2107", rating: 0.0 },
]

$.each(CarData, function (i, CarData) {
  $('#Car').append($('<option>', {
    value: CarData.value,
    text: CarData.carName
  }));
});





$(definitionSafety);
function definitionSafety() {

  
  //Определение состояния водителя
  age = document.getElementById("Age").value;
  if ((age >= 30) && (age <= 40)) {
    ageSafety = 1
  } else if ((age >= 20) && (age <= 29)){
    ageSafety = 0.8
  } else if ((age >= 41) && (age <= 50)){
    ageSafety = 0.6
  } else if ((age >= 51) && (age <= 70)){
    ageSafety = 0.4
  } else if (((age >= 18) && (age <= 19)) || (age >= 71)){
    ageSafety = 0.2
  } 
  
  exp = document.getElementById("Experience").value;
  if (exp >= 10){
    expSafety = 1
  } else if ((exp >= 5) && (exp <= 9)){
    expSafety = 0.75
  } else if ((exp >= 3) && (exp <= 4)){
    expSafety = 0.5
  } else if ((exp >= 0) && (exp <= 2)){
    expSafety = 0.25
  }

  mental = document.getElementById("Mental");
  mentalSafety = 0;
  if ((mental.value === 3)) {
    mentalSafety = 1
  } else if ((mental.value === 2)){
    mentalSafety = 0.66
  } else if ((mental.value === 1)){
    mentalSafety = 0.33
  }

  sex = document.getElementById("Sex");
  sexSafety = 0;
  if ((sex.value === 1)) {
    sexSafety = 1
  } else if ((sex.value === 2)){
    sexSafety = 0.5
  }

  const DriverNet = new brain.NeuralNetwork();

  DriverNet.train([
    { input: {age: 1, exp: 1, mental: 1, sex: 1}, output: {высокий: 1} },
    { input: {age: 1, exp: 1, mental: 1, sex: 0.5}, output: {высокий: 1} },
    { input: {age: 1, exp: 0.75, mental: 0.66, sex: 1}, output: {высокий: 1} },
    { input: {age: 1, exp: 0.5, mental: 0.33, sex: 0.5}, output: {средний: 1} },
    { input: {age: 1, exp: 0.25, mental: 1, sex: 1}, output: {средний: 1} },
    { input: {age: 1, exp: 0.5, mental: 0.66, sex: 1}, output: {средний: 1} },
    { input: {age: 1, exp: 0.25, mental: 0.33, sex: 0.5}, output: {низкий: 1} },
    { input: {age: 1, exp: 0.25, mental: 0.33, sex: 1}, output: {низкий: 1} },
    { input: {age: 0.8, exp: 1, mental: 1, sex: 1}, output: {высокий: 1} },
    { input: {age: 0.8, exp: 1, mental: 1, sex: 0.5}, output: {высокий: 1} },
    { input: {age: 0.8, exp: 0.75, mental: 0.66, sex: 1}, output: {высокий: 1} },
    { input: {age: 0.8, exp: 0.5, mental: 0.33, sex: 0.5}, output: {средний: 1} },
    { input: {age: 0.8, exp: 0.25, mental: 1, sex: 1}, output: {средний: 1} },
    { input: {age: 0.8, exp: 0.25, mental: 0.33, sex: 0.5}, output: {низкий: 1} },
    { input: {age: 0.8, exp: 0.25, mental: 0.33, sex: 1}, output: {низкий: 1} },
    { input: {age: 0.8, exp: 0.5, mental: 0.66, sex: 1}, output: {средний: 1} },
    { input: {age: 0.6, exp: 1, mental: 1, sex: 1}, output: {средний: 1} },
    { input: {age: 0.6, exp: 1, mental: 1, sex: 0.5}, output: {средний: 1} },
    { input: {age: 0.6, exp: 0.75, mental: 0.66, sex: 1}, output: {средний: 1} },
    { input: {age: 0.6, exp: 0.5, mental: 0.33, sex: 0.5}, output: {средний: 1} },
    { input: {age: 0.6, exp: 0.25, mental: 1, sex: 1}, output: {низкий: 1} },
    { input: {age: 0.6, exp: 0.5, mental: 0.66, sex: 1}, output: {средний: 1} },
    { input: {age: 0.6, exp: 0.25, mental: 0.33, sex: 0.5}, output: {низкий: 1} },
    { input: {age: 0.6, exp: 0.25, mental: 0.33, sex: 1}, output: {низкий: 1} },
    { input: {age: 0.4, exp: 1, mental: 1, sex: 1}, output: {средний: 1} },
    { input: {age: 0.4, exp: 1, mental: 1, sex: 0.5}, output: {средний: 1} },
    { input: {age: 0.4, exp: 0.75, mental: 0.66, sex: 1}, output: {низкий: 1} },
    { input: {age: 0.4, exp: 0.5, mental: 0.33, sex: 0.5}, output: {низкий: 1} },
    { input: {age: 0.4, exp: 0.25, mental: 1, sex: 1}, output: {низкий: 1} },
    { input: {age: 0.4, exp: 0.5, mental: 0.66, sex: 1}, output: {низкий: 1} },
    { input: {age: 0.4, exp: 0.25, mental: 0.33, sex: 0.5}, output: {низкий: 1} },
    { input: {age: 0.4, exp: 0.25, mental: 0.33, sex: 1}, output: {низкий: 1} },
    { input: {age: 0.2, exp: 1, mental: 1, sex: 1}, output: {средний: 1} },
    { input: {age: 0.2, exp: 1, mental: 1, sex: 0.5}, output: {средний: 1} },
    { input: {age: 0.2, exp: 0.75, mental: 0.66, sex: 1}, output: {низкий: 1} },
    { input: {age: 0.2, exp: 0.5, mental: 0.33, sex: 0.5}, output: {низкий: 1} },
    { input: {age: 0.2, exp: 0.25, mental: 1, sex: 1}, output: {низкий: 1} },
    { input: {age: 0.2, exp: 0.5, mental: 0.66, sex: 1}, output: {низкий: 1} },
    { input: {age: 0.2, exp: 0.25, mental: 0.33, sex: 0.5}, output: {низкий: 1} },
    { input: {age: 0.2, exp: 0.25, mental: 0.33, sex: 1}, output: {низкий: 1} },
  ]);
  const outputDriver = DriverNet.run({age: ageSafety, exp: expSafety, mental: mentalSafety, sex: sexSafety});

  if ((getMax(outputDriver).safety1) === 'высокий'){
    driverK = 1;
  } else if ((getMax(outputDriver).safety1) === 'средний'){
    driverK = 2;
  } else if ((getMax(outputDriver).safety1) === 'низкий'){
    driverK = 3;
  } 

  console.log("Driver")
  console.log(getMax(outputDriver))




  //Определение безопасности автомобиля
  car = document.getElementById("Car");
  carSafety = 0;
  if ((car.value >= 1) && (car.value <= 13)) {
    carSafety = 1
  } else if ((car.value >= 14) && (car.value <= 18)){
    carSafety = 0.75
  } else if ((car.value >= 19) && (car.value <= 21)){
    carSafety = 0.5
  } else if ((car.value >= 22) && (car.value <= 30)){
    carSafety = 0.25
  }
  
  cyear = document.getElementById("CarYear").value;
  if ((cyear >= 2011) && (cyear <= 2021)) {
    yearSafety = 1
  } else if ((cyear >= 2002) && (cyear <= 2010)){
    yearSafety = 0.75
  } else if ((cyear >= 1995) && (cyear <= 2001)){
    yearSafety = 0.5
  } else if (cyear <= 1994){
    yearSafety = 0.25
  }

  
  const CarNet = new brain.NeuralNetwork();

  CarNet.train([
    { input: {car: 1, year: 1}, output: {высокий: 1} },
    { input: {car: 1, year: 0.75}, output: {высокий: 1} },
    { input: {car: 1, year: 0.5}, output: {средний: 1} },
    { input: {car: 1, year: 0.25}, output: {средний: 1} },
    { input: {car: 0.75, year: 1}, output: {средний: 1} },
    { input: {car: 0.75, year: 0.75}, output: {средний: 1} },
    { input: {car: 0.75, year: 0.5}, output: {низкий: 1} },
    { input: {car: 0.75, year: 0.25}, output: {низкий: 1} },
    { input: {car: 0.5, year: 1}, output: {средний: 1} },
    { input: {car: 0.5, year: 0.75}, output: {низкий: 1} },
    { input: {car: 0.5, year: 0.5}, output: {низкий: 1} },
    { input: {car: 0.5, year: 0.25}, output: {низкий: 1} },
    { input: {car: 0.25, year: 1}, output: {средний: 1} },
    { input: {car: 0.25, year: 0.75}, output: {низкий: 1} },
    { input: {car: 0.25, year: 0.5}, output: {низкий: 1} },
    { input: {car: 0.25, year: 0.25}, output: {низкий: 1} },
  ]);
  const outputCar = CarNet.run({car: carSafety, year: yearSafety});

  if ((getMax(outputCar).safety1) === 'высокий'){
    carK = 1;
  } else if ((getMax(outputCar).safety1) === 'средний'){
    carK = 2;
  } else if ((getMax(outputCar).safety1) === 'низкий'){
    carK = 3;
  } 

  console.log("Car")
  console.log(getMax(outputCar))


  //Определение воздействия среды на дорогу, автомобиль и водителя
  if ((rain1 === "Есть") || (ice === "Есть")){
    weatherRoad = 1;
    weatherCar = 0;
    weatherDriver = 0.5;
  } else if ((pres.toFixed(2) > 770.0) || pres.toFixed(2) < 750.0) {
    weatherRoad = 0;
    weatherCar = 0;
    weatherDriver = 1;
  }



  //Функция вывода максимальной вероятности
  function getMax(output){
    let max = 0;
    let safety1;

    for(let key in output){
      const value = output[key];
      if(value > max){
        max = value;
        safety1 = key;
      }
    }

    return {safety1: safety1};
  }

  //Определение безопасности движения
  const AllSafety = new brain.NeuralNetwork();

  AllSafety.train([
    { input: {driver: 1, car: 1, road: 1, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {высокая: 1} },
    { input: {driver: 1, car: 2, road: 2, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {высокая: 1} },
    { input: {driver: 1, car: 2, road: 3, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {высокая: 1} },
    { input: {driver: 1, car: 2, road: 1, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {высокая: 1} },
    { input: {driver: 1, car: 2, road: 2, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {высокая: 1} },
    { input: {driver: 1, car: 2, road: 3, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {средняя: 1} },
    { input: {driver: 1, car: 3, road: 1, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {высокая: 1} },
    { input: {driver: 1, car: 1, road: 3, weatherCar: 0, weatherDriver: 0, weatherRoad: 1}, output: {средняя: 1} },
    { input: {driver: 1, car: 3, road: 3, weatherCar: 1, weatherDriver: 1, weatherRoad: 1}, output: {средняя: 1} },
    { input: {driver: 2, car: 1, road: 1, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {высокая: 1} },
    { input: {driver: 2, car: 2, road: 1, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {высокая: 1} },
    { input: {driver: 2, car: 2, road: 2, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {средняя: 1} },
    { input: {driver: 2, car: 2, road: 3, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {средняя: 1} },
    { input: {driver: 2, car: 3, road: 1, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {средняя: 1} },
    { input: {driver: 2, car: 1, road: 3, weatherCar: 0, weatherDriver: 0, weatherRoad: 1}, output: {средняя: 1} },
    { input: {driver: 2, car: 3, road: 3, weatherCar: 1, weatherDriver: 1, weatherRoad: 1}, output: {средняя: 1} },
    { input: {driver: 3, car: 3, road: 1, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {средняя: 1} },
    { input: {driver: 3, car: 2, road: 1, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {средняя: 1} },
    { input: {driver: 3, car: 2, road: 2, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {низкая: 1} },
    { input: {driver: 3, car: 2, road: 3, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {низкая: 1} },
    { input: {driver: 3, car: 3, road: 1, weatherCar: 0, weatherDriver: 0, weatherRoad: 0}, output: {низкая: 1} },
    { input: {driver: 3, car: 3, road: 3, weatherCar: 0, weatherDriver: 0, weatherRoad: 1}, output: {низкая: 1} },
    { input: {driver: 3, car: 3, road: 3, weatherCar: 1, weatherDriver: 1, weatherRoad: 1}, output: {низкая: 1} }
  ]);
  const outputSafety = AllSafety.run({driver: driverK, car: carK, road: outputRoad, weatherCar: weatherCar, weatherDriver: weatherDriver, weatherRoad: weatherRoad});

  console.log("Safety")
  console.log(outputSafety)




  start = document.getElementById("start").value
  console.log(start)

  if (start === ""){
    alert("Введите, пожалуйста, ваш маршрут!")
  } else {
    $('#Save').text(getMax(outputSafety).safety1);
  }


}



Calc.addEventListener("click", definitionSafety);

