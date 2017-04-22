//
//  PrinCraigslistUITests.swift
//  PrinCraigslistUITests
//
//  Created by Kirill Kudaev on 4/20/17.
//  Copyright © 2017 Parse. All rights reserved.
//

import XCTest

class PrinCraigslistUITests: XCTestCase {
        
    override func setUp() {
        super.setUp()
        
        // Put setup code here. This method is called before the invocation of each test method in the class.
        
        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false
        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        XCUIApplication().launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testLogIn() {
        
        let app = XCUIApplication()
        let logInButton = app.buttons["Log In"]
        logInButton.tap()
        logInButton.tap()
        
        XCTAssert(app.textFields["Email"].exists)
        XCTAssert(app.alerts["Error in form"].exists)
        XCTAssert(app.alerts["Error in form"].buttons["OK"].exists)
        XCTAssert(app.buttons["Log In"].exists)
        app.alerts["Error in form"].buttons["OK"].press(forDuration: 0.5);
    }
    
    func testSignUp() {

        let app = XCUIApplication()
        let emailTextField = app.textFields["Email"]
        emailTextField.tap()
        emailTextField.typeText("email@email")
        app.buttons["Sign Up"].tap()
        
        XCTAssert(app.textFields["Email"].exists)
        XCTAssert(app.alerts["Error in form"].exists)
        XCTAssert(app.alerts["Error in form"].buttons["OK"].exists)
        XCTAssert(app.buttons["Log In"].exists)
        
        app.alerts["Error in form"].buttons["OK"].press(forDuration: 0.5);
    }
    
    func testLogInNoUsername() {
        
        
        let app = XCUIApplication()
        let logInButton = app.buttons["Log In"]
        logInButton.tap()
        
        let passwordSecureTextField = app.secureTextFields["Password"]
        passwordSecureTextField.press(forDuration: 0.5);
        passwordSecureTextField.typeText("a")
        logInButton.press(forDuration: 0.5);
        
        XCTAssert(app.textFields["Email"].exists)
        XCTAssert(app.secureTextFields["Password"].exists)
        XCTAssert(app.alerts["Error in form"].exists)
        XCTAssert(app.alerts["Error in form"].buttons["OK"].exists)
        XCTAssert(app.buttons["Log In"].exists)
        
        app.alerts["Error in form"].buttons["OK"].tap()
        
    }
    
    func testLogInNoPassword() {
        
        let app = XCUIApplication()
        let logInButton = app.buttons["Log In"]
        logInButton.tap()
        
        let emailTextField = app.textFields["Email"]
        emailTextField.tap()
        emailTextField.typeText("a")
        logInButton.tap()
        
        XCTAssert(app.textFields["Email"].exists)
        XCTAssert(app.secureTextFields["Password"].exists)
        XCTAssert(app.alerts["Error in form"].exists)
        XCTAssert(app.alerts["Error in form"].buttons["OK"].exists)
        XCTAssert(app.buttons["Log In"].exists)
        
        app.alerts["Error in form"].buttons["OK"].tap()
    }
    
    func testPostItem() {
        
        let app = XCUIApplication()
        let logInButton = app.buttons["Log In"]
        logInButton.tap()
        
        let emailTextField = app.textFields["Email"]
        emailTextField.tap()
        emailTextField.typeText("a")
        logInButton.tap()
        
        XCTAssert(app.textFields["Email"].exists)
        XCTAssert(app.secureTextFields["Password"].exists)
        XCTAssert(app.alerts["Error in form"].exists)
        XCTAssert(app.alerts["Error in form"].buttons["OK"].exists)
        XCTAssert(app.buttons["Log In"].exists)
        
        app.alerts["Error in form"].buttons["OK"].tap()
    }
}
