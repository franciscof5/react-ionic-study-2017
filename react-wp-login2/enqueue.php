<?php

// ...

add_action( 'wp_enqueue_scripts', 'react_login_scripts');
function react_login_scripts() {
	if ( is_active_widget( false, false, 'react_login_widget', true ) ) {
		wp_enqueue_script( 'react-js', plugins_url( 'react.min.js', __FILE__ ), array(), false, true );
		wp_enqueue_script( 'reactdom-js', plugins_url( 'react-dom.min.js', __FILE__ ), array(), false, true );
		// No recommended in production, better to babelify your script
		wp_register_script( 'babel-js', 'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js', array(), false, true );
		wp_localize_script( 'babel-js', 'wpReactLogin', array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'nonce' => wp_create_nonce( 'wp_react_login' ) ) );
		wp_enqueue_script( 'babel-js' );
	}
}