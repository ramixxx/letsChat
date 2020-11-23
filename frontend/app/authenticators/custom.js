import $ from 'jquery';
import { resolve } from 'rsvp';
import { isEmpty } from '@ember/utils';
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
      if (!isEmpty(data.access_token)) {
        console.log("TEST: ",data);
        resolve(data);
      } else {
        console.log("REJECTED");
        reject();
      }
    });
  },
  authenticate(email, password) {
 	const data = JSON.stringify({
      email: email, password: password
    });
  this.activateLoginIcon.on();
  console.log("TEST: ",);
 	const requestOptions = {
      async: true,
      url: 'http://'+ window.location.hostname +':8000/' + this.get('tokenEndpoint'),
      method: 'POST',
      contentType: 'application/json',
      data: data
    };


    var result = resolve($.ajax(requestOptions));
    console.log("Dwdwwd",result);
    return result;
  },
  invalidateSession(data) {
alert("test");
    const requestOptions = this.session.invalidate();

    return resolve($.ajax(requestOptions));
  }
});
