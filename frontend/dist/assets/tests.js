'use strict';

define("frontend/tests/helpers/ember-simple-auth", ["exports", "ember-simple-auth/authenticators/test"], function (_exports, _test) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.authenticateSession = authenticateSession;
  _exports.currentSession = currentSession;
  _exports.invalidateSession = invalidateSession;
  const TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    const authenticator = container.lookup(TEST_CONTAINER_KEY);

    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _test.default);
    }
  }

  function authenticateSession(app, sessionData) {
    const {
      __container__: container
    } = app;
    const session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return app.testHelpers.wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    const session = app.__container__.lookup('service:session');

    if (session.get('isAuthenticated')) {
      session.invalidate();
    }

    return app.testHelpers.wait();
  }
});
define("frontend/tests/integration/components/channel-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | channel', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "2NBgaOoU",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"channel\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "WXHiVShd",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"channel\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("frontend/tests/integration/components/contact-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | contact', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "cQEnuW7L",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"contact\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "6BxrQMkD",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"contact\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("frontend/tests/integration/components/main-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | main', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "2xkYM7Km",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"main\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "mFyPChGG",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"main\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("frontend/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });
  QUnit.test('adapters/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/contact.js should pass ESLint\n\n');
  });
  QUnit.test('adapters/get-adapter.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'adapters/get-adapter.js should pass ESLint\n\n4:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('authenticators/custom.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'authenticators/custom.js should pass ESLint\n\n6:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n7:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n8:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n11:11 - \'data\' is defined but never used. (no-unused-vars)\n43:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n47:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n55:18 - Use import { resolve } from \'rsvp\'; instead of using Ember.RSVP.resolve (ember/new-module-imports)\n55:18 - \'Ember\' is not defined. (no-undef)\n55:37 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n55:37 - \'Ember\' is not defined. (no-undef)\n58:21 - \'data\' is defined but never used. (no-unused-vars)\n62:12 - \'Ember\' is not defined. (no-undef)\n62:12 - Use import { resolve } from \'rsvp\'; instead of using Ember.RSVP.resolve (ember/new-module-imports)\n62:31 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n62:31 - \'Ember\' is not defined. (no-undef)');
  });
  QUnit.test('components/channel.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/channel.js should pass ESLint\n\n');
  });
  QUnit.test('components/chat.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/chat.js should pass ESLint\n\n5:9 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n5:19 - \'observer\' is assigned a value but never used. (no-unused-vars)\n5:19 - Use import { observer } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:7 - \'test\' is assigned a value but never used. (no-unused-vars)\n14:3 - Unexpected console statement. (no-console)\n18:34 - \'recipient_id\' is defined but never used. (no-unused-vars)\n22:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n23:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n24:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n25:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n27:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n28:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n35:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n36:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n37:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n38:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n39:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
  QUnit.test('components/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/contact.js should pass ESLint\n\n4:10 - \'set\' is defined but never used. (no-unused-vars)\n6:9 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:9 - \'computed\' is assigned a value but never used. (no-unused-vars)\n6:19 - Use import { observer } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:19 - \'observer\' is assigned a value but never used. (no-unused-vars)\n16:7 - \'model\' is assigned a value but never used. (no-unused-vars)');
  });
  QUnit.test('components/main.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/main.js should pass ESLint\n\n3:9 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n3:19 - Use import { observer } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n3:19 - \'observer\' is assigned a value but never used. (no-unused-vars)\n3:32 - \'Ember\' is not defined. (no-undef)\n4:9 - \'alias\' is assigned a value but never used. (no-unused-vars)');
  });
  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/application.js should pass ESLint\n\n4:16 - Use import Controller from \'@ember/controller\'; instead of using Ember.Controller (ember/new-module-imports)');
  });
  QUnit.test('controllers/channel.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/channel.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/contact.js should pass ESLint\n\n2:8 - \'Ember\' is defined but never used. (no-unused-vars)\n7:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n8:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
  QUnit.test('controllers/login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass ESLint\n\n2:8 - \'jQuery\' is defined but never used. (no-unused-vars)\n6:9 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:9 - \'computed\' is assigned a value but never used. (no-unused-vars)\n6:19 - \'observer\' is assigned a value but never used. (no-unused-vars)\n6:19 - Use import { observer } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n8:16 - Use import Controller from \'@ember/controller\'; instead of using Ember.Controller (ember/new-module-imports)\n10:2 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n15:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n16:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n18:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n18:27 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n19:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n20:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n24:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n25:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:11 - Unexpected console statement. (no-console)\n27:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n28:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n28:11 - Unexpected console statement. (no-console)\n29:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n33:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n34:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n35:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n36:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n37:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n38:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n39:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n40:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n42:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n43:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n44:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n45:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n46:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n47:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n48:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n49:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n50:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n52:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n53:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n54:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n55:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n56:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
  QUnit.test('controllers/main.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/main.js should pass ESLint\n\n2:8 - \'jQuery\' is defined but never used. (no-unused-vars)\n5:9 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n5:19 - \'observer\' is assigned a value but never used. (no-unused-vars)\n5:19 - Use import { observer } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:9 - \'alias\' is assigned a value but never used. (no-unused-vars)\n8:16 - Use import Controller from \'@ember/controller\'; instead of using Ember.Controller (ember/new-module-imports)\n27:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n28:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n31:21 - Use import { observer } from \'@ember/object\'; instead of using Ember.observer (ember/new-module-imports)\n33:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n33:8 - \'$\' is not defined. (no-undef)\n34:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n35:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n36:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n36:7 - \'$\' is not defined. (no-undef)\n37:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n41:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n42:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n42:6 - \'$\' is not defined. (no-undef)\n43:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n45:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n63:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n64:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
  QUnit.test('controllers/register.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/register.js should pass ESLint\n\n2:17 - \'not\' is defined but never used. (no-unused-vars)\n4:9 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n4:9 - \'computed\' is assigned a value but never used. (no-unused-vars)\n4:19 - \'observer\' is assigned a value but never used. (no-unused-vars)\n4:19 - Use import { observer } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:16 - Use import Controller from \'@ember/controller\'; instead of using Ember.Controller (ember/new-module-imports)\n15:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n19:4 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n20:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n21:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n22:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n23:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n23:18 - \'response\' is defined but never used. (no-unused-vars)\n24:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n25:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n25:14 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)\n26:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:14 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)\n27:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n27:14 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)\n28:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n28:14 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)\n29:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n29:19 - \'response\' is defined but never used. (no-unused-vars)\n30:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n31:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
  QUnit.test('models/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/contact.js should pass ESLint\n\n');
  });
  QUnit.test('models/main.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/main.js should pass ESLint\n\n');
  });
  QUnit.test('models/selected-user-chat.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/selected-user-chat.js should pass ESLint\n\n');
  });
  QUnit.test('models/user-data.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user-data.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'router.js should pass ESLint\n\n18:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n19:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n19:32 - Use snake case in dynamic segments of routes (ember/routes-segments-snake-case)');
  });
  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/application.js should pass ESLint\n\n2:8 - \'Route\' is defined but never used. (no-unused-vars)\n4:8 - \'jQuery\' is defined but never used. (no-unused-vars)\n6:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n11:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
  QUnit.test('routes/channel.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/channel.js should pass ESLint\n\n');
  });
  QUnit.test('routes/chat.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/chat.js should pass ESLint\n\n3:8 - \'Ember\' is defined but never used. (no-unused-vars)\n8:8 - \'params\' is defined but never used. (no-unused-vars)\n9:3 - Unexpected console statement. (no-console)\n13:14 - \'userId\' is defined but never used. (no-unused-vars)');
  });
  QUnit.test('routes/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/contact.js should pass ESLint\n\n3:8 - \'Ember\' is defined but never used. (no-unused-vars)\n9:3 - Unexpected console statement. (no-console)\n10:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n11:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n12:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n13:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n14:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n15:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n16:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n17:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n18:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n22:14 - \'userId\' is defined but never used. (no-unused-vars)');
  });
  QUnit.test('routes/login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/login.js should pass ESLint\n\n2:8 - \'DS\' is defined but never used. (no-unused-vars)\n6:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n7:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n9:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n18:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n35:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n37:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
  QUnit.test('routes/main.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/main.js should pass ESLint\n\n3:8 - \'Ember\' is defined but never used. (no-unused-vars)\n15:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n16:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n32:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n33:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n34:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n35:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n36:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n37:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n38:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n43:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n44:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
  QUnit.test('routes/protected.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/protected.js should pass ESLint\n\n');
  });
  QUnit.test('routes/register.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/register.js should pass ESLint\n\n');
  });
  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });
  QUnit.test('serializers/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/contact.js should pass ESLint\n\n');
  });
  QUnit.test('services/activate-login-icon.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/activate-login-icon.js should pass ESLint\n\n11:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n12:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n14:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n15:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n16:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
  QUnit.test('services/current-user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/current-user.js should pass ESLint\n\n');
  });
  QUnit.test('services/get-service.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/get-service.js should pass ESLint\n\n14:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n15:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n16:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
  QUnit.test('services/websocket.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/websocket.js should pass ESLint\n\n9:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n11:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n12:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n13:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n14:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n16:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n17:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n19:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n20:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n22:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n24:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n25:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n29:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n30:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n30:6 - Unexpected console statement. (no-console)\n34:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n34:6 - Unexpected console statement. (no-console)\n35:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n35:6 - Unexpected console statement. (no-console)\n36:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n40:3 - Unexpected console statement. (no-console)\n41:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n41:6 - Unexpected console statement. (no-console)');
  });
});
define("frontend/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('frontend/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'frontend/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('frontend/templates/channel.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'frontend/templates/channel.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('frontend/templates/chat.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'frontend/templates/chat.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('frontend/templates/components/channel.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'frontend/templates/components/channel.hbs should pass TemplateLint.\n\nfrontend/templates/components/channel.hbs\n  6:1  error  Incorrect indentation for `{{#each}}` beginning at L6:C1. Expected `{{#each}}` to be at an indentation of 2 but was found at 1.  block-indentation\n  7:2  error  Incorrect indentation for `<a>` beginning at L7:C2. Expected `<a>` to be at an indentation of 3 but was found at 2.  block-indentation\n  7:33  error  Incorrect indentation for `\n\t\t\t- ` beginning at L7:C33. Expected `\n\t\t\t- ` to be at an indentation of 4 but was found at 3.  block-indentation\n  4:46  error  img tags must have an alt attribute  img-alt-attributes\n');
  });
  QUnit.test('frontend/templates/components/chat.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'frontend/templates/components/chat.hbs should pass TemplateLint.\n\nfrontend/templates/components/chat.hbs\n  2:1  error  Incorrect indentation for `{{#if}}` beginning at L2:C1. Expected `{{#if}}` to be at an indentation of 2 but was found at 1.  block-indentation\n  11:1  error  Incorrect indentation for `<hr>` beginning at L11:C1. Expected `<hr>` to be at an indentation of 2 but was found at 1.  block-indentation\n  12:1  error  Incorrect indentation for `<div>` beginning at L12:C1. Expected `<div>` to be at an indentation of 2 but was found at 1.  block-indentation\n  3:2  error  Incorrect indentation for `<div>` beginning at L3:C2. Expected `<div>` to be at an indentation of 3 but was found at 2.  block-indentation\n  7:2  error  Incorrect indentation for `<div>` beginning at L7:C2. Expected `<div>` to be at an indentation of 3 but was found at 2.  block-indentation\n  4:3  error  Incorrect indentation for `{{item.message}}` beginning at L4:C3. Expected `{{item.message}}` to be at an indentation of 4 but was found at 3.  block-indentation\n  8:3  error  Incorrect indentation for `{{item.message}}` beginning at L8:C3. Expected `{{item.message}}` to be at an indentation of 4 but was found at 3.  block-indentation\n  13:2  error  Incorrect indentation for `<form>` beginning at L13:C2. Expected `<form>` to be at an indentation of 3 but was found at 2.  block-indentation\n  14:3  error  Incorrect indentation for `<button>` beginning at L14:C3. Expected `<button>` to be at an indentation of 4 but was found at 3.  block-indentation\n  15:3  error  Incorrect indentation for `{{input}}` beginning at L15:C3. Expected `{{input}}` to be at an indentation of 4 but was found at 3.  block-indentation\n');
  });
  QUnit.test('frontend/templates/components/contact.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'frontend/templates/components/contact.hbs should pass TemplateLint.\n\nfrontend/templates/components/contact.hbs\n  6:0  error  Incorrect indentation for `{{#each}}` beginning at L6:C0. Expected `{{#each}}` to be at an indentation of 2 but was found at 0.  block-indentation\n  14:10  error  Incorrect indentation for `each` beginning at L6:C0. Expected `{{/each}}` ending at L14:C10 to be at an indentation of 0 but was found at 1.  block-indentation\n  7:1  error  Incorrect indentation for `<a>` beginning at L7:C1. Expected `<a>` to be at an indentation of 2 but was found at 1.  block-indentation\n  8:2  error  Incorrect indentation for `{{#if}}` beginning at L8:C2. Expected `{{#if}}` to be at an indentation of 3 but was found at 2.  block-indentation\n  9:3  error  Incorrect indentation for `<img>` beginning at L9:C3. Expected `<img>` to be at an indentation of 4 but was found at 3.  block-indentation\n  11:3  error  Incorrect indentation for `<img>` beginning at L11:C3. Expected `<img>` to be at an indentation of 4 but was found at 3.  block-indentation\n  4:47  error  img tags must have an alt attribute  img-alt-attributes\n  9:3  error  img tags must have an alt attribute  img-alt-attributes\n  11:3  error  img tags must have an alt attribute  img-alt-attributes\n');
  });
  QUnit.test('frontend/templates/components/main.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'frontend/templates/components/main.hbs should pass TemplateLint.\n\nfrontend/templates/components/main.hbs\n  2:1  error  Incorrect indentation for `<h1>` beginning at L2:C1. Expected `<h1>` to be at an indentation of 2 but was found at 1.  block-indentation\n  3:3  error  Incorrect indentation for `{{#each}}` beginning at L3:C3. Expected `{{#each}}` to be at an indentation of 2 but was found at 3.  block-indentation\n');
  });
  QUnit.test('frontend/templates/contact.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'frontend/templates/contact.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('frontend/templates/login.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'frontend/templates/login.hbs should pass TemplateLint.\n\nfrontend/templates/login.hbs\n  2:0  error  Incorrect indentation for `<img>` beginning at L2:C0. Expected `<img>` to be at an indentation of 2 but was found at 0.  block-indentation\n  3:0  error  Incorrect indentation for `<form>` beginning at L3:C0. Expected `<form>` to be at an indentation of 2 but was found at 0.  block-indentation\n  11:0  error  Incorrect indentation for `<br>` beginning at L11:C0. Expected `<br>` to be at an indentation of 2 but was found at 0.  block-indentation\n  12:0  error  Incorrect indentation for `{{#if}}` beginning at L12:C0. Expected `{{#if}}` to be at an indentation of 2 but was found at 0.  block-indentation\n  18:0  error  Incorrect indentation for `{{#if}}` beginning at L18:C0. Expected `{{#if}}` to be at an indentation of 2 but was found at 0.  block-indentation\n  4:3  error  Incorrect indentation for `{{input}}` beginning at L4:C3. Expected `{{input}}` to be at an indentation of 2 but was found at 3.  block-indentation\n  5:3  error  Incorrect indentation for `{{input}}` beginning at L5:C3. Expected `{{input}}` to be at an indentation of 2 but was found at 3.  block-indentation\n  6:1  error  Incorrect indentation for `<button>` beginning at L6:C1. Expected `<button>` to be at an indentation of 2 but was found at 1.  block-indentation\n  7:1  error  Incorrect indentation for `{{#link-to}}` beginning at L7:C1. Expected `{{#link-to}}` to be at an indentation of 2 but was found at 1.  block-indentation\n  13:0  error  Incorrect indentation for `<div>` beginning at L13:C0. Expected `<div>` to be at an indentation of 2 but was found at 0.  block-indentation\n  14:4  error  Incorrect indentation for `<span>` beginning at L14:C4. Expected `<span>` to be at an indentation of 2 but was found at 4.  block-indentation\n  19:0  error  Incorrect indentation for `<h1>` beginning at L19:C0. Expected `<h1>` to be at an indentation of 2 but was found at 0.  block-indentation\n  2:0  error  img tags must have an alt attribute  img-alt-attributes\n  2:30  error  you must use double quotes in templates  quotes\n  3:12  error  you must use double quotes in templates  quotes\n  3:43  error  you must use double quotes in templates  quotes\n  3:61  error  you must use double quotes in templates  quotes\n  4:17  error  you must use double quotes in templates  quotes\n  4:52  error  you must use double quotes in templates  quotes\n  4:72  error  you must use double quotes in templates  quotes\n  4:85  error  you must use double quotes in templates  quotes\n  5:17  error  you must use double quotes in templates  quotes\n  5:55  error  you must use double quotes in templates  quotes\n  5:78  error  you must use double quotes in templates  quotes\n  5:94  error  you must use double quotes in templates  quotes\n');
  });
  QUnit.test('frontend/templates/main.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'frontend/templates/main.hbs should pass TemplateLint.\n\nfrontend/templates/main.hbs\n  2:1  error  Incorrect indentation for `<div>` beginning at L2:C1. Expected `<div>` to be at an indentation of 2 but was found at 1.  block-indentation\n  17:1  error  Incorrect indentation for `<div>` beginning at L17:C1. Expected `<div>` to be at an indentation of 2 but was found at 1.  block-indentation\n  30:1  error  Incorrect indentation for `<div>` beginning at L30:C1. Expected `<div>` to be at an indentation of 2 but was found at 1.  block-indentation\n  3:2  error  Incorrect indentation for `<img>` beginning at L3:C2. Expected `<img>` to be at an indentation of 3 but was found at 2.  block-indentation\n  4:2  error  Incorrect indentation for `<div>` beginning at L4:C2. Expected `<div>` to be at an indentation of 3 but was found at 2.  block-indentation\n  7:4  error  Incorrect indentation for `<a>` beginning at L7:C4. Expected `<a>` to be at an indentation of 6 but was found at 4.  block-indentation\n  8:4  error  Incorrect indentation for `<a>` beginning at L8:C4. Expected `<a>` to be at an indentation of 6 but was found at 4.  block-indentation\n  9:4  error  Incorrect indentation for `{{#if}}` beginning at L9:C4. Expected `{{#if}}` to be at an indentation of 6 but was found at 4.  block-indentation\n  11:12  error  Incorrect indentation for `if` beginning at L9:C4. Expected `{{/if}}` ending at L11:C12 to be at an indentation of 4 but was found at 5.  block-indentation\n  10:5  error  Incorrect indentation for `<a>` beginning at L10:C5. Expected `<a>` to be at an indentation of 6 but was found at 5.  block-indentation\n  18:2  error  Incorrect indentation for `{{#if}}` beginning at L18:C2. Expected `{{#if}}` to be at an indentation of 3 but was found at 2.  block-indentation\n  27:2  error  Incorrect indentation for `<Contact>` beginning at L27:C2. Expected `<Contact>` to be at an indentation of 3 but was found at 2.  block-indentation\n  28:2  error  Incorrect indentation for `<Channel>` beginning at L28:C2. Expected `<Channel>` to be at an indentation of 3 but was found at 2.  block-indentation\n  19:3  error  Incorrect indentation for `<div>` beginning at L19:C3. Expected `<div>` to be at an indentation of 4 but was found at 3.  block-indentation\n  23:3  error  Incorrect indentation for `<div>` beginning at L23:C3. Expected `<div>` to be at an indentation of 4 but was found at 3.  block-indentation\n  20:6  error  Incorrect indentation for `<img>` beginning at L20:C6. Expected `<img>` to be at an indentation of 5 but was found at 6.  block-indentation\n  24:6  error  Incorrect indentation for `<img>` beginning at L24:C6. Expected `<img>` to be at an indentation of 5 but was found at 6.  block-indentation\n  31:2  error  Incorrect indentation for `<div>` beginning at L31:C2. Expected `<div>` to be at an indentation of 3 but was found at 2.  block-indentation\n  32:3  error  Incorrect indentation for `<Chat>` beginning at L32:C3. Expected `<Chat>` to be at an indentation of 4 but was found at 3.  block-indentation\n  3:2  error  img tags must have an alt attribute  img-alt-attributes\n  20:6  error  img tags must have an alt attribute  img-alt-attributes\n  24:6  error  img tags must have an alt attribute  img-alt-attributes\n  4:24  error  elements cannot have inline styles  no-inline-styles\n  20:89  error  Interaction added to non-interactive element  no-invalid-interactive\n  24:86  error  Interaction added to non-interactive element  no-invalid-interactive\n  2:12  error  you must use double quotes in templates  quotes\n  10:13  error  you must use double quotes in templates  quotes\n');
  });
  QUnit.test('frontend/templates/register.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'frontend/templates/register.hbs should pass TemplateLint.\n\nfrontend/templates/register.hbs\n  4:1  error  Incorrect indentation for `<img>` beginning at L4:C1. Expected `<img>` to be at an indentation of 2 but was found at 1.  block-indentation\n  5:0  error  Incorrect indentation for `<form>` beginning at L5:C0. Expected `<form>` to be at an indentation of 2 but was found at 0.  block-indentation\n  11:3  error  Incorrect indentation for `<button>` beginning at L11:C3. Expected `<button>` to be at an indentation of 4 but was found at 3.  block-indentation\n  4:1  error  img tags must have an alt attribute  img-alt-attributes\n  9:63  error  Unnecessary string concatenation. Use {{unless isValid \'disabled\'}} instead of "{{unless isValid \'disabled\'}}".  no-unnecessary-concat\n  4:31  error  you must use double quotes in templates  quotes\n  5:12  error  you must use double quotes in templates  quotes\n  5:43  error  you must use double quotes in templates  quotes\n  5:77  error  you must use double quotes in templates  quotes\n  6:16  error  you must use double quotes in templates  quotes\n  6:59  error  you must use double quotes in templates  quotes\n  7:16  error  you must use double quotes in templates  quotes\n  7:60  error  you must use double quotes in templates  quotes\n  8:16  error  you must use double quotes in templates  quotes\n  8:63  error  you must use double quotes in templates  quotes\n  8:79  error  you must use double quotes in templates  quotes\n  9:81  error  you must use double quotes in templates  quotes\n');
  });
});
define("frontend/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('integration/components/channel-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/channel-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/contact-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/contact-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/main-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/main-test.js should pass ESLint\n\n');
  });
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/channel-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/channel-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/contact-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/contact-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/register-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/register-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/mixins/activate-login-icon-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/activate-login-icon-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/models/contacts-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/contacts-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/models/session-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/session-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/models/user-data-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/user-data-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/channel-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/channel-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/contact-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/contact-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/main-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/main-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/register-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/register-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/activate-login-icon-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/activate-login-icon-test.js should pass ESLint\n\n');
  });
});
define("frontend/tests/test-helper", ["frontend/app", "frontend/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("frontend/tests/unit/controllers/channel-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | channel', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:channel');
      assert.ok(controller);
    });
  });
});
define("frontend/tests/unit/controllers/contact-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:contact');
      assert.ok(controller);
    });
  });
});
define("frontend/tests/unit/controllers/register-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | register', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:register');
      assert.ok(controller);
    });
  });
});
define("frontend/tests/unit/mixins/activate-login-icon-test", ["frontend/mixins/activate-login-icon", "qunit"], function (_activateLoginIcon, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Mixin | activateLoginIcon', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let ActivateLoginIconObject = Ember.Object.extend(_activateLoginIcon.default);
      let subject = ActivateLoginIconObject.create();
      assert.ok(subject);
    });
  });
});
define("frontend/tests/unit/models/contacts-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | contacts', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('contacts', {});
      assert.ok(model);
    });
  });
});
define("frontend/tests/unit/models/session-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | session', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('session', {});
      assert.ok(model);
    });
  });
});
define("frontend/tests/unit/models/user-data-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | user data', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('user-data', {});
      assert.ok(model);
    });
  });
});
define("frontend/tests/unit/routes/channel-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | channel', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:channel');
      assert.ok(route);
    });
  });
});
define("frontend/tests/unit/routes/contact-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact');
      assert.ok(route);
    });
  });
});
define("frontend/tests/unit/routes/login-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | login', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:login');
      assert.ok(route);
    });
  });
});
define("frontend/tests/unit/routes/main-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | main', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:main');
      assert.ok(route);
    });
  });
});
define("frontend/tests/unit/routes/register-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | register', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:register');
      assert.ok(route);
    });
  });
});
define("frontend/tests/unit/services/activate-login-icon-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | activate-login-icon', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:activate-login-icon');
      assert.ok(service);
    });
  });
});
define('frontend/config/environment', [], function() {
  var prefix = 'frontend';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('frontend/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
