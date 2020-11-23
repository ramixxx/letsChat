import Controller from '@ember/controller';
import { alias, reads } from '@ember/object/computed';
import { observer } from '@ember/object';
import jQuery from 'jquery';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Controller.extend({
	session: service(),
	sidebarState: service(),
	queryParams: ['selectedUserId'],
	selectedUserId: null,
	contacts: reads('model.contacts'),

	init() {
		this._super(...arguments);
	},

	@action
		// closeSidebar() {
		// 	document.getElementById("left-sidebar").style.width = "0";
  // 			document.getElementById("main").style.marginLeft = "0";
  // 			this.set('sidebarOpened', false);
		// },
		toggleSidebar() {
			this.sidebarState.toggleSidebar();
		},

		test() {
			this.model.reload();
		},

		// selectUser(userId) {
		// 	var self = this;
		// 	alert(userId);
		// 	let peekChat = this.store.peekRecord('selected-user-chat', userId);
		// 	if (peekChat) {
		// 		self.set('model.selectedChat', peekChat);
		// 	} else {
		// 		// this.store.findAll('selected-user-chat').then((records) => {
		// 		//   let test = records.findBy('id', userId);
		// 		//   console.log(test);
		// 		//   self.set('model.selectedChat', test);
		// 		// });
		// 		this.store.query('selectedUserChat', {
		// 		  filter: {
		// 		    id: userId
		// 		  }
		// 		}).then(function(response) {
		// 			// let test = response.findBy('id', userId);
		// 			let test = response.get('recipient_id') == 2;
		// 			console.log("This is filtered resp: " + test);
		// 			// console.log(test);
		// 			// self.set('model.selectedChat', response);
		// 		});
		// 	}
		// }
/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */


		// openSidebar() {
		//   document.getElementById("left-sidebar").style.width = "250px";
		//   this.set('sidebarOpened', true);
		// }
	
});
