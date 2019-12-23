import Ember from 'ember';
import jQuery from 'jquery';
import { inject as service } from '@ember/service';

const { computed, observer } = Ember;
const { alias } = computed;

export default Ember.Controller.extend({
	session: service(),
	websocket: service(),
	sidebarOpenedRes: false,
	queryParams: ['userId'],
	userId: null,
	contacts: computed.reads('model.contacts'),
	init() {
		this._super(...arguments);
		this.websocket.turnOnWebsockets();
		this.fetchChat();
	},

	async fetchChat() {
		if(!this.userId) {
			this.set('selectedChat', []);
			return;
		}
		let filter = { id: this.userId };
	    let results = await this.store.query('selectedUserChat', { filter });
	    this.set('selectedChat', results);
	},

	didSidebarChanged: Ember.observer('sidebarOpened', function() {

  		if($("#mySidebar").width() > 240) {
  				document.getElementById("mySidebar").style.width = "0";
		  		document.getElementById("main").style.marginLeft = "0";
		  		$('#closeButton').removeClass("closebtnmargin");
		  		this.set('sidebarOpenedRes', false);
		} else {
			this.set('sidebarOpenedRes', true);
			document.getElementById("mySidebar").style.width = "250px";
  			document.getElementById("main").style.marginLeft = "250px";
  			$('#closeButton').removeClass("closebtnmargin");
  			
		}
  	}),

	actions: {
		// closeSidebar() {
		// 	document.getElementById("left-sidebar").style.width = "0";
  // 			document.getElementById("main").style.marginLeft = "0";
  // 			this.set('sidebarOpened', false);
		// },
		toggleSidebar() {
			this.toggleProperty('sidebarOpened');
		},

		test() {
			this.get('model').reload();
		},

		selectUser(userId) {
			this.websocket.socketRef.send(userId);
		  	this.set('userId', userId);
		  	this.fetchChat();
		}

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
	}
});











