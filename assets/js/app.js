import {
  copyResultToClipboard,
  deleteOption,
  generateWheelSections,
  getRandomOption,
  getRotationAngle,
} from "./functions";

(() => {
  const addOptionBtn = document.querySelector(".add_option_btn");
  const optionsUl = document.querySelector(".options_list");
  const wheelDiv = document.querySelector(".wheel");
  const spinBtn = document.querySelector(".push_btn");
  const dialog = document.querySelector(".result_dialog");
  const resultTextP = document.querySelector(".result_text");

  addOptionBtn.addEventListener("click", onAddOptionBtnClick);
  optionsUl.addEventListener("input", onInput);
  optionsUl.addEventListener("click", onRemoveBtnClick);
  spinBtn.addEventListener("click", onSpinBtnClick);
  dialog.addEventListener("click", onDialogClick);

  function onAddOptionBtnClick(e) {
    e.stopPropagation();

    const newOptionInput = document.querySelector(".new_option_input");
    const newOptionText = newOptionInput.value;

    if (newOptionText.trim() !== "") {
      const optionsCount = optionsUl.childElementCount + 1;

      optionsUl.insertAdjacentHTML(
        "beforeend",
        `<li class="option_item" id="option_item_${optionsCount}">
          <input type="text" id="option_input_${optionsCount}" class="option_item_input" value="${newOptionText}" />

          <button type="button" id="remove_option_btn_${optionsCount}" class="remove_icon_btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#d32f2f" viewBox="0 0 32 32" id="remove_option_icon_${optionsCount}" class="remove_icon">
              <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
              <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
            </svg>
          </button>
        </li>`
      );

      newOptionInput.value = "";

      generateWheelSections(wheelDiv);
    }
  }

  function onInput(e) {
    const { id, value } = e.target;
    const splittedId = id.split("_");
    const optionOrder = splittedId[splittedId.length - 1];
    const labelToChange = document.getElementById(`label_${optionOrder}`);
    labelToChange.innerText = value;
  }

  function onRemoveBtnClick(e) {
    e.stopPropagation();

    const splittedId = e.target.id.split("_");

    if (!splittedId.includes("icon") && !splittedId.includes("btn")) {
      return;
    }

    const optionOrder = splittedId[splittedId.length - 1];

    deleteOption(optionOrder);
    generateWheelSections(wheelDiv);
  }

  function onSpinBtnClick() {
    const optionInputsArray = document.getElementsByClassName("option_item_input");

    let optionIdArray = [];
    for (const option of optionInputsArray) {
      optionIdArray.push(option.id);
    }

    const selectedOptionId = getRandomOption(optionIdArray);
    const selectedOptionText = document.getElementById(selectedOptionId).value;

    // Calculate initial angle before spin
    const computedStyle = window.getComputedStyle(wheelDiv);
    const matrix = computedStyle.transform;
    const initialAngle = getRotationAngle(matrix);

    // Calculate terminal angle after spin to stop on selected option
    const step = 360 / optionIdArray.length;
    const splittedId = selectedOptionId.split("_");
    const optionOrder = splittedId[splittedId.length - 1];
    const terminalAngle = 3600 + step / 2 - step * optionOrder + step;

    // Set up initial styles before spin
    wheelDiv.style.animation = "none";
    wheelDiv.style.transform = `rotate(${initialAngle}deg)`;

    // Start spin
    setTimeout(() => {
      wheelDiv.style.transform = `rotate(${terminalAngle}deg)`;
    }, 0);

    // After spin
    setTimeout(() => {
      // Show results
      resultTextP.innerHTML = `Result: <b>${selectedOptionText}</b>`;
      dialog.showModal();

      // Reset styles
      wheelDiv.style.transition = "none";
      wheelDiv.style.transform = `rotate(${step / 2 - step * optionOrder + step}deg)`;
    }, 6300);
    setTimeout(() => {
      wheelDiv.style.transition = "";
    }, 0);
  }

  function onDialogClick(e) {
    e.stopPropagation();

    const targetId = e.target.id;

    if (targetId === "copy_result_btn" || targetId === "copy_result_icon") {
      copyResultToClipboard();
    } else if (targetId === "close_dialog_btn") {
      closeDialog();
    }
  }

  function closeDialog() {
    dialog.close();
    wheelDiv.style.animation = "lazySpin 40s linear infinite";
  }
})();

// const options_list = document.querySelector(".options_list");
// let options_count = options_list.childElementCount;

/**
 * Function to add a new option /
 * Función para agregar una nueva opción.
 */
// (() => {
//   const options_list = document.querySelector(".options_list");
//   const add_option_btn = document.querySelector(".add_option_btn");

//   add_option_btn.addEventListener("click", onAddOptionBtnClick);

//   function onAddOptionBtnClick(e) {
//     e.stopPropagation();

//     const newOptionInput = document.querySelector(".new_option_input");
//     const newOptionText = newOptionInput.value;

//     if (newOptionText.trim() !== "") {
//       optionsCount += 1;

//       options_list.insertAdjacentHTML(
//         "beforeend",
//         `<li class="option_item" id="option_item_${optionsCount}">
//           <input type="text" id="option_input_${optionsCount}" class="option_item_input" value="${newOptionText}" />

//           <button type="button" id="remove_option_btn_${optionsCount}" class="remove_icon_btn">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="#d32f2f" viewBox="0 0 32 32" id="remove_option_icon_${optionsCount}" class="remove_icon">
//               <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
//               <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
//             </svg>
//           </button>
//         </li>`
//       );

//       newOptionInput.value = "";

//       generateWheelSections(wheelDiv);
//     }
//   }
// })();

/**
 * Track input change /
 * Seguimiento del cambio de entrada
 */
// (() => {
//   const options_list = document.querySelector(".options_list");

//   options_list.addEventListener("input", onInput);

//   function onInput(e) {
//     const { id, value } = e.target;
//     const splittedId = id.split("_");
//     const optionOrder = splittedId[splittedId.length - 1];
//     const labelToChange = document.getElementById(`label_${optionOrder}`);
//     labelToChange.innerText = value;
//   }
// })();

/**
 * Listening to remove option buttons /
 * Escuchando para eliminar botones de opción
 */
// (() => {
//   const options_list = document.querySelector(".options_list");

//   options_list.addEventListener("click", onRemoveBtnClick);

//   function onRemoveBtnClick(e) {
//     e.stopPropagation();

//     const splittedId = e.target.id.split("_");

//     if (!splittedId.includes("icon") && !splittedId.includes("btn")) {
//       return;
//     }

//     const optionOrder = splittedId[splittedId.length - 1];

//     deleteOption(optionOrder);
//   }
// })();

/**
 * Spin the wheel /
 * Gira la rueda
 */
// (() => {
//   const wheel = document.querySelector(".wheel");
//   const spin_btn = document.querySelector(".push_btn");
//   spin_btn.addEventListener("click", onSpinBtnClick);

//   function onSpinBtnClick() {
//     const optionInputsArray = document.getElementsByClassName("option_item_input");

//     let options_id_array = [];
//     for (const option of optionInputsArray) {
//       options_id_array.push(option.id);
//     }

//     const selectedOptionId = getRandomOption(options_id_array);
//     const selectedOptionText = document.getElementById(selectedOptionId).value;

//     // Calculate initial angle before spin
//     const computedStyle = window.getComputedStyle(wheelDiv);
//     const matrix = computedStyle.transform;
//     const initialAngle = getRotationAngle(matrix);

//     // Calculate terminal angle after spin to stop on selected option
//     const step = 360 / options_id_array.length;
//     const splittedId = selectedOptionId.split("_");
//     const optionOrder = splittedId[splittedId.length - 1];
//     const terminalAngle = 3600 + step / 2 - step * optionOrder + step;

//     // Set up initial styles before spin
//     wheelDiv.style.animation = "none";
//     wheelDiv.style.transform = `rotate(${initialAngle}deg)`;

//     // Start spin
//     setTimeout(() => {
//       wheelDiv.style.transform = `rotate(${terminalAngle}deg)`;
//     }, 0);

//     // After spin
//     setTimeout(() => {
//       // Show results
//       resultText.innerHTML = `Result: <b>${selectedOptionText}</b>`;
//       dialog.showModal();
//       dialog.addEventListener("click", onDialogClick);

//       // Reset styles
//       wheelDiv.style.transition = "none";
//       wheelDiv.style.transform = `rotate(${step / 2 - step * optionOrder + step}deg)`;
//     }, 6300);
//     setTimeout(() => {
//       wheelDiv.style.transition = "";
//     }, 0);
//   }
// })();

// function onDialogClick(e) {
//   e.stopPropagation();

//   const targetId = e.target.id;

//   if (targetId === "copy_result_btn" || targetId === "copy_result_icon") {
//     copyResultToClipboard();
//   } else if (targetId === "close_dialog_btn") {
//     closeDialog();
//   }
// }

// function closeDialog() {
//   dialog.close();
//   wheelDiv.style.animation = "lazySpin 40s linear infinite";
// }
