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
	}
});
