//
//  PostItemInfo.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/19/17.
//  Copyright © 2017 Parse. All rights reserved.
//

import Foundation

struct PostItemInfo {
    
    var itemName: String
    var price: Float
    var description: String
    
    var error = false
    var errorMessage: String?
    
    init(itemName: String, price: Float, description: String) {
        
        self.itemName = itemName
        self.price = price
        self.description = description
        
        if itemName == ""  {
            
            error = true
            errorMessage = "Please enter an item name"
            
        } else if price <= 0 {
            
            error = true
            errorMessage = "Please enter a price above 0"
            
        } else if description == "" {
            
            error = true
            errorMessage = "Please enter a description"
            
        } else if itemName.characters.count > 50 {
            
            error = true
            errorMessage = "Title cannot exceed 50 characters"
            
        }
    }
}
