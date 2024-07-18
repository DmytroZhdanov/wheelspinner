const options_list = document.querySelector(".options_list");
let options_count = options_list.childElementCount;

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

/**
 * Spin the wheel /
 * Gira la rueda
 */
(() => {
  const wheel = document.querySelector(".wheel");
  const spin_btn = document.querySelector(".push_btn");
  spin_btn.addEventListener("click", onSpinBtnClick);

  function onSpinBtnClick() {
    const options_list = document.getElementsByClassName("option_item_input");
    const dialog = document.querySelector(".result_dialog");
    const resultText = document.querySelector(".result_text");

    let options_id_array = [];
    for (const option of options_list) {
      options_id_array.push(option.id);
    }

    const selected_option_id = getRandomOption(options_id_array);
    const selected_option_text = document.getElementById(selected_option_id).value;

    // Calculate initial angle before spin
    const computed_style = window.getComputedStyle(wheel);
    const matrix = computed_style.transform;
    const initial_angle = getRotationAngle(matrix);

    // Calculate terminal angle after spin to stop on selected option
    const step = 360 / options_id_array.length;
    const splitted_id = selected_option_id.split("_");
    const order = splitted_id[splitted_id.length - 1];
    const terminal_angle = 3600 + step / 2 - step * order + step;

    // Set up initial styles before spin
    wheel.style.animation = "none";
    wheel.style.transform = `rotate(${initial_angle}deg)`;

    // Start spin
    setTimeout(() => {
      wheel.style.transform = `rotate(${terminal_angle}deg)`;
    }, 0);

    // After spin
    setTimeout(() => {
      // Show results
      resultText.innerHTML = `Result: <b>${selected_option_text}</b>`;
      dialog.showModal();
      dialog.addEventListener("click", onDialogClick);

      // Reset styles
      wheel.style.transition = "none";
      wheel.style.transform = `rotate(${step / 2 - step * order + step}deg)`;
    }, 6300);
    setTimeout(() => {
      wheel.style.transition = "";
    }, 0);
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

function getRandomOption(options_id_array) {
  return options_id_array[Math.round(Math.random() * (options_id_array.length - 1))];
}

function getRotationAngle(matrix) {
  const values = matrix.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];
  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

  return angle >= 0 ? angle : angle + 360;
}

function onDialogClick(e) {
  e.stopPropagation();

  const targetId = e.target.id;

  if (targetId === "copy_result_btn" || targetId === "copy_result_icon") {
    copyToClipboard();
  }

  if (targetId === "close_dialog_btn") {
    closeDialog();
  }
}

function closeDialog() {
  const dialog = document.querySelector(".result_dialog");
  const wheel = document.querySelector(".wheel");

  dialog.close();

  wheel.style.animation = "lazySpin 40s linear infinite";
}

async function copyToClipboard() {
  const result = document.querySelector(".result_text").innerText;

  if (navigator.clipboard && window.isSecureContext) {
    // If clipboard is not blocked / Si el portapapeles no está bloqueado
    await navigator.clipboard.writeText(result);
  } else {
    // If clipboard is blocked / Si el portapapeles está bloqueado
    const textArea = document.createElement("textarea");
    textArea.value = result;

    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  }
}
