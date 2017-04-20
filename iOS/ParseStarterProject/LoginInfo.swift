//
//  LoginInfo.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/19/17.
//  Copyright © 2017 Parse. All rights reserved.
//

import Foundation

struct LoginInfo {
    
    var email: String
    var password: String
    
    var error = false
    var errorMessage: String?
    
    init(email: String, password: String) {
        
        self.email = email
        self.password = password
        
        if email == ""  {
            
            error = true
            errorMessage = "Please enter an email"
            
        } else if password == "" {
            
            error = true
            errorMessage = "Please enter a password"
            
        }
    }
}
