import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin,{
	store: service(),
	session: service(),
	activateLoginIcon: service('activate-login-icon'),

	// setupController(controller, model) {
	//     this._super(controller, model);
	//     this.controllerFor('contact').set('contact', model);
 //  	},

 	async model() {
		let currentUserIdentifier = this.get('session.data.authenticated').identifier;
		let contacts = await (await fetch('http://localhost:8000/api/contact/' + currentUserIdentifier)).json();
		let channels = await (await fetch('http://localhost:8000/api/channel/' + currentUserIdentifier)).json();
		
  		//let tests = await (await fetch('http://localhost:8000/api/test')).json();
  		return { contacts, channels };
	},


	actions: {


		invalidateSession() {

				let controller = this;
				const access_token = this.get('session.data.authenticated').access_token;
				$.ajax({
            type: "GET",
            url: "http://"+window.location.hostname+":8000/api/auth/logout/",
            headers: {"Authorization": "Bearer " + access_token},
            contentType: 'application/json',
        }).then(response => {
        	// this.activateLoginIcon.off();
        	this.store.unloadAll('contact');
           // this.transitionTo('login');
					 this.session.invalidate();
        })

		}
	}
});
