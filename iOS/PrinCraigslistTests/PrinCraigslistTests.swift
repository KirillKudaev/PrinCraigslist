////
////  PrinCraigslistTests.swift
////  PrinCraigslistTests
////
////  Created by Kirill Kudaev on 4/12/17.
////  Copyright © 2017 Parse. All rights reserved.
////
//
//import UIKit
//import XCTest
//
//@testable import PrinCraigslist
//
//class PrinCraigslistTests: XCTestCase {
//    var systemUnderTest: ViewController!
//
//    override func setUp() {
//        super.setUp()
//        
//        //get the storyboard the ViewController under test is inside
//        let storyboard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
//        
//        //get the ViewController we want to test from the storyboard (note the identifier is the id explicitly set in the identity inspector)
//        systemUnderTest = storyboard.instantiateViewController(withIdentifier: "MyViewController") as! ViewController
//        
//        //load view hierarchy
//        _ = systemUnderTest.view    }
//    
//    override func tearDown() {
//        // Put teardown code here. This method is called after the invocation of each test method in the class.
//        super.tearDown()
//    }
//    
//    func testExample() {
//        // This is an example of a functional test case.
//        // Use XCTAssert and related functions to verify your tests produce the correct results.
//    }
//    
//    func testPerformanceExample() {
//        // This is an example of a performance test case.
//        self.measure {
//            // Put the code you want to measure the time of here.
//        }
//    }
//    
//    func testSUT_TableViewIsNotNilAfterViewDidLoad() {
//        
//        XCTAssertNotNil(systemUnderTest.tableView)
//    }
//    
//    func testSUT_ShouldSetTableViewDataSource() {
//        
//        XCTAssertNotNil(systemUnderTest.tableView.dataSource)
//    }
//    
//    func testSUT_ShouldSetTableViewDelegate() {
//        
//        XCTAssertNotNil(systemUnderTest.tableView.dataSource)
//    }
//    
//    func testSUT_ConformsToTableViewDataSourceProtocol() {
//        
//        XCTAssert(systemUnderTest.conformsToProtocol(UITableViewDataSource))
//        
//        XCTAssert(systemUnderTest.respondsToSelector(#selector(systemUnderTest.numberOfSectionsInTableView(_:))))
//        
//        XCTAssert(systemUnderTest.respondsToSelector(#selector(systemUnderTest.tableView(_:numberOfRowsInSection:))))
//        
//        XCTAssert(systemUnderTest.respondsToSelector(#selector(systemUnderTest.tableView(_:cellForRowAtIndexPath:))))
//    }
//    
//    func testSUT_TableViewUsesCustomCell_SearchItemTableViewCell() {
//        
//        let firstCell = systemUnderTest.tableView(systemUnderTest.tableView, cellForRowAtIndexPath: NSIndexPath(forRow: 0, inSection: 0))
//        
//        XCTAssert(firstCell is SearchItemTableViewCell) // change the name of the cell
//    }
//    
//    func testSUT_ConformsToTableViewDelegateProtocol() {
//        
//        XCTAssert(systemUnderTest.conformsToProtocol(UITableViewDelegate))
//        
//        XCTAssert(systemUnderTest.respondsToSelector(#selector(systemUnderTest.tableView(_:didSelectRowAtIndexPath:))))
//    }
//    
//}
