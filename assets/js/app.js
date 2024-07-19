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

  //* FUNCTIONS FOR EVENT LISTENERS / FUNCIONES PARA DETECTORES DE EVENTOS

  /**
   * Add new option to options list and update wheel with the new option. /
   * Agregue una nueva opción a la lista de opciones y actualice la rueda con la nueva opción.
   *
   * @param {ClickEvent} e
   */
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

  /**
   * Update option label on the wheel when option value changing via list of options /
   * Actualizar la etiqueta de opción en la rueda cuando el valor de la opción cambia a través de la lista de opciones
   *
   * @param {InputEvent} e
   */
  function onInput(e) {
    const { id, value } = e.target;
    const splittedId = id.split("_");
    const optionOrder = splittedId[splittedId.length - 1];
    const labelToChange = document.getElementById(`label_${optionOrder}`);
    labelToChange.innerText = value;
  }

  /**
   * Delete selected option from the list of options and update the wheel /
   * Eliminar la opción seleccionada de la lista de opciones y actualizar la rueda
   *
   * @param {ClickEvent} e
   * @returns {undefined}
   */
  function onRemoveBtnClick(e) {
    e.stopPropagation();

    const splittedId = e.target.id.split("_");

    // If click has been called not on the delete button or image inside this button then return /
    // Si no se ha hecho clic en el botón Eliminar o en la imagen dentro de este botón, regrese
    if (!splittedId.includes("icon") && !splittedId.includes("btn")) {
      return;
    }

    const optionOrder = splittedId[splittedId.length - 1];

    deleteOption(optionOrder);
    generateWheelSections(wheelDiv);
  }

  /**
   * Spin the wheel and stop on random option. Then open pop up with the result /
   * Gira la rueda y detente en una opción aleatoria. Luego abre la ventana emergente con el resultado.
   */
  function onSpinBtnClick() {
    const optionInputsArray = document.getElementsByClassName("option_item_input");

    let optionIdArray = [];
    for (const option of optionInputsArray) {
      optionIdArray.push(option.id);
    }

    const selectedOptionId = getRandomOption(optionIdArray);
    const selectedOptionText = document.getElementById(selectedOptionId).value;

    // Calculate initial angle before spin / Calcular el ángulo inicial antes del giro
    const computedStyle = window.getComputedStyle(wheelDiv);
    const matrix = computedStyle.transform;
    const initialAngle = getRotationAngle(matrix);

    // Calculate terminal angle after spin to stop on selected option / Calcule el ángulo terminal después del giro para detenerse en la opción seleccionada
    const step = 360 / optionIdArray.length;
    const splittedId = selectedOptionId.split("_");
    const optionOrder = splittedId[splittedId.length - 1];
    const terminalAngle = 3600 + step / 2 - step * optionOrder + step;

    // Set up initial styles before spin / Configurar estilos iniciales antes de girar
    wheelDiv.style.animation = "none";
    wheelDiv.style.transform = `rotate(${initialAngle}deg)`;

    // Start spin / Empezar a girar
    setTimeout(() => {
      wheelDiv.style.transform = `rotate(${terminalAngle}deg)`;
    }, 0);

    // After spin / Después del giro
    setTimeout(() => {
      // Show results / Mostrar resultados
      resultTextP.innerHTML = `Result: <b>${selectedOptionText}</b>`;
      dialog.showModal();

      // Reset styles / Restablecer estilos
      wheelDiv.style.transition = "none";
      wheelDiv.style.transform = `rotate(${step / 2 - step * optionOrder + step}deg)`;
    }, 6300);
    setTimeout(() => {
      wheelDiv.style.transition = "";
    }, 0);
  }

  /**
   * If the click has been called on "copy" button or the image inside, then copy result to clipboard.
   * If the click has been called on "close" button, then close pop up /
   * Si se hizo clic en el botón "copiar" o en la imagen interna, copie el resultado al portapapeles.
   * Si se ha hecho clic en el botón "cerrar", cierre la ventana emergente
   *
   * @param {ClickEvent} e
   */
  function onDialogClick(e) {
    e.stopPropagation();

    const targetId = e.target.id;

    if (targetId === "copy_result_btn" || targetId === "copy_result_icon") {
      copyResultToClipboard();
    } else if (targetId === "close_dialog_btn") {
      dialog.close();
      wheelDiv.style.animation = "lazySpin 40s linear infinite";
    }
  }

  //* AUXILIARY FUNCTIONS / FUNCIONES AUXILIARES

  /**
   * Depends on the list of options generate and paste to DOM conic-gradient and labels with each option /
   * Depende de la lista de opciones, generar y pegar en DOM cónico-gradiente y etiquetas con cada opción
   *
   * @param {HTMLDivElement} wheelDiv
   * @returns {undefined}
   */
  function generateWheelSections(wheelDiv) {
    const optionsArray = document.getElementsByClassName("option_item_input");

    // If there is no options - set the wheel to default state /
    // Si no hay opciones, configure la rueda al estado predeterminado
    if (!optionsArray.length) {
      wheelDiv.innerHTML = "";
      wheelDiv.style.background = "gray";

      return;
    }

    let options = [];
    for (const element of optionsArray) {
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

    wheelDiv.style.background = `conic-gradient(${color_stops.join(",")})`;
    wheelDiv.style.transform = `rotate(${step / 2}deg)`;

    wheelDiv.innerHTML = sectors_markup.join("");
  }

  /**
   * Find HTMLLiElement according to it's order and remove it from DOM /
   * Busque HTMLLiElement según su orden y elimínelo del DOM
   *
   * @param {String} id String but with value of order number / Cadena pero con valor de número de pedido.
   */
  function deleteOption(id) {
    const optionLi = document.getElementById(`option_item_${id}`);
    optionLi.remove();
  }

  /**
   * Randomly choose one of the options /
   * Elige aleatoriamente una de las opciones.
   *
   * @param {String[]} options_id_array
   * @returns {String}
   */
  function getRandomOption(options_id_array) {
    return options_id_array[Math.round(Math.random() * (options_id_array.length - 1))];
  }

  /**
   * Determine current rotation angle of the wheel /
   * Determinar el ángulo de rotación actual de la rueda.
   *
   * @param {String} matrix
   * @returns {Number}
   */
  function getRotationAngle(matrix) {
    const values = matrix.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

    return angle >= 0 ? angle : angle + 360;
  }

  /**
   * Copy result to Clipboard /
   * Copiar resultado al portapapeles
   */
  async function copyResultToClipboard() {
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

  /**
   * Generate random color in HEX format /
   * Generar color aleatorio en formato HEX
   *
   * @returns {String}
   */
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
})();
