import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Ember from 'ember';

export default Route.extend({
	store: service(),
	selectedUserId: null,
	session: service(),

	queryParams: {
    chat: {
      refreshModel: true
    }
  },

	model(params) {
		console.log(params);
		this.set('selectedUserId', params.userId);
	 	return this.fetchChat(params.userId);
	},

	async fetchChat(userId) {
		console.log("WTTTTFFF");
		if(!this.selectedUserId) {
			this.set('selectedChat', []);
			return;
		}

		let currentUserIdentifier = this.get('session.data.authenticated.identifier');
		console.log("CURR ID: ", currentUserIdentifier);
			console.log("Selected ID: ", this.selectedUserId);
		let filter = { selectedUserId: this.selectedUserId, activeUserId: currentUserIdentifier };
		let results = await this.store.query('selectedUserChat', { filter });


		results.forEach(function(item, index){
			var userId = item.recipient_id;
			if (userId == currentUserIdentifier) {
				Ember.set(item, "sender", true);
			} else {
				Ember.set(item, "sender", false);
				//item['sender'] = true;
			}
		});
		return results;
		console.log(results);
			// this.set('model', results);
	},

	actions: {
		selectUser(userId) {
			alert("HELLO");
		}
	}

});
