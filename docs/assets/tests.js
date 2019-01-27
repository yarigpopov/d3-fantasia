'use strict';

define("d3-fantasia/tests/integration/components/stack-chart-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | stack-chart', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "wcs8qkiD",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"stack-chart\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "8Laaj5Yu",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"stack-chart\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("d3-fantasia/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('components/stack-chart.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/stack-chart.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass ESLint\n\n16:9 - Unexpected console statement. (no-console)');
  });
});
define("d3-fantasia/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('d3-fantasia/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'd3-fantasia/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('d3-fantasia/templates/components/stack-chart.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'd3-fantasia/templates/components/stack-chart.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('d3-fantasia/templates/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'd3-fantasia/templates/index.hbs should pass TemplateLint.\n\nd3-fantasia/templates/index.hbs\n  4:4  error  Incorrect indentation for `{{get}}` beginning at L4:C4. Expected `{{get}}` to be at an indentation of 2 but was found at 4.  block-indentation\n  4:15  error  you must use double quotes in templates  quotes\n');
  });
});
define("d3-fantasia/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('integration/components/stack-chart-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/stack-chart-test.js should pass ESLint\n\n');
  });
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });
});
define("d3-fantasia/tests/test-helper", ["d3-fantasia/app", "d3-fantasia/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("d3-fantasia/tests/unit/routes/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define('d3-fantasia/config/environment', [], function() {
  var prefix = 'd3-fantasia';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('d3-fantasia/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
