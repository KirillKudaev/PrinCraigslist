Parse.initialize("c2223ba7dbada94452e35b1659301bc6fc8bba82");
Parse.serverURL = 'http://ec2-35-163-159-109.us-west-2.compute.amazonaws.com:80/parse';

function signup() {
  $("#signup").click(function(event){
    event.preventDefault();

    //build a check for password and require all values
    var username = $("#createUsername").val();
    var password = $("#createUserPass").val();
    var firstname = $("#createFirstname").val();
    var lastname = $("#createLastname").val();
    //var email = $("#createEmail").val();

    //create new user
    var user = new Parse.User();

    //set values for user
    user.set("username", username);
    user.set("password", password);
    user.set("firstName", firstname);
    user.set("lastName", lastname);
    //user.set("email", email);

    //create the account
    user.signUp(null, {
      success: function(user) {
        alert("signup successful!");
      },
      error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  });
}

function login(){
  $("#loginbtn").click(function(event){
    event.preventDefault();

    var loginUser = $("#loginUsername").val();
    var loginPass = $("#loginPassword").val();

    Parse.User.logIn(loginUser, loginPass, {
      success: function(user) {
        console.log(Parse.Session.current());
        //Work on: send user to their feed page
        alert("login successful!");
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  });
}
