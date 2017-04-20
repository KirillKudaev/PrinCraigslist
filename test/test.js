var expect = require("chai").expect;
var Validator = require("../Web/Validator.js");

describe("Validator Tests", function() {
	var vld = new Validator();

	describe("User Field Validation", function() {
		var firstName = "Testy";
		var lastName = "McTesterson";
		var email = "TT@gmail.com";
		var password = "12345678";
		var errors;
		
		describe("validateCreateUser", function() {
			
			
			
			it("Good data", function (done) {
				
				errors = vld.validateCreateUser(firstName, lastName, email,
				 password);	
				
				expect(errors.length).to.equal(0);
				
				done();
			 
			});
		
			it("Long firstName", function (done) {
				var badFirstName = "123456789012345678901234567890123456"; //36 chars
				
				var errors = vld.validateCreateUser(badFirstName, lastName, email,
				 password);	
				
				expect(errors.length).to.equal(1);

				expect(errors[0].tag).to.equal(vld.tags.badValue);
				expect(errors[0].desc).to.equal(vld.desc.firstNameMax);
				
				
				done();
			 
			});
			
			it("Long lastName", function (done) {
				var badLastName = "123456789012345678901234567890123456"; //36 chars
				
				errors = vld.validateCreateUser(firstName, badLastName, email,
				 password);	
				
				expect(errors.length).to.equal(1);

				expect(errors[0].tag).to.equal(vld.tags.badValue);
				expect(errors[0].desc).to.equal(vld.desc.lastNameMax);
				
				
				done();
			 
			});
			
			it("Long email", function (done) {
				var badEmail = "1234567890123456789012345678901234512345678901234567890123456789012345@"; //71 chars
				
				errors = vld.validateCreateUser(firstName, lastName, badEmail,
				 password);	
				
				expect(errors.length).to.equal(1);

				expect(errors[0].tag).to.equal(vld.tags.badValue);
				expect(errors[0].desc).to.equal(vld.desc.emailMax);
				
				
				done();
			 
			});
			
			it("Long/Short password", function (done) {
				var badLongPassword = "123456789012345678901234567890123456"; //36 chars
				var badShortPassword = "1234567" // 7 chars
				
				//Bad Long Password
				errors = vld.validateCreateUser(firstName, lastName, email,
				 badLongPassword);	
				
				expect(errors.length).to.equal(1);

				expect(errors[0].tag).to.equal(vld.tags.badValue);
				expect(errors[0].desc).to.equal(vld.desc.passwordMax);
				
				
				//Bad Short Password
				errors = vld.validateCreateUser(firstName, lastName, email,
				 badShortPassword);	
				
				expect(errors.length).to.equal(1);

				expect(errors[0].tag).to.equal(vld.tags.badValue);
				expect(errors[0].desc).to.equal(vld.desc.passwordMin);
				
				
				done();
			 
			});
			
			it("Multiple errors", function (done) {
				var badLongPassword = "123456789012345678901234567890123456"; //36 chars
				var badEmail = "1234567890123456789012345678901234512345678901234567890123456789012345@"; //71 chars
				var badLastName = "123456789012345678901234567890123456"; //36 chars
				var badFirstName = "123456789012345678901234567890123456"; //36 chars
				
				//All the expected errors
				var expectedErrorDescs = 
				 [vld.desc.firstNameMax, vld.desc.lastNameMax, vld.desc.emailMax, vld.desc.passwordMax];
				 
				 
				errors = vld.validateCreateUser(badFirstName, badLastName, badEmail,
				 badLongPassword);	
				
				expect(errors.length).to.equal(4);
				
				
				//For each error, go through expectedErrorDescs array and match error description to its corresponding element 
				// when the element is matched, remove it from the array. After looping through all error elements, no elements
				// should be left in expectedErrorDescs
				errors.forEach(function (err){
					expect(errors[0].tag).to.equal(vld.tags.badValue);
					
					expectedErrorDescs.forEach(function(dsc, index, arr){
						if (err.desc === dsc) 
							arr.splice(index, 1);	
					});
				});
				
				expect(expectedErrorDescs.length).to.equal(0);

				done();
			 
			});
			
			
			///Tests for non-existant required fields
		});
		
		describe("validateUpdateUser", function() {
			var updatedFirstName = "Testy2";
			var updatedLastName = "McTesterson2";
			var updatedEmail = "TT2@gmail.com";
			var updatedPassword = "87654321";
			
		
			//Tests for oldPass confirmation? Cant actually implement but just write it?
			//Tests for non-existant required fields
			
			it("Good Data - firstName update", function (done) {
				
				errors = vld.validateUpdateUser(updatedFirstName);
				
				expect(errors.length).to.equal(0);
				
				done();
			 
			});
			
			it("Good Data - update multiple values", function (done) {
				
				errors = vld.validateUpdateUser(updatedFirstName, updatedLastName, updatedEmail);
				
				expect(errors.length).to.equal(0);
				
				done();
			 
			});
			
			it("Bad Data - firstName update", function (done) {
				var badFirstName = "123456789012345678901234567890123456"; //36 chars
				
				errors = vld.validateUpdateUser(badFirstName);
				
				expect(errors.length).to.equal(1);
				
				done();
			 
			});
			
			it("Bad Data - update multiple values", function (done) {
				var badLongPassword = "123456789012345678901234567890123456"; //36 chars
				var badEmail = "1234567890123456789012345678901234512345678901234567890123456789012345@"; //71 chars
				var badLastName = "123456789012345678901234567890123456"; //36 chars
				var badFirstName = "123456789012345678901234567890123456"; //36 chars
				
				//All the expected errors
				var expectedErrorDescs = 
				 [vld.desc.firstNameMax, vld.desc.lastNameMax, vld.desc.emailMax, vld.desc.passwordMax];
				 
				
				
				errors = vld.validateUpdateUser(badFirstName, badLastName, badEmail, badLongPassword);
				
				expect(errors.length).to.equal(4);
				
				
				//For each error, go through expectedErrorDescs array and match error description to its corresponding element 
				// when the element is matched, remove it from the array. After looping through all error elements, no elements
				// should be left in expectedErrorDescs
				errors.forEach(function (err){
					expect(errors[0].tag).to.equal(vld.tags.badValue);
					
					expectedErrorDescs.forEach(function(dsc, index, arr){
						if (err.desc === dsc) 
							arr.splice(index, 1);	
					});
				});
				
				expect(expectedErrorDescs.length).to.equal(0);
				
				done();
			 
			});
		});
	});
	
	describe("Item Field Validation", function() {
		var title = "Comp Sci Book";
		var description = "This is a book for a csci class";
		var picture;
		var category = "Book";
		var price = 50;
		var errors = [];
		
		describe("validateCreateItem", function() {
			//Each user entered value
			
			it("Good Data", function (done) {
				errors = vld.validateCreateItem(title, description, picture, category, price);
				
				expect(errors.length).to.equal(0);
				
				done();
			 
			});
			
			it("Long Title", function (done) {
				var longTitle = "123456789012345678901234567890123456789012345678901234567890123456789012345678901" //81 chars
				
				errors = vld.validateCreateItem(longTitle, description, picture, category, price);
				
				expect(errors.length).to.equal(1);
				expect(errors[0].tag).to.equal(vld.tags.badValue);
				expect(errors[0].desc).to.equal(vld.desc.titleMax);
				
				done();
			 
			});
			
			it("Long Description", function (done) {
				var longDesc = "";
				
				for(var i = 0; i < 100; i++) {
					longDesc = longDesc.concat("1234567890");
				}
				longDesc = longDesc.concat("1"); // 1001 chars
				
				errors = vld.validateCreateItem(title, longDesc, picture, category, price);
				
				expect(errors.length).to.equal(1);
				expect(errors[0].tag).to.equal(vld.tags.badValue);
				expect(errors[0].desc).to.equal(vld.desc.descriptionMax);
				
				done();
			 
			});
			
			it("Invalid Category", function (done) {
				var badCat = "Bodies";
				
				errors = vld.validateCreateItem(title, description, picture, badCat, price);
				
				expect(errors.length).to.equal(1);
				expect(errors[0].tag).to.equal(vld.tags.badCategory);
				expect(errors[0].desc).to.equal(vld.desc.vldCategory);
				
				done();
			 
			});
			
			it("Bad Picture Format", function (done) {
				expect(2).to.equal(1);
				
				done();
			 
			});
			
			it("Invalid Price", function (done) {
				expect(2).to.equal(1);
				
				done();
			 
			});
			
			
		});
		
		describe("validateUpdateItem", function() {
			it("Bad Value", function (done) {
				var longTitle = "123456789012345678901234567890123456789012345678901234567890123456789012345678901" //81 chars
				
				errors = vld.validateUpdateItem(title);
				
				expect(errors.length).to.equal(1);
				expect(errors[0].tag).to.equal(vld.tags.badValue);
				expect(errors[0].desc).to.equal(vld.desc.titleMax);
				
				done();
			 
			});
			
			it("Multiple Bad Values", function (done) {
				var longTitle = "123456789012345678901234567890123456789012345678901234567890123456789012345678901" //81 chars
				var badCat = "Illegal GMO Seeds";
				
				//All the expected errors
				var expectedErrorDescs = [vld.desc.titleMax, vld.desc.vldCategory];
				var expectedErrorTags = [vld.tags.badCategory, vld.badValue];
				
				errors = vld.validateUpdateItem(longTitle, null, null, badCat);
				
				expect(errors.length).to.equal(2);
				
				//For each error, go through expectedErrorDescs array as well as expectedErrorTags 
				// and match error descriptions and tags to their corresponding elements
				// when the elements are matched, remove them from the array. After looping through 
				// all error elements, no elements should be left in expectedErrorDescs or expectedErrorTags
				errors.forEach(function (err){
					
					expectedErrorTags.forEach(function(tag, index, arr){
						if (err.tag === tag) 
							arr.splice(index, 1);	
					});
					

					expectedErrorDescs.forEach(function(dsc, index, arr){
						if (err.desc === dsc) 
							arr.splice(index, 1);	
					});
				});
				
				expect(expectedErrorDescs.length).to.equal(0);
				expect(expectedErrorTags.length).to.equal(0);
				
				done();
			 
			});
			
			it("Good and Bad Values", function (done) {
				var updatedTitle = "New Title";
				var badCat = "Meth";
				
				errors = vld.validateUpdateItem(updatedTitle, null, null, badCat);
				
				expect(errors.length).to.equal(1);
				expect(errors[0].tag).to.equal(vld.tags.badCategory);
				expect(errors[0].desc).to.equal(vld.desc.vldCategory);
				
				done();
			 
			});
			
			it("Good Value", function (done) {
				var updatedDesc = "New Desc";
				
				errors = vld.validateUpdateItem(null, updatedDesc);
				
				expect(errors.length).to.equal(0);
				
				done();
			 
			});
			
			it("Good Values", function (done) {
				var updatedDesc = "New Desc";
				var updatedTitle = "New Title";
				
				errors = vld.validateUpdateItem(updatedTitle, updatedDesc);
				
				expect(errors.length).to.equal(0);
				
				done();
			 
			});
			
		});
	});
  
});
