import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Ember from 'ember';

export default Route.extend({
	store: service(),
	
	model(params) {
		console.log(this.get('model'));
	},

	actions: {
		selectUser(userId) {
			alert("HELLO");
		}
	}

});
