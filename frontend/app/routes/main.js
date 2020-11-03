import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin,{
	store: service(),
	session: service(),
	currentUser: service(),
	activateLoginIcon: service('activate-login-icon'),

	// setupController(controller, model) {
	//     this._super(controller, model);
	//     this.controllerFor('contact').set('contact', model);
 //  	},


	actions: {
		// closeSidebar() {
		// 	document.getElementById("left-sidebar").style.width = "0";
  // 			document.getElementById("main").style.marginLeft = "0";
		// },
		// logout() {
		// 	$.ajax({
	 //            type: "POST",
	 //            url: "http://localhost:8000/api/logout"
	 //        }).then(response => {
	 //        	this.activateLoginIcon.off();
	 //        	this.store.unloadAll('contact');
	 //            this.transitionTo('login');
	 //        })
		// }

		invalidateSession() {

				let controller = this;
				let currentUserIdentifier = controller.get('session.data.authenticated.identifier');
				console.log("CURR USER ID : ",currentUserIdentifier);
				$.ajax({
            type: "POST",
            url: "http://"+window.location.hostname+":8000/api/logout/" + currentUserIdentifier
        }).then(response => {
        	// this.activateLoginIcon.off();
        	this.store.unloadAll('contact');
           // this.transitionTo('login');
					 this.get('session').invalidate();
        })

		}
	}
});
