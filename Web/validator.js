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
		missingField: "missingField",    // Field missing from request. 
		badValue: "Bad Value",            // Field has bad value.  
		notFound: "notFound",            // Entity not present in DB
		badLogin: "badLogin",            // Email/password combination invalid
		dupEmail: "dupEmail",            // Email duplicates an existing email
		noTerms: "noTerms",              // Acceptance of terms is required.
		forbiddenField: "forbiddenField", // Field not alowed to be altered
		noOldPwd: "noOldPwd",            // Change of password requires an old password
		oldPwdMismatch: "Old Password Failed", // Old Password doesn't match
		badCategory:"badCategory"        // Category is not found in list
	};
	
	//
	this.desc = {
		excFirstNameMax : "First name must be less than " + this.firstNameMax + " characters.", 
		excLastNameMax  : "Last name must be less than " + this.lastNameMax + " characters.",
		excEmailMax     : "Email must be less than " + this.emailMax + " characters.",
		excPassMax      : "Last name must be less than " + this.lastNameMax + " characters.",
		excPassMin      : "Password must be at least " + this.passwordMin + " characters."
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
		
		errors = errors.concat(this.validateItemCategories(category));
		
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
				"desc" : this.desc.excFirstNameMax
			});
		
		
		if (lastName && lastName.length > 0 && lastName.length > this.lastNameMax)
			
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : this.desc.excLastNameMax
			});
		
		if (email && email.length > 0 && email.length > this.emailMax)
			
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : this.desc.excEmailMax
			});
		
		if (password && password.length > 0 && password.length > this.passwordMax)
			
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : this.desc.excPassMax 
			});
		
		if (password && password.length > 0 && password.length < this.passwordMin)
			
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : this.desc.excPassMin 
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
					   "desc" : "Password validation failed."
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