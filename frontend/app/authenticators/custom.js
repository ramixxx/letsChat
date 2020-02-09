import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';

export default Base.extend({
  session: service(),
	 tokenEndpoint: 'api/login',
	 host: 'http://localhost:8000',
	 sessionId: '',
    sessionName: '',
	activateLoginIcon: service('activate-login-icon'),
  restore(data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      if (!Ember.isEmpty(data.success.access_token)) {
        console.log(data);
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate(email, password) {
 	const data = JSON.stringify({
      username: email, password: password
    });
  this.activateLoginIcon.on();
 	const requestOptions = {
      async: true,
      url: 'http://localhost:8000/api/login',
      method: 'POST',
      contentType: 'application/json',
      data: data
    };

    var result = Ember.RSVP.resolve(Ember.$.ajax(requestOptions));
    return result;
  },
  invalidateSession(data) {
alert("test");
    const requestOptions = this.get('session').invalidate();

    return Ember.RSVP.resolve(Ember.$.ajax(requestOptions));
  }
});
