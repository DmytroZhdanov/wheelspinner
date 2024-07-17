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
  <title>Document</title>
  <?php wp_head(); ?>
</head>

<body>
  <main class="container main_container">
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
        <li class="option_item"><input type="text" id="option_1" class="option_item_input" value="Option 1" /></li>
        <li class="option_item"><input type="text" id="option_2" class="option_item_input" value="Option 2" /></li>
        <li class="option_item"><input type="text" id="option_3" class="option_item_input" value="Option 3" /></li>
        <li class="option_item"><input type="text" id="option_4" class="option_item_input" value="Option 4" /></li>
        <li class="option_item"><input type="text" id="option_5" class="option_item_input" value="Option 5" /></li>
      </ul>

      <div class="add_option">
        <input type="text" class="new_option_input" placeholder="New option">

        <button type="button" aria-label="Add new option" class="add_option_btn">+</button>
      </div>
    </div>
  </main>
</body>

<?php wp_footer(); ?>

</html>