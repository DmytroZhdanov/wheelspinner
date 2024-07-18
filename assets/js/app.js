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

  add_option_btn.addEventListener("click", onAddOptionBtnClick);

  function onAddOptionBtnClick() {
    const new_option_input = document.querySelector(".new_option_input");
    const new_option_text = new_option_input.value;

    if (new_option_text.trim() !== "") {
      options_count += 1;

      options_list.insertAdjacentHTML(
        "beforeend",
        `<li class="option_item" id="option_item_${options_count}">
          <input type="text" id="option_input_${options_count}" class="option_item_input" value="${new_option_text}" />

          <button type="button" id="remove_option_btn_${options_count}" class="remove_icon_btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#d32f2f" viewBox="0 0 32 32" id="remove_option_icon_${options_count}" class="remove_icon">
              <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
              <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
            </svg>
          </button>
        </li>`
      );

      new_option_input.value = "";

      generateWheelSections();
    }
  }
})();

/**
 * Track input change /
 * Seguimiento del cambio de entrada
 */
(() => {
  const options_list = document.querySelector(".options_list");

  options_list.addEventListener("input", onInput);

  function onInput(e) {
    const { id, value } = e.target;
    const splitted_id = id.split("_");
    const input_id = splitted_id[splitted_id.length - 1];
    const label_to_change = document.getElementById(`label_${input_id}`);
    label_to_change.innerText = value;
  }
})();

/**
 * Listening to remove option buttons /
 * Escuchando para eliminar botones de opción
 */
(() => {
  const options_list = document.querySelector(".options_list");

  options_list.addEventListener("click", onRemoveBtnClick);

  function onRemoveBtnClick(e) {
    e.stopPropagation();

    const splitted_id = e.target.id.split("_");

    if (!splitted_id.includes("icon") && !splitted_id.includes("btn")) {
      return;
    }

    const option_id = splitted_id[splitted_id.length - 1];

    deleteOption(option_id);
  }
})();

function generateWheelSections() {
  const options_array = document.getElementsByClassName("option_item_input");
  const wheel = document.querySelector(".wheel");

  if (!options_array.length) {
    wheel.innerHTML = "";
    wheel.style.background = "gray";
    return;
  }

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

function deleteOption(id) {
  const option_item = document.getElementById(`option_item_${id}`);

  option_item.remove();

  generateWheelSections();
}
