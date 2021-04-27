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
    rain = 'Нет';
  } else {
    rain = 'Есть';
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
  $("#Rain").append(rain);
  $("#Ice").append(ice);

  //Интенсивность движения
  if (((hours >= 8) || (hours <= 9)) | ((hours >= 17) || (hours <= 18))) {
    $("#Intence").append("Интенсивность движения: высокая");
  } else if (((hours >= 10) || (hours <= 12)) | ((hours >= 19) || (hours <= 20))) {
    $("#Intence").append("Интенсивность движения: средняя");
  } else {
    $("#Intence").append("Интенсивность движения: низкая");
  }

  if ((t < 0) || (r === 'Rain')) {
    $("#Intence").append("Интенсивность движения: средняя");;
  }
});

//Массив безопасности автомобилей
var CarData = [
  {value: 1, carName: "Hyundai Solaris", rating: 16.0},
  {value: 2, carName: "Renault Arkana ", rating: 15.8},
  {value: 3, carName: "Hyundai Creta", rating: 15.7},
  {value: 4, carName: "Лада Веста", rating: 15.1},
  {value: 5, carName: "Volkswagen Polo", rating: 14.3},
  {value: 6, carName: "Лада XRAY", rating: 13.7},
  {value: 7, carName: "Лада Веста SW Cross", rating: 11.7},
  {value: 8, carName: "Ford Focus", rating: 11.6},
  {value: 9, carName: "Daewoo Matiz", rating: 11.0},
  {value: 10, carName: "Renault Logan", rating: 11.0},
  {value: 11, carName: "Renault Symbol", rating: 10.9},
  {value: 12, carName: "Лада Гранта Люкс", rating: 10.7},
  {value: 13, carName: "Лада Калина Люкс", rating: 10.1},
  {value: 14, carName: "Hyundai Accent", rating: 8.9},
  {value: 15, carName: "Hyundai Solaris", rating: 8.5},
  {value: 16, carName: "Лада Гранта", rating: 8.4},
  {value: 17, carName: "Chevrolet Lanos", rating: 8.1},
  {value: 18, carName: "Fiat Albea", rating: 7.5},
  {value: 19, carName: "BYD F3", rating: 6.0},
  {value: 20, carName: "Лада Приора", rating: 5.4},
  {value: 21, carName: "Geely MK", rating: 6.5},
  {value: 22, carName: "Лада ВАЗ-2110", rating: 0.7},
  {value: 23, carName: "Лада ВАЗ-2109", rating: 2.7},
  {value: 24, carName: "Chevrolet Niva", rating: 1.6},
  {value: 25, carName: "Лада ВАЗ-21213 Нива", rating: 0.0},
  {value: 26, carName: "ГАЗ Волга 3110", rating: 1.4},
  {value: 27, carName: "Лада ВАЗ-2114", rating: 3.2},
  {value: 28, carName: "Chery Amulet", rating: 1.7},
  {value: 29, carName: "Daewoo Nexia", rating: 0.6},
  {value: 30, carName: "Лада ВАЗ-2107", rating: 0.0},
]

$.each(CarData, function (i, CarData) {
  $('#Car').append($('<option>', { 
      value: CarData.value,
      text : CarData.carName 
  }));
});

$(test);
function test() {


  const net = new brain.NeuralNetwork();

  net.train([
    { input: [1, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [0, 1], output: [1] },
    { input: [0, 0], output: [0] },
  ]);


  age = document.getElementById("Age").value;
  exp = document.getElementById("Experience").value;
  mental = document.getElementById("Mental").value;
  sex = document.getElementById("Sex").value;
  car = document.getElementById("Car").value;
  cyear = document.getElementById("CarYear").value;

  const output = net.run([age, exp]);
  console.log(output[0])

  $('#Save').html(output[0]);

}



Calc.addEventListener("click", test);





