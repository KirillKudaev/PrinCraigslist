/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {



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






/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


//var webpack = require('webpack');
var driver = __webpack_require__(0);


function signup() {
	event.preventDefault();
	
	
	
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
	
  };



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


/***/ })
/******/ ]);