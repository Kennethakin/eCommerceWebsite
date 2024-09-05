const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  endDate = document.querySelector(".js-endDate"),
  countdown = document.querySelector(".js-countdown"),
  countdownValues = document.querySelectorAll(".js-countdownValue");
let tempDate = new Date(),
  tempYear = tempDate.getFullYear(),
  tempMonth = tempDate.getMonth(),
  tempDay = tempDate.getDate();
const futureDate = new Date(tempYear, tempMonth, tempDay + 12, 9, 14, 0),
  year = futureDate.getFullYear(),
  date = futureDate.getDate(),
  hours = futureDate.getHours(),
  minutes = futureDate.getMinutes(),
  month = months[futureDate.getMonth()],
  weekday = weekdays[futureDate.getDay()];
endDate.innerHTML = `Offer ends on <time>${weekday}, ${date} ${month} ${year} ${hours}:${minutes}</time>`;
const futureTime = futureDate.getTime();
function getRemainingTime() {
  const e = new Date().getTime(),
    t = futureTime - e,
    n = 864e5,
    a = 36e5;
  let u = t / n;
  u = Math.floor(u);
  const o = [
    u,
    Math.floor((t % n) / a),
    Math.floor((t % a) / 6e4),
    Math.floor((t % 6e4) / 1e3),
  ];
  countdownValues.forEach((e, t) => {
    e.innerHTML = (function (e) {
      return e < 10 ? `0${e}` : e;
    })(o[t]);
  }),
    t < 0 &&
      (clearInterval(countdown),
      (countdown.innerHTML =
        '<p class="countdown__alert" >Sorry, this offer has expired</p>'));
}
let setCountdown = setInterval(getRemainingTime, 1e3);
getRemainingTime();
