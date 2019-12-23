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

  },
  authenticate(email, password) {
	// this.activateLoginIcon.on();
 //    $.ajax({
 //        type: "POST",
 //        url: this.host + this.tokenEndpoint,
 //        data: { username: email, password: password }
 //    }).then(function (response) {

 //        this.set('authenticated', true);
 //        this.set('email', '');
 //        this.set('password', '');

 //        // this.store.createRecord('currentuser', {
 //        // 	idenitifer: response.id,
 //        // });
 //        console.log(response);
 //        return response;
 //        if(response.success.token != '') {
 //        	this.transitionToRoute('main');
 //        } else if(response.error == "Unauthorised") {
 //        	this.set('error', true);
 //    		this.activateLoginIcon.off();
 //        }

 //    }).catch(response => {
 //    	console.log(response);
 //    	this.set('error', true);
 //    	this.activateLoginIcon.off();
 //    })
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