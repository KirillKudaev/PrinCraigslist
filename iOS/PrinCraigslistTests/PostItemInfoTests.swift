//
//  PostItemInfoTests.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/19/17.
//  Copyright © 2017 Parse. All rights reserved.
//

import XCTest

@testable import PrinCraigslist

class PostItemInfoTests: XCTestCase {
    
    var emptyString = ""
    var itemName = "itemName"
    var price = 1.1
    var descriptions = "description"
    var longString = "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong"
    var zeroPrice = 0
    
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testSUT_NoItemName() {
        let postItemInfo = PostItemInfo(itemName: emptyString, price: Float(price), description: descriptions)
        XCTAssertEqual(postItemInfo.error, true)
        XCTAssertEqual(postItemInfo.errorMessage, "Please enter an item name")
    }
    
    func testSUT_PriceIsZero() {
        let postItemInfo = PostItemInfo(itemName: itemName, price: Float(zeroPrice), description: descriptions)
        XCTAssertEqual(postItemInfo.error, true)
        XCTAssertEqual(postItemInfo.errorMessage, "Please enter a price above 0")
    }
    
    func testSUT_NoDescription() {
        let postItemInfo = PostItemInfo(itemName: itemName, price: Float(price), description: emptyString)
        XCTAssertEqual(postItemInfo.error, true)
        XCTAssertEqual(postItemInfo.errorMessage, "Please enter a description")
    }
    
    func testSUT_TitleLonger50Chars() {
        let postItemInfo = PostItemInfo(itemName: longString, price: Float(price), description: descriptions)
        XCTAssertEqual(postItemInfo.error, true)
        XCTAssertEqual(postItemInfo.errorMessage, "Title cannot exceed 50 characters")
    }
}
