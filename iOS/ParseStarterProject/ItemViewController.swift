//
//  ItemViewController.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/19/17.
//

import UIKit

class ItemViewController: UIViewController {

    @IBOutlet weak var lblUserName: UILabel!
    @IBOutlet weak var lblTitle: UILabel!
    @IBOutlet weak var lblItemContent: UILabel!
    @IBOutlet weak var lblTime: UILabel!
    
    var username = ""
    var itemTitle = ""
    
    var itemContent = ""
    var time = ""

    override func viewDidLoad() {
        super.viewDidLoad()

        lblUserName.text = username
        lblTitle.text = itemTitle
        lblItemContent.text = itemContent
        lblTime.text = time
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
