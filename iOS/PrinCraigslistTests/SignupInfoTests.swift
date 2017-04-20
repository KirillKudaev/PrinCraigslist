//
//  SignupInfoTests.swift
//  PrinCraigslist
//
//  Created by Kirill Kudaev on 4/19/17.
//  Copyright © 2017 Parse. All rights reserved.
//

import XCTest

@testable import PrinCraigslist

class SignupInfoTests: XCTestCase {
    
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
    
    func testSUT_NoFirstName() {
        var signupInfo = SignupInfo(email: email, password: password, firstName: emptyString, lastName: lastName)
        
        XCTAssertEqual(signupInfo.error, true)
        XCTAssertEqual(signupInfo.errorMessage, "Please enter First Name")
    }
    
    func testSUT_NoLastName() {
        var signupInfo = SignupInfo(email: email, password: password, firstName: firstName, lastName: emptyString)
        
        XCTAssertEqual(signupInfo.error, true)
        XCTAssertEqual(signupInfo.errorMessage, "Please enter Last Name")
    }
    
    func testSUT_ShortPassword() {
        var signupInfo = SignupInfo(email: email, password: shortPassword, firstName: firstName, lastName: lastName)
        
        XCTAssertEqual(signupInfo.error, true)
        XCTAssertEqual(signupInfo.errorMessage, "Password has to be at least 8 characters")
    }
    
    func testSUT_LongPassword() {
        var signupInfo = SignupInfo(email: email, password: longString, firstName: firstName, lastName: lastName)
        
        XCTAssertEqual(signupInfo.error, true)
        XCTAssertEqual(signupInfo.errorMessage, "Password has to be less then 35 characters")
    }
    
    func testSUT_LongFirstName() {
        var signupInfo = SignupInfo(email: email, password: password, firstName: longString, lastName: lastName)
        
        XCTAssertEqual(signupInfo.error, true)
        XCTAssertEqual(signupInfo.errorMessage, "First Name has to be less then 35 characters")
    }
    
    func testSUT_LongLastName() {
        var signupInfo = SignupInfo(email: email, password: password, firstName: firstName, lastName: longString)
        
        XCTAssertEqual(signupInfo.error, true)
        XCTAssertEqual(signupInfo.errorMessage, "Last Name has to be less then 35 characters")
    }
}
