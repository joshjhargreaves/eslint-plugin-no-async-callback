/**
 * @fileoverview All sync tests must be implemented with async functions not callbacks
 * @author Joshua Hargreaves
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/eslint-plugin-no-async-callback"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("eslint-plugin-no-async-callback", rule, {

    valid: [
        `describe("describe1", function() {
            it("it1", function() {});
        });`

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: 
              `describe("describe1", function() {
                it("it1", function(done) {});
               });`,
            errors: [
              {
                message: 'Test title is used multiple times in the same test suite.',
                column: 4,
                line: 3,
              },
            ],
          },

    ]
});
