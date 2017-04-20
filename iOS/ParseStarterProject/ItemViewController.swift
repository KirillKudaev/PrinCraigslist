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
    @IBOutlet weak var lblHealingContent: UILabel!
    @IBOutlet weak var lblTime: UILabel!
    
    var username = ""
    var healingTitle = ""
    var healingContent = ""
    var time = ""

    override func viewDidLoad() {
        super.viewDidLoad()

        lblUserName.text = username
        lblTitle.text = healingTitle
        lblHealingContent.text = healingContent
        lblTime.text = time
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
}
