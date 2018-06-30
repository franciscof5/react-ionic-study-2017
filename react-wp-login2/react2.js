var ReactLogin = React.createClass({
  // Initial State
	getInitialState: function(){
		return {
			logged: 0, // boolean if logged in or not
			error: [], // array of errors
			user: {}, // user data
		}
	},
	// Check Fields for errors
	checkFields: function(){
		var order = this.props.order;
		var $username = '';
		var $password = '';
		// If there are more than one login, use the one in which we are
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
		
		// If there are no errors
		if( this.state.error.length == 0 ) {
			// Request Data
			var data = {
				action: 'react_login_user',
				_wpnonce: wpReactLogin.nonce,
				username: '',
				password: ''
			}
      			// If there are more than 1 login form, use the current one
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
		                // If there are errors, set it in state of the current React Object
		    						this.setState({error: $currentErrors});
		    						 
		    					}
				        } else {
				          // If there are no errors, set the logged and user data to all our login forms
				        	for( var doms = 0; doms < reactLoginDoms.length; doms++ ) {
				        		reactLoginDoms[ doms ].setState({logged: 1, user: data.user.data});
				        	}
				        }

			      	}.bind(this),
			      	error: function(xhr, status, err) {
	            			// Create your own error handling if needed
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
            		// If our user is logged in, change the state
	        	this.setState({ logged: 1, user: data.user.data});
	        }

	      }.bind(this),
	      error: function(xhr, status, err) {

	        alert(err.toString());
	      }.bind(this)
	    });
	  },
	render: function(){
	  // We have our LoginForm first
		var $renderElement = <ReactLoginForm 
					error={this.state.error} 
					handleForm={this.handleForm} />;
		if( this.state.logged ) {
		  	//If logged in, use the ReactUserData to show the user data
			$renderElement = <ReactUserData user={this.state.user} />;
		}
		return ( $renderElement  );
	}
});