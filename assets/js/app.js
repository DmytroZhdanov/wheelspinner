const options_list = document.querySelector(".options_list");
let options_count = options_list.childElementCount;
// const options = options_list.childNodes.values();

/**
 * Initial function. Generate and insert default options to html /
 * Función inicial. Generar e insertar opciones predeterminadas en html.
 */
// TODO: Transfer to php
// (() => {
//   const options_container = document.querySelector(".options_container");
//   const options_list = document.querySelector(".options_list");

//   let markup_arr = [];

//   for (let i = 0; i < options.length; i += 1) {
//     markup_arr.push(
//       `<li class="option_item"><input type="text" id="option_${
//         i + 1
//       }" class="option_item_input" value="${options[i]}" /></li>`
//     );
//   }

//   if (options_list) {
//     options_list.insertAdjacentHTML("afterbegin", markup_arr.join(""));
//   } else {
//     options_container.insertAdjacentHTML(
//       "afterbegin",
//       `<ul class="options_list">${markup_arr.join("")}</ul>`
//     );
//   }
// })();

/**
 * Function to add a new option /
 * Función para agregar una nueva opción.
 */
(() => {
  const options_list = document.querySelector(".options_list");
  const add_option_btn = document.querySelector(".add_option_btn");
  const new_option_input = document.querySelector(".new_option_input");

  add_option_btn.addEventListener("click", onAddOptionBtnClick);

  function onAddOptionBtnClick() {
    options_count += 1;

    options_list.insertAdjacentHTML(
      "beforeend",
      `<li class="option_item"><input type="text" id="option_${options_count}" class="option_item_input" value="${new_option_input.value}" /></li>`
    );

    new_option_input.value = "";

    generateWheelSections();
  }
})();

(() => {
  const options_list = document.querySelector(".options_list");

  options_list.addEventListener("input", onInput);

  function onInput(e) {
    const { id, value } = e.target;
    const input_id = id.split("_")[1];
    const label_to_change = document.getElementById(`label_${input_id}`);
    label_to_change.innerText = value;
  }
})();

function generateWheelSections() {
  const options_array = document.getElementsByClassName("option_item_input");
  const wheel = document.querySelector(".wheel");

  let options = [];
  for (const element of options_array) {
    options.push(element.value);
  }

  const options_count = options.length;
  const step = 360 / options_count;

  let color_stops = [];
  let sectors_markup = [];

  for (let i = 0; i < options.length; i += 1) {
    const color = getRandomHexColor();
    color_stops.push(`${color} ${step * i}deg, ${color} ${step * (i + 1)}deg`);

    sectors_markup.push(
      `<span id="label_${i + 1}" class="sector_label" style="transform: rotate(${
        -90 - step / 2 + step * i
      }deg)">${options[i]}</span>`
    );
  }

  wheel.style.background = `conic-gradient(${color_stops.join(",")})`;
  wheel.style.transform = `rotate(${step / 2}deg)`;

  wheel.innerHTML = sectors_markup.join("");
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
