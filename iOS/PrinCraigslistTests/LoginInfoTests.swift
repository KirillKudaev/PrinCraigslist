//
//  LoginInfoTests.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/19/17.
//  Copyright © 2017 Parse. All rights reserved.
//

import XCTest

@testable import PrinCraigslist

class LoginInfoTests: XCTestCase {
    
    var emptyString = ""
    var email = "email@email"
    var password = "password"
    var firstName = "firstName"
    var lastName = "lastName"
    var shortPassword = "short"
    var longString = "longlonglonglonglonglonglonglonglonglonglonglong"
    
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testSUT_NoEmail() {
        var signupInfo = SignupInfo(email: emptyString, password: password, firstName: firstName, lastName: lastName)
        
        XCTAssertEqual(signupInfo.error, true)
        XCTAssertEqual(signupInfo.errorMessage, "Please enter an email")
    }
    
    func testSUT_NoPassword() {
        var signupInfo = SignupInfo(email: email, password: emptyString, firstName: firstName, lastName: lastName)
        
        XCTAssertEqual(signupInfo.error, true)
        XCTAssertEqual(signupInfo.errorMessage, "Please enter a password")
    }
}
