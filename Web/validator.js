var Validator = function() {
	//Character length constraints 
	this.titleMax = 80; 
	this.descriptionMax = 1000; 
	this.firstNameMax = 35;
	this.lastNameMax = 35;
	this.emailMax = 70;
	this.passwordMax = 35;
	this.passwordMin = 8;
	
	//field/value constraints
	this.validPicFormats ["jpg"]; //Currently only accepting jpeg
	this.validCategories ["Books", "Bikes", "Electronics", "Clothing", "Jobs", "Other"];
	this.requiredItemFields = ["userId", "title", "categoryId", "price", "postedDate"];
	this.requiredUserFields = ["lastName", "email", "password", "signUpDate", "termsAccepted"];
	this.errors[];
};


// List of errors, and their corresponding resource string tags
//List's original author: Clinton Staley
Validator.Tags = {
   missingField: "missingField",    // Field missing from request. Params[0] is field name
   badValue: "badValue",            // Field has bad value.  Params[0] gives field name
   notFound: "notFound",            // Entity not present in DB
   badLogin: "badLogin",            // Email/password combination invalid
   dupEmail: "dupEmail",            // Email duplicates an existing email
   noTerms: "noTerms",              // Acceptance of terms is required.
   forbiddenField: "forbiddenField", // Field not alowed to be altered
   noOldPwd: "noOldPwd",            // Change of password requires an old password
   oldPwdMismatch: "oldPwdMismatch", // Old Password doesn't match
   badCategory:"badCategory"        // Category is not found in list
};




