//
//  ItemTests.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/12/17.
//  Copyright © 2017 Parse. All rights reserved.
//

import XCTest

@testable import PrinCraigslist

class ItemTests: XCTestCase {
    
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testExample() {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }
    
    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
    
    class PlaceTest: XCTestCase {
        
        let expectedName = "Name"
        let expectedPrice = 1
        let expectedDescription = "Description"
        
        override func setUp() {
            super.setUp()
            
            systemUnderTest = Item(name: expectedName, price: expectedPrice, description: expectedDescription)
        }
        
        func testSUT_InitializesName() {
            XCTAssertEqual(systemUnderTest.name, expectedName)
        }
        
        func testSUT_InitializesPrice() {
            XCTAssertEqual(systemUnderTest.price, expectedPrice)
        }
        
        func testSUT_InitializesImageURL() {
            XCTAssertEqual(systemUnderTest.imageURL, expectedImageURL)
        }
        
        func testSUT_InitializesDescription() {
            XCTAssertEqual(systemUnderTest.description, expectedDescription)
        }
    }
}
