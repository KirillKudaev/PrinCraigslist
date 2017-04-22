//
//  HomeTableViewController.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/19/17.
//

import UIKit
import Parse

class HomeTableViewController: UITableViewController {
    
    var itemArray = Array<Item>()
    var refresher: UIRefreshControl!
    
    func refresh() {
        let query = PFQuery(className:"Item")
        query.order(byDescending: "createdAt")
        query.limit = 100
        query.findObjectsInBackground { (objects, error) -> Void in
            
            if error == nil {
                self.itemArray.removeAll()

                for object in objects! {
                    
                    let item = Item(userName: object["userEmail"] as! String, title: object["title"] as! String, description: object["description"] as! String, price: (object["price"] as! Float), createdAt: object.createdAt!, updatedAt: object.updatedAt!)
                    
                    self.itemArray.append(item)
                }
                
                print("Count: " + String(self.itemArray.count))
                
                // Reload tableview
                self.tableView.reloadData()
            } else {
                print(error)
            }
            
            self.refresher.endRefreshing()
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        refresher = UIRefreshControl()
        refresher.attributedTitle = NSAttributedString(string: "Refreshing...")
        refresher.addTarget(self, action: #selector(HomeTableViewController.refresh), for: UIControlEvents.valueChanged)
        self.tableView.addSubview(refresher)
        
        refresh()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        // Customizing Tab Bar
        let color = UIColor(red: 85/255.0, green: 199/255.0, blue: 147/255.0, alpha: 1.0)
        self.tabBarController?.tabBar.tintColor = color
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Table view data source
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return self.itemArray.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! ItemCell
        
        cell.titleLabel.text = self.itemArray[indexPath.row].title
        cell.descriptionLabel.text = self.itemArray[indexPath.row].description
        
        cell.userNameLabel.text = self.itemArray[indexPath.row].userName
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MMMM dd, yyyy HH:mm:ss"
        let createdAt = dateFormatter.string(from:self.itemArray[indexPath.row].createdAt)
        
        cell.lblTime.text = createdAt
        //cell.userImage.image = UIImage(named: "AnonMask.png")
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        _ = tableView.indexPathForSelectedRow!
        if let _ = tableView.cellForRow(at: indexPath) {
            self.performSegue(withIdentifier: "showItem", sender: self)
        }
    }
    
    // MARK: - Navigation
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showItem" {
            if let destination = segue.destination as? ItemViewController {
                
                let path = tableView.indexPathForSelectedRow
                let cell = tableView.cellForRow(at: path!) as! ItemCell
                
                destination.username = (cell.userNameLabel.text)!
                destination.itemTitle = (cell.titleLabel.text)!
                destination.itemContent = (cell.descriptionLabel.text)!
                destination.time = (cell.lblTime.text)!
            }
        }
    }
}

