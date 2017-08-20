# eslint-plugin-no-async-callback

All async tests must be implemented as async functions

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-no-async-callback`:

```
$ npm install eslint-plugin-no-async-callback --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-no-async-callback` globally.

## Usage

Add `no-async-callback` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "no-async-callback"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "no-async-callback/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





