//
//  LoginViewController.swift
//  Healings
//
//  Created by Kirill Kudaev on 1/8/17.
//  Copyright © 2017 Parse. All rights reserved.
//

import UIKit
import Parse

class LoginViewController: UIViewController, UITextFieldDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        let test = PFObject(className: "Test")
        test["foo"] = "barr"
        test.saveInBackground { (saved:Bool, error:Error?) -> Void in
            if saved {
                self.createOkAlert(title: "Posted", message: "Good job")
            } else {
                print(error)
                self.createOkAlert(title: "Could not post healing", message: "Please try again")
            }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}
