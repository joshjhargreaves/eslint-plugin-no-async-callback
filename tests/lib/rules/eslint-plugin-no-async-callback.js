/**
 * @fileoverview All async tests must be implemented with async functions not callbacks
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

const ASYNC_FUNC_ERROR = `Async tests must use async functions and async-await instead of 'done' arguments.`

var ruleTester = new RuleTester();
ruleTester.run("eslint-plugin-no-async-callback", rule, {

    valid: [
        `describe("describe1", function() {
            it("it1", function() {});
         });`,
         `describe("describe2", function() {
            it("it1", function() {});
            it("it2", function() {});
         });`,
         `it("it2", function() {});`,
    ],

    invalid: [
        {
            code: [
                'describe("describe1", function() {',
                    'it("it1", function(done) {});',
                '});'
            ].join('\n'),
            errors: [
              {
                message: ASYNC_FUNC_ERROR,
                column: 11,
                line: 2,
              },
            ],
        },
        {
            code: [
                'it("it1", function(done) {});',
                'it("it1", function(x) {});'
            ].join('\n'),
            errors: [
              {
                message: ASYNC_FUNC_ERROR,
                column: 11,
                line: 1,
              },
              {
                message: ASYNC_FUNC_ERROR,
                column: 11,
                line: 2,
              },
            ],
        }
    ]
});
