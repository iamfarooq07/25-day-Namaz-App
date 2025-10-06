const addBtn = document.getElementById("btn");
const form = document.getElementById("form");
const countryInp = document.getElementById("country");
const cityInp = document.getElementById("city");
const fajrTime = document.getElementById("fajr");
const zuhrTime = document.getElementById("zuhr");
const asrTime = document.getElementById("asr");
const magribTime = document.getElementById("maghrib");
const ishaTime = document.getElementById("isha");
const crtdate = document.getElementById("date");
// console.log(fajrTime.textContent);

let date = new Date();
// console.log(date.toDateString());

crtdate.textContent = date.toDateString();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log("Clicked Me");

  const cityVal = cityInp.value;
  const countryVal = countryInp.value;

  console.log(cityVal);
  console.log(countryVal);

  if (!cityVal || !countryVal) {
    alert("Please enter both City and Country");
    return;
  }

  cityInp.value = "";
  countryInp.value = "";

  fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${cityVal}&country=${countryVal}&method=1`
  )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data.data.timings);

      if (data.code !== 200 || !data.data || !data.data.timings) {
        alert("Invalid city or country name!");
        return;
      }

      fajrTime.innerHTML = `<i class="fa fa-clock"></i> ${data.data.timings.Fajr}`;
      zuhrTime.innerHTML = `<i class="fa fa-clock"></i> ${data.data.timings.Dhuhr}`;
      asrTime.innerHTML = `<i class="fa fa-clock"></i> ${data.data.timings.Asr}`;
      magribTime.innerHTML = `<i class="fa fa-clock"></i> ${data.data.timings.Maghrib}`;
      ishaTime.innerHTML = `<i class="fa fa-clock"></i> ${data.data.timings.Isha}`;
    })
    .catch((error) => {
      alert("Something went wrong. Please try again.");
      console.log(error.message);
    });
});

const btn = document.getElementById("stop-btn");
const btn2 = document.getElementById("start-btn");

function setTimer() {
  let currentTime = new Date();

  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes().toString().padStart(2, "0");
  let seconds = currentTime.getSeconds().toString().padStart(2, "0");

  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  hours = hours.toString().padStart(2, "0");

  let times = `${hours}:${minutes}:${seconds} ${ampm}`;
  document.getElementById("fixtime").innerText = times;
}

let interval = setInterval(setTimer, 1000);
