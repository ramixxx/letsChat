import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Ember from 'ember';

export default Route.extend({
	store: service(),

	async model() {
		console.log(this.get('model'));

	},

	actions: {
		selectUser(userId) {
			alert("User selected");
		}
	}

});
