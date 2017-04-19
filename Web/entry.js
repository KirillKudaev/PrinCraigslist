
//var webpack = require('webpack');
///var driver = require("./parseDriver");

// jQuery
$.getScript('file:///C:\Users\Gavin\Documents\AAACurrentClasses\SoftwareEngr\PrinCraigslist\Web2\parseDriver.js', function()
{
    function signup() {
	//event.preventDefault();
	
	console.log("it worked");
	
	/*
	var resp = driver.signUpUser($("#createFirstName").val(), $("#createLastName").val(),
	 $("#createEmail").val(), $("#createUserPass").val());
	
	if (resp == 0)
		alert("signup successful!");
	else if (resp == 1) 
		alert("failure!!");
	else if (resp ==2)
		alert("wtf is goin on");
	else
		alert("not good");
	*/
 };
});





/*
module.exports = {
 
  signup: function () {
    //event.preventDefault();
	
	
	var resp = driver.signUpUser($("#createFirstName").val(), $("#createLastName").val(),
	 $("#createEmail").val(), $("#createUserPass").val());
	
	if (resp == 0)
		alert("signup successful!");
	else if (resp == 1) 
		alert("failure!!");
	else if (resp ==2)
		alert("wtf is goin on");
	else
		alert("not good");
	
  }
};




/*
 //build a check for password and require all values
    //var username = $("#createUsername").val();
    var password = $("#createUserPass").val();
    var firstName = $("#createFirstName").val();
    var lastName = $("#createLastName").val();
    var email = $("#createEmail").val();
	
	//Not used, but required param for Parse
	var userName = firstName + lastName;
	
	console.log("email: " + email);
	console.log("first: " + firstName);
	console.log("last: " + lastName);
	console.log("pass: " + password);

    //create new user
    var user = new Parse.User();

    //set values for user
    user.set("username", userName);
    user.set("password", password);
    user.set("firstName", firstName);
    user.set("lastName", lastName);
    user.set("email", email);

    //create the account
    user.signUp(null, {
      success: function(user) {
        alert("signup successful!");
      },
      error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
*/

function login() {
  event.preventDefault();
  
  

  //var loginUser = $("#loginUsername").val();
  var login = $("#loginEmail").val();
  var loginPass = $("#loginPassword").val();

  Parse.User.logIn(loginUser, loginPass, {
    success: function(user) {
      console.log(Parse.Session.current());
      // To work on: send user to their feed page
      alert("login successful!");
    },
    error: function(user, error) {
      // The login failed. Check error to see why.
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
