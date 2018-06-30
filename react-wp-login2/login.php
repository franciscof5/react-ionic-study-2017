<?php

// ...

add_action( 'wp_ajax_nopriv_react_login_user', 'react_login_user' );
add_action( 'wp_ajax_react_login_user', 'react_login_user' );
function react_login_user() {
	global $wpdb;
	check_ajax_referer( 'wp_react_login', '_wpnonce' );

	$username = $_POST['username'];
	$password = $_POST['password'];

	$auth = wp_authenticate( $username, $password );
	if( is_wp_error( $auth )) {
		echo  json_encode(
			array(
				'success' => 0,
				'message' => $auth->get_error_message()
			));
	} else {
		wp_set_auth_cookie( $auth->ID );
		echo  json_encode(
			array(
				'success' => 1,
				'user' => $auth
			));
	}
	

	wp_die();
}