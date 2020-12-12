
const form = document.querySelector(".top-section form");
const input = document.querySelector(".top-section input");
const msg = document.querySelector(".top-section .msg");
const list = document.querySelector(".ajax-section .cities");

const apiKey = "ee4895a52bbd50cadc45bd4ff6fb5629";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

 
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      
      if (inputVal.includes(",")) {
       
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
      
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } `;
      form.reset();
      input.focus();
      return;
    }
  }


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name}">
          <span>${name}</span>
          
        </h2>
        <div class="city-temp"><sup> Temperature: </sup>${Math.round(main.temp)}<sup>°C</sup></div>
        <div class = "city-humid"><sup> Humidity: </sup>${main.humidity}<sup>%</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Invalid City Name!";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});