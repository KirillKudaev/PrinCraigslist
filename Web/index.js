
Parse.initialize("c2223ba7dbada94452e35b1659301bc6fc8bba82");
Parse.serverURL = 'http://ec2-35-163-159-109.us-west-2.compute.amazonaws.com:80/parse';


//################################################################################################
//ViewController methods
//################################################################################################
function signupUser() {

	var driver = new Driver();
	console.log("about to call driver");
   console.log($("#createFirstName").val());
   console.log($("#createLastName").val());
   console.log($("#createEmail").val());
   console.log($("#createUserPass").val());
	//Need to wait for 
	var errors = driver.signUpUser($("#createFirstName").val().trim(), $("#createLastName").val(),
	 $("#createEmail").val(), $("#createUserPass").val());
		
	console.log("before validation");
	//Validation
	if (errors.length > 0) {
		console.log("there were errors" + errors + "lkasdf");
		errors.forEach(function(err) {
			console.log("error");
			alert("Error - " + err.tag + " : " + err.desc);
		});
	}
	else 
		console.log("no errors");
		
	
}

function getUser() {

	var driver = new Driver();

	//Need to wait for 
	var user = driver.getUser();
	
	
	console.log("email: " + user.email);
	console.log("first: " + user.firstName);
	console.log("last: " + user.lastName);
		
	
	
	
		
}

function updateUser() {

	var driver = new Driver();

	//Need to wait for 
	var errors = driver.updateUser($("#updateFirstName").val(), $("#updateLastName").val(),
	 $("#updateEmail").val(), $("#updateUserPass").val(), $("#updateUserOldPass").val());
	 
	//var user = driver.updateUser("update", "update", "update@u", "updateme", "somethingelse");
	
	if (errors.length > 0) {
		console.log(errors);
		errors.forEach(function(err) {
			console.log("error");
			alert("Error - " + err.tag + " : " + err.desc);
		});
	}
	else 
		console.log("no errors");
			
}

function deleteUser() {
	
	var driver = new Driver();
	
	driver.deleteUser();
}

function logoutUser() {
	
	var driver = new Driver();
	
	driver.logoutUser();
}
//################################################################################################


//************************************************************************************************
//Model 
//************************************************************************************************
function Driver() {
	this.vld = new Validator();
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
		
		var vld = new Validator();
		var errors = vld.validateCreateUser(firstName, lastName, email, password);
		
		if (errors.length > 0)
			return errors;

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
		
		return [];
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
		
		var errors = []
		var vld = new Validator();
		
		errors = vld.validateUpdateUser(firstName, lastName, email, password, oldPassword)
		
		if (errors.length > 0)
			return errors;
		
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
		
		return [];	
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
	},
	
	logoutUser : function() {
		
		Parse.User.logOut();
		
		
		
	}
	
	
	
};


function Validator() {
	//Character length constraints 
	this.titleMax = 80; 
	this.descriptionMax = 1000; 
	this.firstNameMax = 35;
	this.lastNameMax = 35;
	this.emailMax = 70;
	this.passwordMax = 35;
	this.passwordMin = 8;
	
	//field/value constraints
	this.validPicFormats = ["jpg"]; //Currently only accepting jpeg
	this.validCategories = ["Books", "Bikes", "Electronics", "Clothing", "Jobs", "Other"];
	//this.requiredItemFields = ["userId", "title", "categoryId", "price", "postedDate"];
	//this.requiredUserFields = ["lastName", "email", "password"];
	//this.errors;
	
	this.tags = {
		missingField: "Missing Field",         // Field missing from request. 
		badValue: "Bad Value",                 // Field has bad value.  
		notFound: "Not Found",                 // Entity not present in DB
		badLogin: "Bad Login",                 // Email/password combination invalid
		forbiddenField: "forbiddenField",      // Field not alowed to be altered
		noOldPwd: "No Old Password",           // Change of password requires an old password
		oldPwdMismatch: "Old Password Failed", // Old Password doesn't match
		badCategory:"Bad Category"             // Category is not found in list
	};
	
	//
	this.desc = {
		firstNameMax   : "First name must be less than " + this.firstNameMax + " characters.", 
		lastNameMax    : "Last name must be less than " + this.lastNameMax + " characters.",
		emailMax       : "Email must be less than " + this.emailMax + " characters.",
		passwordMax    : "Last name must be less than " + this.lastNameMax + " characters.",
		passwordMin    : "Password must be at least " + this.passwordMin + " characters.",
		titleMax       : "Title must be less than " + this.titleMax + " characters.",
		descriptionMax : "Description must be less than " + this.descriptionMax + " characters.",
		vldCategory    : "Valid categories are: Books, Bikes, Electronics, Clothing, Jobs, or Other",
		vldPicFormat   : "Valid picture format is only .jpg at this time",
		oldPassFail    : "Password validation failed."
	};
}


Validator.prototype = {
	
	//########################################################
	//PUBLIC METHODS
	//########################################################
	validateCreateUser : function(firstName, lastName, email, password) {
		var errors = [];

		errors = errors.concat(this.validateUserFieldLengths(firstName, lastName, email, password));
		
		errors = errors.concat(this.validateUserRequiredFields(lastName, email));
		
		return errors;
	},
	
	validateUpdateUser : function(firstName, lastName, email, password, oldPassword) {
		
		var errors = [];
		
		errors = errors.concat(this.validateUserFieldLengths(firstName, lastName, email, password));
		
		//errors = errors.concat(this.validateUserRequiredFields(lastName, email));
		
		//errors = errors.concat(this.validateUserOldPassword(oldPassword));
		
		return errors;
	},
	
	validateCreateItem : function(title, description, picture, category, price) {
		var errors = [];
		
		errors = errors.concat(this.validateItemFieldLengths(title, description));
		
		errors = errors.concat(this.validateItemPicture(picture));
		
		errors = errors.concat(this.validateItemCategories(picture));
		
		errors = errors.concat(this.validateItemPrice(price));
		
		
		return errors;

		
	},
	
	validateUpdateItem : function(title, description, picture, category, price) {
		var errors = [];
		
		return errors;
	},
	
	
	
	//########################################################
	
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//PRIVATE METHODS
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	validateUserFieldLengths : function (firstName, lastName, email, password) {
		var errors = [];
		
		if (firstName && firstName.length > 0 && firstName.length > this.firstNameMax)
			
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : this.desc.firstNameMax
			});
		
		
		if (lastName && lastName.length > 0 && lastName.length > this.lastNameMax)
			
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : this.desc.lastNameMax
			});
		
		if (email && email.length > 0 && email.length > this.emailMax)
			
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : this.desc.emailMax
			});
		
		if (password && password.length > 0 && password.length > this.passwordMax)
			
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : this.desc.passwordMax 
			});
		
		if (password && password.length > 0 && password.length < this.passwordMin)
			
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : this.desc.passwordMin 
			});
		
		
		
		return errors;
	},
	
	validateUserRequiredFields : function(lastName, email) {
		
		var errors = [];
		
		/*
		if (lastName && lastName.length > 0 && lastName.trim().length < 1 || email.trim().length < 1)
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : "Last name and email must have at least 1 non-whitespace character."
			});
		
		
		if (email && email.length > 0 && email.indexOf('@') > -1)
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : email + " is not a valid email."
			});
			
		*/	
		
		return errors;
	},
	
	validateUserOldPassword : function (oldPassword) {
		var errors = [];
		var user = Parse.User.current();
		var temp = [];
		var query = new Parse.Query(user);
		
		query.equalTo("password", oldPassword);
		temp.push(query);
		
		temp.forEach(function (q) {
			q.find({
			    success: function(results) {
				
			    },
			    error: function(error) {
				   errors.push({
					   "tag" : this.tags.oldPwdFailed, 
					   "desc" : this.desc.oldPassFail
				   });
			  }
			});
		});
		
	},
	
	
	validateItemFieldLengths : function (title, description) {
		var errors = [];
		
		
		return errors;
	},
	
	validateItemPicture : function (picture) {
		var errors = [];
		
		
		return errors;
	},
	
	
		
	validateItemCategories : function (picture) {
		var errors = [];
		
		
		return errors;
	},
	
	
		
	validateItemPrice : function(price) {
		var errors = [];
		
		
		return errors;
	},
	
	validateItemRequiredFields : function(price) {
		var errors = [];
		
		
		return errors;
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
};






