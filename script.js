const searchInput = document.getElementById("search-input");
const ipValue = document.getElementById("IpVal");
const locValue = document.getElementById("LocVal");
const timValue = document.getElementById("TimVal");
const ispValue = document.getElementById("IspVal");
const clickSearch = document.querySelector(".click-hold");

var map = L.map("map");
map.setView([0, 0], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marker, circle, zoomed;

function Louder() {
  const userInput = searchInput.value;
  const request = fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_XC2siWMYDUs9WcHkfAYy76uGcXoWK&ipAddress=${userInput}`
  );
  request
    .then((response) => response.json())
    .then(function (data) {
      ipValue.textContent = `${data.ip}`;
      locValue.textContent = `${data.location.city}, ${data.location.country}`;
      timValue.textContent = `${data.location.timezone}`;
      ispValue.textContent = `${data.isp}`;

      const lat = data.location.lat;
      const lng = data.location.lng;

      if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
      }

      marker = L.marker([lat, lng]).addTo(map);
      circle = L.circle([lat, lng], { radius: 1000 }).addTo(map);

      map.setView([lat, lng], 13);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function success(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const accuracy = position.coords.accuracy;

  if (marker) {
    map.removeLayer(marker);
    map.removeLayer(circle);
  }

  marker = L.marker([lat, lng]).addTo(map);
  circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

  if (!zoomed) {
    zoomed = map.fitBounds(circle.getBounds());
  }

  map.setView([lat, lng]);
}

function error(err) {
  if (err.code === 1) {
    alert("Please allow geolocation access.");
  } else {
    alert("Cannot get current location.");
  }
}
navigator.geolocation.watchPosition(success, error);
clickSearch.addEventListener("click", (event) => {
  event.preventDefault();
  Louder();
});


