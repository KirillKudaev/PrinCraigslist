

Parse.initialize("c2223ba7dbada94452e35b1659301bc6fc8bba82");
Parse.serverURL = 'http://ec2-35-163-159-109.us-west-2.compute.amazonaws.com:80/parse';


var Driver = function(){};

//Initialze user in DB
//validate user field criteria
//return: array of validator tags for errors or empty array if no errors 
Driver.prototype.signUpUser = function(firstName, lastName, email, password) {
	
	console.log("email: " + email);
	console.log("first: " + firstName);
	console.log("last: " + lastName);
	console.log("pass: " + password);
	
	
	//create new user
    var user = new Parse.User();

    //set values for user
    user.set("firstName", firstName);
    user.set("lastName", lastName);
    user.set("email", email);
    user.set("password", password);
	user.set("username", firstName + lastName);
	
    //create the account - send in to parse server
    user.signUp(null, {
      success: function(user) {
        return 0; //alert("signup successful!");
      },
      error: function(user, error) {
        return 1; //alert("Error: " + error.code + " " + error.message);
      }
    });
	
	
	return 2; //vld.errors;
};

//Get user info from DB
//return: user "object"
Driver.prototype.getUser = function(user) {
	return userInfo;
};

//update user fields in DB - search db first
//validate user field criteria
//return: array of validator tags for errors or empty array if no errors 
Driver.prototype.updateUser = function(user) {
	return vld.errors;
};

//delete spefied user in DB
//return: array of validator tags for errors or empty array if no errors 
Driver.prototype.deleteUser = function(user) {
	return vld.errors;
};

//Initialze item in DB
//validate item field criteria
//return: array of validator tags for errors or empty array if no errors 
Driver.prototype.addItem = function(item) {
	return vld.errors;
};

//Get item info from DB
//return: item "object"
Driver.prototype.getItem = function(item) {
	return itemInfo;
};

//update item in DB
//validate item field criteria
//return: array of validator tags for errors or empty array if no errors 
Driver.prototype.updateItem = function(item) {
	return vld.errors;
};

//delete item from DB
//return: array of validator tags for errors or empty array if no errors 
Driver.prototype.deleteItem = function(item) {
	return vld.errors;
};




