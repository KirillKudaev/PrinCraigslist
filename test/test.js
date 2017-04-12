var Parse = require('parse/node');
var expect    = require("chai").expect;

var User = require('../Web/User/User.js');
//var $ = require('jquery');
Parse.initialize("c2223ba7dbada94452e35b1659301bc6fc8bba82", "69cee5bba1dff897f0db3a8ea29b46c0fda12754");
Parse.serverURL = 'http://ec2-35-163-159-109.us-west-2.compute.amazonaws.com:80/parse';
Parse.databaseURI = "mongodb://root:q2W01rr18YnG@127.0.0.1:27017/bitnami_parse";
/*

you will need to install npm and node.js if you haven't. Some resources: 

https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha

http://jimkubicek.com/blog/2013/01/26/unit-testing-parse-cloud-code/

https://codeforgeek.com/2015/07/unit-testing-nodejs-application-using-mocha/

https://www.slideshare.net/NicholasMcClay/nodejs-and-parse

https://www.npmjs.com/package/parse

https://code.tutsplus.com/tutorials/getting-started-with-parse--net-28000

*/

//var APP_ID = "c2223ba7dbada94452e35b1659301bc6fc8bba82";
//var MASTER_KEY = "69cee5bba1dff897f0db3a8ea29b46c0fda12754";

//var app = new Parse(APP_ID, MASTER_KEY);

describe("Parse Tests", function() {

  describe("User CRUD Tests", function() {
	  
	  describe("GET tests from Parse server", function () {
		  it("test", function (done) {
			  
			
			  
			  
			expect(1+1).to.equal(2);
			
			
			//some jquery set up?
			//User.signup();
			
			//create new user
			var user = new Parse.User();

			//set values for user
			user.set("username", "asdf");
			user.set("password", "asdf");
			user.set("firstName", "asdf");
			user.set("lastName", "asdf");
			user.set("email", "asdf@asdf");

			//create the account
			user.signUp(null, {
			  success: function(user) {
				alert("signup successful!");
			  },
			  error: function(user, error) {
				alert("Error: " + error.code + " " + error.message);
			  }
			});
			
			/*
			console.log("print please");
			
			//Once again, we extend the Parse.Object class to make the ListItem class
			var users = Parse.Object.extend("User");

			//This time, we use Parse.Query to generate a new query, specifically querying the ListItem table.
			var query = new Parse.Query(users);

			//We set constraints on the query.
			query.equalTo('firstName', "Test");
			
			var resultTest;
			
			
			//We submit the query and pass in callback functions.
			query.find({
			  success: function(results) {
				  resultTest = results;
			  describe("asdf", function() {
				  it("query", function (done) {
					  expect(3).to.equal(3);
				  });
			  });
				  
				console.log("hopefully first result: " + results[0].get("objectId"));
			  },
			  error: function(error) {
				console.log("fail :(");
			  }
			});
			
			
			console.log("???first result: " + resultTest);
			
			*/
			/*
			
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
			done();
		  });
	  });
  });
});
  
  /*
  
  
  
  it("returns user information for Mr. Testy McTesterson", fuction(done) {
			  request(url, fuction(error, response, body) {
				  expect(body.firstName).to.equal("Testy");
				  done();
			  });
		  });
  
  
  
  
  
  describe("Hex to RGB conversion", function() {
    var url = "http://localhost:3000/hexToRgb?hex=00ff00";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns the color in RGB", function(done) {
      request(url, function(error, response, body) {
        expect(body).to.equal("[0,255,0]");
        done();
      });
    });
  });

});

*/