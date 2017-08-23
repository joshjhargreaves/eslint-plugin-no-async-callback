/**
 * @fileoverview All async tests must be implemented with async functions not callbacks
 * @author Joshua Hargreaves
 * 
 * Heavily borrowed from: 
 * https://github.com/facebook/jest/blob/master/packages/eslint-plugin-jest/src/rules/no_identical_title.js
 * 
 * @flow
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

import type { EslintContext, CallExpression } from './types';

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

const isTestCase = node =>
  node &&
  node.type === 'CallExpression' &&
  testCaseNames[getNodeName(node.callee)];

const isFirstArgLiteral = node =>
  node.arguments && node.arguments[0] && node.arguments[0].type === 'Literal';

const isSecondArgFunctionExpression = node =>
  node.arguments &&
  node.arguments.length > 1 &&
  (node.arguments[1].type === 'FunctionExpression' || node.arguments[1].type === 'ArrowFunctionExpression');

// TODO: add FunctionExpression type to Node
const doesNodeHaveParams = (node: any) => node.params && node.params.length > 0;

module.exports = {
  meta: {
    docs: {
      description:
        "Async tests must use async functions and async-await instead of 'done' arguments.",
      category: 'Best Practice',
      recommended: false,
    },
    fixable: null,
    schema: [],
  },

  create: function(context: EslintContext) {
    return {
      CallExpression(node: CallExpression) {
        console.log(node.arguments[1]);
        if (
          isTestCase(node) &&
          isFirstArgLiteral(node) &&
          isSecondArgFunctionExpression(node) &&
          doesNodeHaveParams(node.arguments[1])
        ) {
          context.report({
            message: `Async tests must use async functions and async-await instead of 'done' arguments.`,
            node: node.arguments[1],
          });
        }
      },
    };
  },
};
