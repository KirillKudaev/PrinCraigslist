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


module.exports = Validator;