<?php
/**
 * Plugin Name: Free Stock Images and Videos
 * Plugin URI: https://github.com/zeopix/wordpress-free-stock-images/
 * Description: free-stock-images — is a Gutenberg plugin created via create-guten-block.
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
