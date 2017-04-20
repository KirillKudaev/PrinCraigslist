
Parse.initialize("c2223ba7dbada94452e35b1659301bc6fc8bba82");
Parse.serverURL = 'http://ec2-35-163-159-109.us-west-2.compute.amazonaws.com:80/parse';


//################################################################################################
//ViewController methods
//################################################################################################
function signupUser() {
	event.preventDefault();

	var driver = new Driver();
	console.log("about to call driver");
	//Need to wait for 
	var errors = driver.signUpUser($("#createFirstName").val(), $("#createLastName").val(),
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
	event.preventDefault();
	
	var driver = new Driver();
	
	driver.deleteUser();
}

function logoutUser() {
	event.preventDefault();
	
	var driver = new Driver();
	
	driver.logoutUser();
}


function loginUser() {
	event.preventDefault();
	
	var driver = new Driver();
	
	driver.loginUser($("#loginEmail").val(), $("#loginPassword").val());
}

function createItem() {
	event.preventDefault();
	
	var driver = new Driver();
	
	var errors = driver.createItem($("#createTitle").val(), $("#createDescription").val(),
	 null, $("#createCategory").val(), $("#createPrice").val());

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


function getItem () {
	event.preventDefault();
	
	var driver = new Driver();
	
	var itemId = "vHOMGyUwwC";
	
	//Need to wait for 
	var item = driver.getItem(itemId);
	
	console.log(item.get("title"));
	
	/*
	console.log("title: " + item.title);
	console.log("desc: " + item.description);
	console.log("cat: " + item.category);
	console.log("price: " + item.price);
	*/
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
		
	},
	
	loginUser : function(email, password) {
		var email = email;
		var pass = password;

		

		Parse.User.logIn(email, pass, {
			success: function(user) {
				
			},
			error: function(user, error) {
			}
		});
		
	},
	
	createItem : function(title, description, picture, category, price) {
		
		console.log("title: " + title);
		console.log("description: " + description);
		console.log("category: " + category);
		console.log("price: " + price);
		
		var vld = new Validator();
		var errors = vld.validateCreateItem(title, description, picture, category, price);
		
		if (errors.length > 0)
			return errors;
		
		var Item = Parse.Object.extend("Item");
		var item = new Item();
		
		
		//var item = Parse.Item();
		var user = Parse.User.current();
		
		//set values for item - postedDate
		item.set("title", title);
		item.set("description", description);
		//item.set("picture", picture);
		item.set("category", category);
		item.set("price", parseInt(price, 10));
		item.set("userId", user.get("objectId"));
		item.set("userEmail", user.get("email"));
		
		
		item.save(null, {
			success: function(item) {
			
				alert('New object created with objectId: ' + item.id);
			},
			error: function(item, error) {
			
				alert('Failed to create new object, with error code: ' + error.message);
			}
		});
		
		
		
		return [];
	}, 
	
	getItem : function (itemId) {
		//var Item = Parse.Object.extend("Item");
		//var query = new Parse.Query(Item);
		//var query = new Parse.Query("User").equalTo("firstName", "Gavin"); 
		var query = new Parse.Query("Item").equalTo("title", "bbb"); 
		
		return query.find().then(function(items) {
			console.log(items[0].get("userEmail"));
			console.log(items[0].get("description"));
			
			return items[0];
			
			/*{
				title : items[0].get("title"),
				description : items[0].get("description"),
				category : items[0].get("category"),
				price : items[0].get("price")
			};*/
		});
		
		
		//query.equalTo("objectId", itemId);
		
		/*
		return query.find().then(function(results) {
			var item = results[0];
			console.log(item);
			
			if (item)
			{
				
				return {
					"title"        : item.get("title"),
					"description"  : item.get("description"),
					"category"     : item.get("category"),
					"price"        : item.get("price")
				
				};
			}
			else
			{
				
				return Parse.Promise.error(error);
				
			}
		}, function(error) {
			return Parse.Promise.error(error);
		});    
		*/
/*
		query.find({
		    success: function(item) {
				
				alert("Error: " + error.code + " " + error.message);
				
				return {
					"title"        : item.get("title"),
					"description"  : item.get("description"),
					"category"     : item.get("category"),
					"price"        : item.get("price")
				
				};
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
		  }
		});
		*/
	},
	
	
	updateItem : function(title, description, picture, category, price) {
		var errors = []
		var vld = new Validator();
		
		errors = vld.validateUpdateItem(title, description, picture, category, price);
		
		if (errors.length > 0)
			return errors;
		
		
		var Item = Parse.Object.extend("Item");
		var item = new Item();
		
		
		//Get current user
		var user = new Parse.User.current();
		
		//Add validation
		if (title.length > 0)
			item.set("title", title);
		if (description.length > 0)
			item.set("description", description);
		//if (picture)
			//item.set("picture", picture);
		if (category.length > 0)
			item.set("category", category);
		if (price.length > 0)
			item.set("price", parseInt(price, 10));
		
		
		return [];	
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






