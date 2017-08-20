/**
 * @fileoverview All async tests must be implemented with async functions not callbacks
 * @author Joshua Hargreaves
 * 
 * @flow
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

import type {EslintContext, CallExpression} from './types';

/* $FlowFixMe */
const describeAliases = Object.assign(Object.create(null), {
  describe: true,
  'describe.only': true,
  'describe.skip': true,
  fdescribe: true,
  xdescribe: true,
});

/* $FlowFixMe */
const testCaseNames = Object.assign(Object.create(null), {
  fit: true,
  it: true,
  'it.only': true,
  'it.skip': true,
  test: true,
  'test.only': true,
  'test.skip': true,
  xit: true,
  xtest: true,
});

const getNodeName = node => {
  if (node.type === 'MemberExpression') {
    return node.object.name + '.' + node.property.name;
  }
  return node.name;
};

const isDescribe = node =>
  node &&
  node.type === 'CallExpression' &&
  describeAliases[getNodeName(node.callee)];

const isTestCase = node =>
  node &&
  node.type === 'CallExpression' &&
  testCaseNames[getNodeName(node.callee)];

const newDescribeContext = () => ({
  describeTitles: [],
  testTitles: [],
});

const handleTestCaseTitles = (context, titles, node, title) => {
  if (isTestCase(node)) {
    if (titles.indexOf(title) !== -1) {
      context.report({
        message: 'Test title is used multiple times in the same test suite.',
        node,
      });
    }
    titles.push(title);
  }
};

const handleTestSuiteTitles = (context, titles, node, title) => {
  if (!isDescribe(node)) {
    return;
  }
  if (titles.indexOf(title) !== -1) {
    context.report({
      message: 'Test suite title is used multiple times.',
      node,
    });
  }
  titles.push(title);
};

const isFirstArgLiteral = node =>
  node.arguments && node.arguments[0] && node.arguments[0].type === 'Literal';

module.exports = {
    meta: {
        docs: {
            description: "All sync tests must be implemented with async functions and not callbacks",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            // give me methods

        };
    }
};
