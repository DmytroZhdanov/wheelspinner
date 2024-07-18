<?php
/*
Template Name: Wheelspinner
Template Post Type: page
*/
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wheel of Fortune: Spin to Win!</title>
  <?php wp_head(); ?>
</head>

<body>
  <main class="container">
    <h1 class="title">Wheel of Fortune: Spin to Win!</h1>

    <div class="main_container">
      <div class="wheel_container">
        <div class="wheel">
          <span id="label_1" class="sector_label" style="transform: rotate(-126deg)">Option 1</span>
          <span id="label_2" class="sector_label" style="transform: rotate(-54deg)">Option 2</span>
          <span id="label_3" class="sector_label" style="transform: rotate(18deg)">Option 3</span>
          <span id="label_4" class="sector_label" style="transform: rotate(90deg)">Option 4</span>
          <span id="label_5" class="sector_label" style="transform: rotate(162deg)">Option 5</span>
        </div>

        <button type="button" class="push_btn">Push</button>
      </div>

      <div class="options_container">
        <ul class="options_list">
          <li class="option_item" id="option_item_1">
            <input type="text" id="option_input_1" class="option_item_input" value="Option 1" />

            <button type="button" id="remove_option_btn_1" class="remove_icon_btn">
              <img id="remove_option_icon_1" src="<?php echo get_template_directory_uri(); ?>/assets/icons/remove_icon.svg" alt="delete" class="remove_icon">
            </button>
          </li>

          <li class="option_item" id="option_item_2">
            <input type="text" id="option_input_2" class="option_item_input" value="Option 2" />

            <button type="button" id="remove_option_btn_2" class="remove_icon_btn">
              <img id="remove_option_icon_2" src="<?php echo get_template_directory_uri(); ?>/assets/icons/remove_icon.svg" alt="delete" class="remove_icon">
            </button>
          </li>

          <li class="option_item" id="option_item_3">
            <input type="text" id="option_input_3" class="option_item_input" value="Option 3" />

            <button type="button" id="remove_option_btn_3" class="remove_icon_btn">
              <img id="remove_option_icon_3" src="<?php echo get_template_directory_uri(); ?>/assets/icons/remove_icon.svg" alt="delete" class="remove_icon">
            </button>
          </li>

          <li class="option_item" id="option_item_4">
            <input type="text" id="option_input_4" class="option_item_input" value="Option 4" />

            <button type="button" id="remove_option_btn_4" class="remove_icon_btn">
              <img id="remove_option_icon_4" src="<?php echo get_template_directory_uri(); ?>/assets/icons/remove_icon.svg" alt="delete" class="remove_icon">
            </button>
          </li>

          <li class="option_item" id="option_item_5">
            <input type="text" id="option_input_5" class="option_item_input" value="Option 5" />

            <button type="button" id="remove_option_btn_5" class="remove_icon_btn">
              <img id="remove_option_icon_5" src="<?php echo get_template_directory_uri(); ?>/assets/icons/remove_icon.svg" alt="delete" class="remove_icon">
            </button>
          </li>
        </ul>

        <div class="add_option">
          <input type="text" class="new_option_input" placeholder="New option">

          <button type="button" aria-label="Add new option" class="add_option_btn">+</button>
        </div>
      </div>
    </div>

    <dialog class="result_dialog">
      <div class="result_text_wrapper">
        <p class="result_text"></p>

        <button type="button" id="copy_result_btn" class="copy_result_btn">
          <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/copy.svg" alt="copy" id="copy_result_icon" class="copy_icon">
        </button>
      </div>

      <button type="button" id="close_dialog_btn" class="close_dialog_btn">Close</button>
    </dialog>
  </main>
</body>

<?php wp_footer(); ?>

</html>