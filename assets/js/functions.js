export function generateWheelSections(wheelDiv) {
  const optionsArray = document.getElementsByClassName("option_item_input");

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

export function deleteOption(id) {
  const optionLi = document.getElementById(`option_item_${id}`);
  optionLi.remove();
}

export function getRandomOption(options_id_array) {
  return options_id_array[Math.round(Math.random() * (options_id_array.length - 1))];
}

export function getRotationAngle(matrix) {
  const values = matrix.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];
  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

  return angle >= 0 ? angle : angle + 360;
}

export async function copyResultToClipboard() {
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

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
