import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Ember from 'ember';

export default Route.extend({
	store: service(),
	session: service(),
	activateLoginIcon: service('activate-login-icon'),
	


	async model() {
		let contacts = await (await fetch('http://localhost:8000/api/contact/11')).json();
		let channels = await (await fetch('http://localhost:8000/api/channel/11')).json();
  		//let tests = await (await fetch('http://localhost:8000/api/test')).json();
  		return { contacts, channels };
	},

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
			alert("here");
	    	this.get('session').invalidate();
      	}
	}
});
