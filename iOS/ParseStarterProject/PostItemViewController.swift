//
//  PostItemViewController.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/19/17.
//

import UIKit
import Parse

class PostItemViewController: UIViewController, UITextFieldDelegate {

    var activityIndicator = UIActivityIndicatorView()
    
    @IBOutlet weak var itemTitleTextField: UITextField!
    @IBOutlet weak var itemPrice: UITextField!
    @IBOutlet weak var itemDescription: UITextView!
    
    @IBAction func post(_ sender: Any) {
        
        var pfItem = PFObject(className:"Item")
        
        if itemTitleTextField.text == "" {
            
            createOkAlert(title: "Error in form", message: "Please enter a title")
            
        } else if itemDescription.text == "" {
            
            createOkAlert(title: "Error in form", message: "Please provide a description")
            
        } else if itemPrice.text == "" {
            
            createOkAlert(title: "Error in form", message: "Please provide a price")
            
        } else {
            
            showActivityIndicator()
            
            pfItem["title"] = itemTitleTextField.text
            pfItem["description"] = itemDescription.text
            pfItem["price"] = (itemPrice.text! as NSString).floatValue
            pfItem["userId"] = PFUser.current()?.objectId
            pfItem["userEmail"] = PFUser.current()?.email
            
            pfItem.saveInBackground { (succcess, error) in
                
                self.activityIndicator.stopAnimating()
                UIApplication.shared.endIgnoringInteractionEvents()
                
                if error != nil {
                    self.createOkAlert(title: "Could not post item for sale", message: "Please try again")
                } else {
                    self.createOkAlert(title: "Posted!", message: "Your item has been posted!")
                    self.itemTitleTextField.text = "";
                    self.itemDescription.text = "";
                }
            }
        }
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
