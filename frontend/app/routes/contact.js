import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	store: service(),

	async model() {
		console.log(this.model);

	},

	actions: {
		selectUser(userId) {
			alert("User selected");
		}
	}

});
