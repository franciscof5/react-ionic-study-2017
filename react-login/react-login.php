<?php

/*
Plugin Name: React Login
Description: WordPress Login Plugin built with React
Author: Igor Benić
Author URI: http://www.ibenic.com
 */

add_action( 'wp_enqueue_scripts', 'react_login_scripts');
function react_login_scripts() {
	if ( is_active_widget( false, false, 'react_login_widget', true ) ) {
		wp_enqueue_script( 'react-js', plugins_url( 'react.min.js', __FILE__ ), array(), false, true );
		wp_enqueue_script( 'reactdom-js', plugins_url( 'react-dom.min.js', __FILE__ ), array(), false, true );
		wp_register_script( 'babel-js', 'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js', array(), false, true );
		wp_localize_script( 'babel-js', 'wpReactLogin', array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'nonce' => wp_create_nonce( 'wp_react_login' ) ) );
		wp_enqueue_script( 'babel-js' );
	}
}


add_action('wp_footer', 'react_login_add_babel_script', 999);
function react_login_add_babel_script() {
	?>
	<script type="text/babel">
			var ReactLoginForm = React.createClass({
				render: function() {

						var $errors = '';
						var $errorList = [];
						if( this.props.error.length > 0 ) {

						
							for(var i = 0; i < this.props.error.length; i++ ) {
								$errorList.push(<li dangerouslySetInnerHTML={{__html: this.props.error[i] }}/>);  
							}
							$errors = <ul>{$errorList}</ul>;
							 
						}

						return (
							<form onSubmit={this.props.handleForm} name="reactLoginForm" className="react-login-form">
								{$errors}
								<p>
									<label for="react-login-name">Username</label>
									<input placeholder="Insert Username" type="text" name="reactLoginName" id="react-login-name"   />
								</p>
								<p>
								<label for="react-login-password">Password</label>
								<input placeholder="Insert Password" type="password" name="reactLoginPassword" id="react-login-password"   />
								</p>
								<button type="submit">Login</button>
							</form>
						);
					 
				} 
					
				
			});

			var ReactUserData = React.createClass({
				render: function() {
					 
						return (
						<div className="react-user-data">
						 Hello, {this.props.user.display_name}.
						 </div>
						);
					 
				} 
					
				
			});

			var ReactLogin = React.createClass({
				getInitialState: function(){
					return {
						logged: 0,
						error: [],
						user: {}
					}
				},
				
				checkFields: function(){
					var order = this.props.order;
					var $username = '';
					var $password = '';
					if( reactLogins.length > 1 ) {
						$username = window.reactLoginForm[order].reactLoginName.value;
						$password = window.reactLoginForm[order].reactLoginPassword.value;
					} else {
						$username = window.reactLoginForm.reactLoginName.value;
						$password = window.reactLoginForm.reactLoginPassword.value;
					}
					
					var $currentErrors = [];

					if( $username == '' ) {
						$currentErrors.push( "Username is empty" );
					}

					if( $password == '' ) {
						$currentErrors.push( "Password is empty" );
					}

					 
					this.setState({error: $currentErrors});
					
					
				},
				handleForm: function(e){
					e.preventDefault(); 

					this.checkFields();
					var order = this.props.order; 
					if( this.state.error.length == 0 ) {
						// Request Data
						var data = {
							action: 'react_login_user',
							_wpnonce: wpReactLogin.nonce,
							username: '',
							password: ''
						}
 
						if( reactLogins.length > 1 ) {
							data.username = window.reactLoginForm[order].reactLoginName.value;
							data.password = window.reactLoginForm[order].reactLoginPassword.value;
						} else {
							data.username = window.reactLoginForm.reactLoginName.value;
							data.password = window.reactLoginForm.reactLoginPassword.value;
						}

						jQuery.ajax({
					      url: wpReactLogin.ajax_url,
					      dataType: 'json',
					      method: 'POST',
					      data: data,
					      cache: false,
					      success: function(data) {
					         
					        if( ! data.success ) {
					        	var $currentErrors = this.state.error; 
					        	$currentErrors.push( data.message );

					        	if( $currentErrors.length > 0 ) {

									this.setState({error: $currentErrors});
									 
								}
					        } else {
					        	//this.setState({logged: 1, user: data.user.data});
					        	for( var doms = 0; doms < reactLoginDoms.length; doms++ ) {
					        		reactLoginDoms[ doms ].setState({logged: 1, user: data.user.data});
					        	}
					        }

					      }.bind(this),
					      error: function(xhr, status, err) {

					        alert(err.toString());
					      }.bind(this)
					    });
					}
					
				},
				componentDidMount: function() {
    
				    jQuery.ajax({
				      url: wpReactLogin.ajax_url,
				      dataType: 'json',
				      data: {action: 'react_check_if_logged'},
				      cache: false,
				      success: function(data) {
				         
				        if( data.success ) {

				        	this.setState({ logged: 1, user: data.user.data});
				        }

				      }.bind(this),
				      error: function(xhr, status, err) {

				        alert(err.toString());
				      }.bind(this)
				    });
				  },
				render: function(){
					var $renderElement = <ReactLoginForm 
										error={this.state.error} 
										handleForm={this.handleForm} />;
					if( this.state.logged ) {
						$renderElement = <ReactUserData user={this.state.user} />;
					}
					return ( $renderElement  );
				}
			});
			
			// Get all login widgets
			var reactLogins = document.getElementsByClassName("react_login");
			var reactLoginDoms = [];
			// For each login, create a new ReactLogin element
			for(var logins = 0; logins < reactLogins.length; logins++ ) {
				var dom = ReactDOM.render(
			        <ReactLogin order={logins} />,
			        reactLogins[ logins ]
			     ); 
			} 
			 
		</script> 
		<?php
}
 
class ReactLogin_Widget extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	function __construct() {
		parent::__construct(
			'react_login_widget', // Base ID
			__( 'React Login', 'reactposts' ), // Name
			array( 'description' => __( 'Login Widget created with React', 'reactposts' ), ) // Args
		);
	}

	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget( $args, $instance ) {
		echo $args['before_widget'];
		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
		}
		 
		echo '<div class="react_login"></div>';
		 
		echo $args['after_widget'];
	}

	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : __( 'New title', 'text_domain' );
		?>
		<p>
		<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e( esc_attr( 'Title:' ) ); ?></label> 
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
		</p>
		<?php 
	}

	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';

		return $instance;
	}

}

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

 
function register_react_login_widget() { 
     register_widget( 'ReactLogin_Widget' );
}
add_action( 'widgets_init', 'register_react_login_widget' );