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
			console.log("WTF");
	    	let { email, password } = this.getProperties('email', 'password');
				let controller = this;
	    	this.get('session').authenticate('authenticator:custom', email, password).then(function(result) {
						let currentUserIdentifier = controller.get('session.data.authenticated.identifier');
						console.log("IDENTIFIER : ", currentUserIdentifier);
						console.log("?@?@?@");
						console.log(controller.get('session').data);
						$.ajax({
				            type: "POST",
				            url: "http://"+window.location.hostname+":8000/api/makeUserOnline/" + currentUserIdentifier
				    }).then(response => {

				        	// this.activateLoginIcon.off();

						});
      	}, function(err) {
        	console.log(err);
      	});
    }
	}
});
