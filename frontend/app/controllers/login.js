import Ember from 'ember';
import jQuery from 'jquery';
import { match, not } from '@ember/object/computed';
import { inject as service } from '@ember/service';

const { computed, observer } = Ember;

export default Ember.Controller.extend({
	activateLoginIcon: service('activate-login-icon'),
	needs: ['main'],
	authenticated: false,
	error: false,
	email: '',
	isValid: match('email', /^.+@.+\..+$/),
  	isDisabled: not('isValid'),
  	session: service(),

  	didActivateLogoChange: Ember.computed('activateLoginIcon.loadingLogin', function() {
  		return this.get('activateLoginIcon.loadingLogin');
  	}),

	actions: {
		authenticate() {
	    	let { email, password } = this.getProperties('email', 'password');
	    	this.get('session').authenticate('authenticator:custom', email, password).then(function(result) {
	        	console.log(result);
	      	}, function(err) {
	        	console.log(err);
	      	});
    }
		// authenticate(email, password) {
		// 	this.activateLoginIcon.on();
	 //        $.ajax({
	 //            type: "POST",
	 //            url: "http://localhost:8000/api/login",
	 //            data: { email: email, password: password }
	 //        }).then(response => {
	 //            this.set('authenticated', true);
	 //            this.set('email', '');
	 //            this.set('password', '');

	 //            this.store.createRecord('currentuser', {
	 //            	idenitifer: response.id,
	 //            });
	 //            if(response.success.token != '') {
	 //            	this.transitionToRoute('main');
	 //            } else if(response.error == "Unauthorised") {
	 //            	this.set('error', true);
	 //        		this.activateLoginIcon.off();
	 //            }

	 //        }).catch(response => {
	 //        	console.log(response);
	 //        	this.set('error', true);
	 //        	this.activateLoginIcon.off();
	 //        })
		// }
	}
});
