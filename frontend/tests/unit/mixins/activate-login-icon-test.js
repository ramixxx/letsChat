import EmberObject from '@ember/object';
import ActivateLoginIconMixin from 'frontend/mixins/activate-login-icon';
import { module, test } from 'qunit';

module('Unit | Mixin | activateLoginIcon', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ActivateLoginIconObject = EmberObject.extend(ActivateLoginIconMixin);
    let subject = ActivateLoginIconObject.create();
    assert.ok(subject);
  });
});
