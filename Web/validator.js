function Validator() {
	//Character length constraints 
	this.titleMax = 80; 
	this.descriptionMax = 1000; 
	this.firstNameMax = 35;
	this.lastNameMax = 35;
	this.emailMax = 70;
	this.passwordMax = 35;
	this.passwordMin = 8;
	
	//category constraints
	this.validCategories = ["Books", "Bikes", "Electronics", "Clothing", "Jobs", "Other"];
	
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
		oldPassFail    : "Password validation failed.",
		vldPrice       : "Price must be a number greater than or equal to 0",
		missingTitle   : "Item must have title",
		missingCategory: "Item must have a category",
		missingPrice   : "Item must have a price, enter 0 if free",
		missingEmail   : "User must have email",
		missingLastName: "User must have last name",
		missingPassword: "User must have a password"
	};
}


Validator.prototype = {
	
	//########################################################
	//PUBLIC METHODS
	//########################################################
	validateCreateUser : function(firstName, lastName, email, password) {
		var errors = [];

		errors = errors.concat(this.validateUserFieldLengths(firstName, lastName, email, password));
		
		errors = errors.concat(this.validateUserRequiredFields(lastName, email, password));
		
		return errors;
	},
	
	validateUpdateUser : function(firstName, lastName, email, password, oldPassword) {
		
		var errors = [];
		
		errors = errors.concat(this.validateUserFieldLengths(firstName, lastName, email, password));
		
		//errors = errors.concat(this.validateUserOldPassword(oldPassword));
		
		return errors;
	},
	
	validateCreateItem : function(title, description, picture, category, price) {
		var errors = [];
		
		errors = errors.concat(this.validateItemFieldLengths(title, description));
		
		//errors = errors.concat(this.validateItemPicture(picture));
		
		errors = errors.concat(this.validateItemCategories(category));
		
		errors = errors.concat(this.validateItemPrice(price));
		
		errors = errors.concat(this.validateItemRequiredFields(title, category, price));
		
		
		return errors;

		
	},
	
	validateUpdateItem : function(title, description, picture, category, price) {
		var errors = [];
		
		errors = errors.concat(this.validateItemFieldLengths(title, description));
		
		//errors = errors.concat(this.validateItemPicture(picture));
		
		errors = errors.concat(this.validateItemCategories(category));
		
		errors = errors.concat(this.validateItemPrice(price));
		
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
	
	validateUserRequiredFields : function(lastName, email, password) {
		
		var errors = [];
		
		if (!lastName || (lastName && lastName.trim().length <= 0)) {
	
			errors.push({
				"tag" : this.tags.missingField, 
				"desc" : this.desc.missingLastName
			});
		
		}
		if (!email || (email && email.trim().length <= 0))
			errors.push({
				"tag" : this.tags.missingField, 
				"desc" : this.desc.missingEmail
			});
			
		if (!password || (password && password.trim().length <= 0))
			errors.push({
				"tag" : this.tags.missingField, 
				"desc" : this.desc.missingPassword
			});
		
		return errors;
	},
	
	/*
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
	*/
	
	validateItemFieldLengths : function (title, description) {
		var errors = [];
		
		if(title && title.trim().length > 0 && title.length > this.titleMax) {
			
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : this.desc.titleMax 
			});
			
		}
		if(description && description.trim().length > 0 && description.length > this.descriptionMax)
			errors.push({
				"tag" : this.tags.badValue, 
				"desc" : this.desc.descriptionMax 
			});
		
		return errors;
	},
	
	validateItemPicture : function (picture) {
		var errors = [];
		
		//currently no implementation
		
		return errors;
	},
	
	
		
	validateItemCategories : function (category) {
		var errors = [];
		var catFound = false;
		
		if (category && category.trim().length > 0) {
			this.validCategories.forEach(function(cat){
				if(cat === category) {
					catFound = true;
				}
					
			});
			
			if (!catFound) 
			errors.push({
				"tag" : this.tags.badCategory, 
				"desc" : this.desc.vldCategory
			});
		}
		
		
			
		return errors;
	},
	
	
		
	validateItemPrice : function(price) {
		var errors = [];
		
		if (price && price.trim().length > 0 ) {
			if (!parseInt(price, 10) || parseInt(price, 10) < 0)
				errors.push({
					"tag" : this.tags.badValue, 
					"desc" : this.desc.vldPrice
				});
		}
			
		
		
		return errors;
	},
	
	validateItemRequiredFields : function(title, category, price) {
		var errors = [];
		
		if (!title || (title && title.trim().length <= 0))
			errors.push({
				"tag" : this.tags.missingField, 
				"desc" : this.desc.missingTitle
			});
				
		if (!category || (category && category.trim().length <= 0))
			errors.push({
				"tag" : this.tags.missingField, 
				"desc" : this.desc.missingCategory
			});
				
		if (!price || (price && price.trim().length <= 0))
			errors.push({
				"tag" : this.tags.missingField, 
				"desc" : this.desc.missingPrice
			});
		
		return errors;
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
};


module.exports = Validator;