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
        <button type="button" class="push_btn">Push</button>
      </div>
    </div>

    <div class="options_container">
      <ul class="options_list">
        <li class="option_item">Option 1</li>
        <li class="option_item">Option 2</li>
        <li class="option_item">Option 3</li>
        <li class="option_item">Option 4</li>
        <li class="option_item">Option 5</li>
      </ul>

      <div class="add_option">
        <input type="text" class="new_option" placeholder="New option">

        <button type="button" aria-label="Add new option" class="add_option_btn">+</button>
      </div>
    </div>
  </main>
</body>

<?php wp_footer(); ?>

</html>