//
//  SignupInfo.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/19/17.
//  Copyright © 2017 Parse. All rights reserved.
//

import Foundation

struct SignupInfo {
    
    var email: String
    var password: String
    var firstName: String
    var lastName: String
    
    var error = false
    var errorMessage: String?
    
    init(email: String, password: String, firstName: String, lastName: String) {
        
        self.email = email
        self.password = password
        self.firstName = firstName
        self.lastName = lastName
        
        if email == ""  {
            
            error = true
            errorMessage = "Please enter an email"
            
        } else if password == "" {
            
            error = true
            errorMessage = "Please enter a password"
            
        } else if firstName == "" {
            
            error = true
            errorMessage = "Please enter First Name"
            
        } else if lastName == "" {
            
            error = true
            errorMessage = "Please enter Last Name"
            
        } else if password.characters.count < 8 {
            
            error = true
            errorMessage = "Password has to be at least 8 characters"
            
        } else if password.characters.count > 35 {
            
            error = true
            errorMessage = "Password has to be less then 35 characters"
            
        } else if firstName.characters.count > 35 {
            
            error = true
            errorMessage = "First Name has to be less then 35 characters"
            
        } else if lastName.characters.count > 35 {
            
            error = true
            errorMessage = "Last Name has to be less then 35 characters"
            
        }
    }
}
