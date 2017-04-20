//
//  Item.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/19/17.
//  Copyright © 2017 Parse. All rights reserved.
//

import Foundation


struct Item {
    var userName: String
    var title: String
    var description: String
    var price: Float
    var createdAt: Date
    var updatedAt: Date
    
    init(userName: String, title: String, description: String, price: Float, createdAt: Date, updatedAt: Date) {
        
        self.userName = userName
        self.title = title
        self.description = description
        self.price = price
        self.createdAt = createdAt as Date
        self.updatedAt = updatedAt as Date
    }
}
