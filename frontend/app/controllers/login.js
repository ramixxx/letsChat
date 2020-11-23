import Controller from '@ember/controller';
import { observer, computed } from '@ember/object';
import jQuery from 'jquery';
import { match, not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";

export default Controller.extend({
	activateLoginIcon: service('activate-login-icon'),
	needs: ['main'],
	authenticated: false,
	error: false,
	email: '',
	isValid: match('email', /^.+@.+\..+$/),
	isDisabled: not('isValid'),
	session: service(),

	didActivateLogoChange: computed('activateLoginIcon.loadingLogin', function() {
		return this.get('activateLoginIcon.loadingLogin');
	}),

	@action
	async authenticate() {
	    let { email, password } = this;
		let controller = this;
		try {
	      	await this.session.authenticate('authenticator:custom', email, password);
	    } catch(error) {
	      	this.errorMessage = error.error || error;
	    }


	    if (this.session.isAuthenticated) {
	    	console.log("IS AUTHENTICATED");
	    	let currentUserIdentifier = controller.get('session.data.authenticated').identifier;
      		$.ajax({
				type: "POST",
				url: "http://"+window.location.hostname+":8000/api/makeUserOnline/" + currentUserIdentifier
			}).then(response => {
				this.activateLoginIcon.off();
			});
   		} else {
   			console.log("NOT AUTHENTICATED");
   		}
    
	}
});
