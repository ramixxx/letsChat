import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set, observer } from '@ember/object';

export default Component.extend({
	store: service(),
	sidebarOpened: true,
	selectedUserChat: service('get-service'),



	didInsertElement() {
		var model = this.model;
		
	},

	actions: {

	}
});
