var ReactLoginForm = React.createClass({
	render: function() {

			var $errors = '';
			var $errorList = [];
			if( this.props.error.length > 0 ) {

				for(var i = 0; i < this.props.error.length; i++ ) {
				  // Using the React 'dangerouslySetInnerHTML' because we trust the error HTML provided by WordPress
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