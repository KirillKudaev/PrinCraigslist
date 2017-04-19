
Parse.initialize("c2223ba7dbada94452e35b1659301bc6fc8bba82");
Parse.serverURL = 'http://ec2-35-163-159-109.us-west-2.compute.amazonaws.com:80/parse';


//################################################################################################
//ViewController methods
//################################################################################################
function signupUser() {
	event.preventDefault();

	var driver = new Driver();

	//Need to wait for 
	var resp = driver.signUpUser($("#createFirstName").val(), $("#createLastName").val(),
	 $("#createEmail").val(), $("#createUserPass").val());
	
	//add response validation
}

function getUser() {
	event.preventDefault();

	var driver = new Driver();

	//Need to wait for 
	var user = driver.getUser();
	
	console.log("email: " + user.email);
	console.log("first: " + user.firstName);
	console.log("last: " + user.lastName);
		
		
}

function updateUser() {
	event.preventDefault();

	var driver = new Driver();

	//Need to wait for 
	var user = driver.updateUser($("#updateFirstName").val(), $("#updateLastName").val(),
	 $("#updateEmail").val(), $("#updateUserPass").val());
	
	console.log("email: " + user.get("email"));
	console.log("first: " + user.get("firstName"));
	console.log("last: " + user.get("lastName"));
	
	//add response validation
			
}

function deleteUser() {
	event.preventDefault();
	
	var driver = new Driver();
	
	driver.deleteUser();
}
//################################################################################################


//************************************************************************************************
//Model 
//************************************************************************************************
function Driver() {
	//this.user = new Parse.User();
}


Driver.prototype = {
	
	/*
	*	Initialize user in DB
	*	RETURN: Array of validator tags indicating errors, or empty array if none 
	*/
	signUpUser : function(firstName, lastName, email, password) {
	
		console.log("email: " + email);
		console.log("first: " + firstName);
		console.log("last: " + lastName);
		console.log("pass: " + password);
		
		var user = new Parse.User();
		
		//set values for user
		user.set("firstName", firstName);
		user.set("lastName", lastName);
		user.set("email", email);
		user.set("password", password);
		user.set("username", email);
		
		//create the account - send in to parse server
		user.signUp(null, {
		  success: function(user) {
			alert("signup successful!");
		  },
		  error: function(user, error) {
			if (error.code == 202)
				alert("This email is already in use, please use a different one");
			else
				alert("Error: " + error.code + " " + error.message);
		  }
		});
	},
	
	
	/*
	*	Retrieve current user info
	*	RETURN: firstName, lastName, and email as User object
	*/
	getUser : function() {
		//Get current user
		var user = new Parse.User.current();
		//var user = new User (userTemp.get("firstName"), 
		//userTemp.get("lastName"), userTemp.get("email"));
		
		return {
			"firstName" : user.get("firstName"),
			"lastName"  : user.get("lastName"),
			"email"     : user.get("email")
		};	
	},
	
	/*
	*	Update current user's info
	*	RETURN: Array of validator tags indicating errors, or empty array if none 
	*/
	updateUser : function(firstName, lastName, email, password, oldPassword) {
		
		//Get current user
		var user = new Parse.User.current();
		
		//Add validation
		if (firstName)
			user.set("firstName", firstName);
		if (lastName)
			user.set("lastName", lastName);
		if (email)
			user.set("email", email);
		
		//Check for correct old password
		if (password)
			user.set("password", password);
		
		return user;	
	},
	
	/*
	*	Delete current user and all the user's items from DB
	*	RETURN: Array of validator tags indicating errors, or empty array if none 
	*/
	deleteUser : function() {
		
		//Get current user
		var user = new Parse.User.current();
		
		//Add validation!!!
		
		
		user.destroy({
		  success: function(user) {
			alert("Delete sucessful!");
		  },
		  error: function(user, error) {
			// The delete failed.
			// error is a Parse.Error with an error code and message.
		  }
		});
		
		return user;	
	}
	
};









