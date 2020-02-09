import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Ember from 'ember';
import Echo from 'npm:laravel-echo';

const { computed, observer } = Ember;

export default Component.extend({
	store: service(),
	user_id_sent: null,
	recipient_id_sent: null,
	message_sent: null,
	model: null,
	session: service(),

	init() {
		this._super(...arguments);
		const self = this
		// window.io = require('socket.io-client');
		window.Echo = new Echo({
		    broadcaster: 'socket.io',
		    host: window.location.hostname + ':6001'
		});
		window.Echo.channel('office-dashboard')
        	.listen('.SomeTestEvent', function (e) {
						var currentUserIdentifier = self.get('session.data.authenticated.identifier');
        		let newMessage = e.data;
        		let model = self.get('model');
        		let user_id = self.get('user_id_sent');
        		let recipient_id = self.get('recipient_id_sent');
        		let message_sent = self.get('message_sent');

						let sender =
        		//model.push({"id" : user_id, "recipient_id": recipient_id, "message": newMessage, "sender": null});
        		//console.log(model);

        		self.store.createRecord('selected-user-chat', {
	        		id: user_id,
					  	recipient_id: recipient_id,
					  	message: newMessage,
					  	sender: true
						});
	   				let allChat = self.store.peekAll('selected-user-chat');
						// allChat.forEach(function(item, index){
						// 	var userId = item.recipient_id;
						// 	if (userId == currentUserIdentifier) {
						// 		Ember.set(item, "sender", true);
						// 	} else {
						// 		Ember.set(item, "sender", false);
						// 		//item['sender'] = true;
						// 	}
						// });
						// console.log(allChat);
						self.set('model', allChat);
            //this.set('selectedChat', e);
        });
	},

	getChat: computed(function() {
		var test = this.store.peekAll('selected-user-chat');

		console.log('test');
	}),

	getHostNameWithSocket: computed(function() {
		var hostName = location.hostname;
		return "//localhost:6001/socket.io/socket.io.js";
	}),

	actions: {
		submitChatText(chatInputValue, recipient_id) {
			// USED FOR SETTING THEM IN MODEL WHEN LARAVEL ECHO SERVER RECEIVES NEW MESSAGE.
			var userIdentifier = this.get('session.data.authenticated.identifier');
			this.set('user_id_sent', userIdentifier);
			this.set('recipient_id_sent', recipient_id);
			this.set('message_sent', chatInputValue);
			var getModel = this.get('model');
			this.set('model', getModel);

			Ember.$.ajax({
        type: "POST",
        url: "http://"+location.hostname+":8000/api/postMessage",
        data: { user_id: userIdentifier, recipient_id: recipient_id, message: chatInputValue }
      }).then(response => {
      	var id = response;
      	// console.log(response);
      	this.store.createRecord('selected-user-chat', {
      		id: id,
			  	recipient_id: recipient_id,
			  	message: chatInputValue,
			  	sender: false
				});
				let allChat = this.store.peekAll('selected-user-chat');
				this.set('model', allChat);
      	// this.test();
      }).catch(response => {
      	alert(response);
      	alert('some error occured!!!');
      })
		}
	}
});
