// Get all login widgets
var reactLogins = document.getElementsByClassName("react_login");
// Store for each ReactDOM
var reactLoginDoms = [];

// For each login, create a new ReactLogin element
for(var logins = 0; logins < reactLogins.length; logins++ ) {
  
	var dom = ReactDOM.render(
	      // Add property 'order' to know in which we are
        <ReactLogin order={logins} />,
        // DOM for each login
        reactLogins[ logins ]
     );
  // Push our ReactDOM to our Store
	reactLoginDoms.push(dom);
}