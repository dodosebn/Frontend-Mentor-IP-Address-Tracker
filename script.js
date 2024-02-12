const searchInput = document.getElementById("search-input");
const clickSearch = document.querySelector(".click-hold");
const ipValue = document.getElementById("IpVal");
const locValue = document.getElementById("LocVal");
const timValue = document.getElementById("TimVal");
const ispValue = document.getElementById("IspVal");

if (window.matchMedia("(max-width: 410px)").matches) {
  var metaTag = document.createElement("meta");
  metaTag.setAttribute("name", "viewport");
  metaTag.setAttribute(
    "content",
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  );
  document.head.appendChild(metaTag);

  var map = L.map("map").fitWorld();
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  map.locate({ setView: true, maxZoom: 16 });
  function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng)
      .addTo(map)
      .bindPopup("You are within " + radius + " meters from this point")
      .openPopup();

    L.circle(e.latlng, radius).addTo(map);
  }

  map.on("locationfound", onLocationFound);
  function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);
}

var map = L.map("map").setView([51.505, -0.09], 18);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
  foo: "bar",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function Louder() {
  const userInput = searchInput.value;
  const request = fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_XC2siWMYDUs9WcHkfAYy76uGcXoWK&ipAddress=${userInput}`
  );
  request
    .then((reponse) => reponse.json())
    .then(function (data) {
      ipValue.textContent = `${data.ip}`;
      locValue.textContent = `${data.location.city}, ${data.location.country}`;
      timValue.textContent = `${data.location.timezone}`;
      ispValue.textContent = `${data.isp}`;
    });
  console.log(data);
}
clickSearch.addEventListener("click", (event) => {
  event.preventDefault();
  Louder();
});
Louder();
