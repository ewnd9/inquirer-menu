# inquirer-menu

## Install

```
$ npm install inquirer-menu
```

## Usage

```
var menu = require('inquirer-menu');

var createMenu = function(name) {
  return {
    message: name,
    choices: {
      'test-1': function() {
        return 1;
      },
      'test-2': function() {
        return createMenu('red menu');
      }
    }
  };
};

var blueMenu = createMenu('blue menu');
menu(blueMenu);

```

## License

MIT © [ewnd9](http://ewnd9.com)
