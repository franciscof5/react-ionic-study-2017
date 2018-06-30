<?php

// ...

add_action( 'wp_ajax_nopriv_react_check_if_logged', 'react_check_if_logged' );
add_action( 'wp_ajax_react_check_if_logged', 'react_check_if_logged' );
function react_check_if_logged(){
	$id = get_current_user_id();
	if( $id > 0 ){
		echo  json_encode(
			array(
				'success' => 1,
				'user' => new WP_User($id)
			));
	} else {
		echo  json_encode(
			array(
				'success' => 0
			));
	}

	wp_die();
}