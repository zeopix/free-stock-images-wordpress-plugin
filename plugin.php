<?php
/**
 * Plugin Name: Free Stock Images and Videos - Giphy, Pixabay, Unsplash...
 * Plugin URI: https://github.com/zeopix/free-stock-images-wordpress-plugin
 * Description: Free Stock Images — is a Gutenberg plugin that offers you the possibility to quickly stick license free images and gifs from Giphy, Pixabay, Unsplash and more incoming
 * Author: Iván Guillén <hello@ivanguillen.me>
 * Author URI: https://ivanguillen.me/
 * Version: 0.0.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package free-stock-images
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
