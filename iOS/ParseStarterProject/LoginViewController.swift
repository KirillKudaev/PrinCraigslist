//
//  ViewController.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/12/17.
//
import UIKit
import Parse

class LoginViewController: UIViewController, UITextFieldDelegate {
    
    var signupMode = true
    
    var activityIndicator = UIActivityIndicatorView()
    
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var firstNameTextField: UITextField!
    @IBOutlet weak var lastNameTextField: UITextField!
    
    @IBOutlet weak var signupOrLogin: UIButton!
    
    @IBAction func signupOrLogin(_ sender: AnyObject) {
        
        var formError = false
        
        if signupMode {
            
            let signupInfo = SignupInfo(email: emailTextField.text!, password: passwordTextField.text!, firstName: firstNameTextField.text!, lastName: lastNameTextField.text!)
            
            if signupInfo.error {
                formError = true
                createOkAlert(title: "Error in form", message: signupInfo.errorMessage!)
            }
        } else {
            
            let loginInfo = LoginInfo(email: emailTextField.text!, password: passwordTextField.text!)
            
            if loginInfo.error {
                formError = true
                createOkAlert(title: "Error in form", message: loginInfo.errorMessage!)
            }
        }
        
        if !formError {
            
            showActivityIndicator()
            
            if signupMode {
                // Sign Up
                
                let user = PFUser()
                
                user.username = emailTextField.text
                user.email = emailTextField.text
                user.password = passwordTextField.text
                user["firstName"] = firstNameTextField.text
                user["lastName"] = lastNameTextField.text
                
                user.signUpInBackground(block: {(success, error) in
                    
                    self.activityIndicator.stopAnimating()
                    UIApplication.shared.endIgnoringInteractionEvents()
                    
                    if error != nil {
                        
                        let error = error as NSError?
                        
                        var displayErrorMessage = "Please try again later."
                        
                        if let errorMessage = error?.userInfo["error"] as? String {
                            displayErrorMessage = errorMessage
                        }
                        
                        self.createOkAlert(title: "Signup Error", message: displayErrorMessage)
                        
                    } else {
                        print("User signed up")
                        
                        self.performSegue(withIdentifier: "showFeed", sender: self)
                    }
                })
            } else {
                
                // Login mode
                
                PFUser.logInWithUsername(inBackground: emailTextField.text!, password: passwordTextField.text!, block: { (yser, error) in
                    
                    self.activityIndicator.stopAnimating()
                    UIApplication.shared.endIgnoringInteractionEvents()
                    
                    if error != nil {
                        
                        let error = error as NSError?
                        
                        var displayErrorMessage = "Please try again later."
                        
                        if let errorMessage = error?.userInfo["error"] as? String {
                            displayErrorMessage = errorMessage
                        }
                        
                        self.createOkAlert(title: "Login Error", message: displayErrorMessage)
                        
                    } else {
                        print("Logged in")
                        self.performSegue(withIdentifier: "showFeed", sender: self)
                    }
                })
                
            }
        }
    }
    
    @IBOutlet weak var changeSignupModeButton: UIButton!
    
    @IBAction func changeSignupMode(_ sender: AnyObject) {
        if signupMode {
            // Change to login mode.
            
            signupOrLogin.setTitle("Log In", for: [])
            changeSignupModeButton.setTitle("Sign Up", for: [])
            pleaseMessageLabel.text = "Please enter username and password:"
            messageLabel.text = "Don't have an account?"
            firstNameTextField.isHidden = true
            lastNameTextField.isHidden = true
            
            
            signupMode = false
        } else {
            signupOrLogin.setTitle("Sign Up", for: [])
            changeSignupModeButton.setTitle("Log In", for: [])
            pleaseMessageLabel.text = "Please register:"
            messageLabel.text = "Already have an account?"
            firstNameTextField.isHidden = false
            lastNameTextField.isHidden = false
            
            signupMode = true
        }
    }
    
    @IBOutlet weak var pleaseMessageLabel: UILabel!
    @IBOutlet weak var messageLabel: UILabel!
    
    override func viewDidAppear(_ animated: Bool) {
        if PFUser.current() != nil {
            self.performSegue(withIdentifier: "showFeed", sender: self)
        }
        
        self.navigationController?.navigationBar.isHidden = true
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        
        if textField == self.emailTextField {
            // Jump to password field from username field
            self.passwordTextField.becomeFirstResponder()
        } else if textField == self.passwordTextField && signupMode {
            self.firstNameTextField.becomeFirstResponder()
        } else if textField == self.firstNameTextField {
            self.lastNameTextField.becomeFirstResponder()
        } else {
            // Otherwise close keyboard
            textField.resignFirstResponder()
        }
        
        return true
    }
    
    func showActivityIndicator() {
        activityIndicator = UIActivityIndicatorView(frame: CGRect(x: 0, y: 0, width: 50, height: 50))
        activityIndicator.center = self.view.center
        activityIndicator.hidesWhenStopped = true
        activityIndicator.activityIndicatorViewStyle = UIActivityIndicatorViewStyle.gray
        view.addSubview(activityIndicator)
        activityIndicator.startAnimating()
        UIApplication.shared.beginIgnoringInteractionEvents()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.hideKeyboardWhenTappedAround()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}
