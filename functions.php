<?php
if (!defined("ABSPATH")) exit;

// Define constants
if (!defined("_VERSION")) {
  define("_VERSION", "1.0.0");
}

add_action("wp_enqueue_scripts", "test_scripts");
function test_scripts()
{
  // Styles
  wp_enqueue_style(
    "test-style",
    get_template_directory_uri() . "/assets/scss/app.min.css",
    [],
    _VERSION
  );

  //Scripts
  wp_enqueue_script(
    "test-script",
    get_template_directory_uri() . "/assets/js/app.min.js",
    [],
    _VERSION,
    true
  );
}
