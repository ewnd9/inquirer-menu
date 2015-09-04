var createHistory = require('history/lib/createMemoryHistory');
var inquirer = require('inquirer-question');
var history = createHistory();

var unlisten = history.listen(function (location) {
  if (location.state && location.state.component) {
    var component = location.state.component;

    if (typeof component === 'function') {
      component = component();
    }

    component.type = 'list';
    component.choices[new inquirer.Separator()] = void 0;
    component.choices.back = function() {
      return 'BACK';
    };

    var render = function(component) {
      inquirer.prompt(component).then(function(result) {
        if (result === 'BACK') {
          history.goBack();
        } else {
          var renderIfComponent = function(prop) {
            if (prop && (typeof prop === 'function') || (prop && prop.message && prop.choices)) {
              renderComponent(prop);
            } else {
              renderComponent(location.state.component, true);
            }
          }

          if (result && result.then) {
            result.then(function(result) {
              renderIfComponent(result);
            });
          } else {
            renderIfComponent(result);
          }
        }
      });
    };

    render(component);
  }
});

var renderComponent = function(component, replace) {
  replace ? history.replaceState({ component: component}) : history.pushState({ component: component });
};

module.exports = renderComponent;
