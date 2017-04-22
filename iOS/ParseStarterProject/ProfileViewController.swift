//
//  ViewController.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/12/17.
//
import UIKit
import Parse

class ProfileViewController: UIViewController {
    
    @IBAction func logout(_ sender: AnyObject) {
        
        PFUser.logOut()  
        performSegue(withIdentifier: "logoutSegue", sender: self)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}
