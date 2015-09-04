var createHistory = require('history/lib/createMemoryHistory');
var inquirer = require('inquirer-question');
var history = createHistory();

var unlisten = history.listen(function (location) {
  if (location.state && location.state.component) { // skip first empty
    var component = location.state.component;
    var backChoice = location.state.previous ? 'back to ' + location.state.previous : 'exit';

    component.type = 'list';
    component.choices[new inquirer.Separator()] = void 0;
    component.choices[backChoice] = function() {
      return 'BACK';
    };

    var render = function(component) {
      inquirer.prompt(component).then(function(result) {
        if (result === 'BACK') {
          history.goBack();
        } else {
          if (result && result.then) {
            result.then(function(result) {
              if (result.message && result.choices) {
                renderComponent(result, component.message);
              }
            });
          } else if (result && result.message && result.choices) {
            renderComponent(result, component.message);
          } else {
            render(component);
          }
        }
      });
    };

    render(component);
  }
});

var renderComponent = function(component, previous) {
  history.pushState({ component: component, previous: previous });
};

module.exports = renderComponent;
