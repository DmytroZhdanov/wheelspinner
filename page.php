<?php
/*
Template Name: Wheelspinner
Template Post Type: page
*/

$options = [
  "Option 1", "Option 2", "Option 3", "Option 4", "Option 5"
]
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
          <?php foreach ($options as $index => $option) : ?>
            <span id="label_<?php echo $index + 1; ?>" class="sector_label" style="transform: rotate(<?php echo (-90 - (180 / count($options)) + (360 / count($options) * $index)) ?>deg)"><?php echo $option; ?></span>
          <?php endforeach; ?>
        </div>

        <button type="button" class="push_btn">Push</button>
      </div>

      <div class="options_container">
        <ul class="options_list">
          <?php foreach ($options as $index => $option) : ?>
            <li class="option_item" id="option_item_<?php echo $index + 1; ?>">
              <input type="text" id="option_input_<?php echo $index + 1; ?>" class="option_item_input" value="<?php echo $option; ?>" />

              <button type="button" id="remove_option_btn_<?php echo $index + 1; ?>" class="remove_icon_btn">
                <img id="remove_option_icon_<?php echo $index + 1; ?>" src="<?php echo get_template_directory_uri(); ?>/assets/icons/remove_icon.svg" alt="delete" class="remove_icon">
              </button>
            </li>
          <?php endforeach; ?>
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

    <div class="social_share_container">
      <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/share.svg" alt="Share" class="social_icon share_icon">

      <ul class="social_share_list">
        <li><button type="button" id="x_button" class="social_btn"><img src="<?php echo get_template_directory_uri(); ?>/assets/icons/x.svg" alt="X (Twitter)" id="x_icon" class="social_icon"></button></li>
        <li><button type="button" id="facebook_button" class="social_btn"><img src="<?php echo get_template_directory_uri(); ?>/assets/icons/facebook.svg" alt="Facebook" id="facebook_icon" class="social_icon"></button></li>
        <li><button type="button" id="whatsapp_button" class="social_btn"><img src="<?php echo get_template_directory_uri(); ?>/assets/icons/whatsapp.svg" alt="WhatsApp" id="whatsapp_icon" class="social_icon"></button></li>
        <li><button type="button" id="telegram_button" class="social_btn"><img src="<?php echo get_template_directory_uri(); ?>/assets/icons/telegram.svg" alt="Telegram" id="telegram_icon" class="social_icon"></button></li>
        <li><button type="button" id="email_button" class="social_btn"><img src="<?php echo get_template_directory_uri(); ?>/assets/icons/email.svg" alt="Email" id="email_icon" class="social_icon"></button></li>
      </ul>
    </div>
  </main>
</body>

<?php wp_footer(); ?>

</html>