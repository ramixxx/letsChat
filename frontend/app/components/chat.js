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
	currentUser: service(),
	session: service(),
	current_recipient_id: null,
	recipient_user_image: null,
	current_user_image: null,

	didModelChange: Ember.observer('model', function() {
		let profile_image = this.get('config')[0].value;
		let model = this.get('model');
		var currentUserIdentifier = this.get('session.data.authenticated.identifier');
		model.forEach((item, i) => {
			if (currentUserIdentifier != item.recipient_id) {
				this.set('current_recipient_id',item.recipient_id);
				this.set('current_user_id', currentUserIdentifier);
				this.set('current_user_image',profile_image);
				console.log("WWWWWW");
				console.log(item.profile_image);

			} else {
				this.set('recipient_user_image',item.profile_image);

			}
		});

	}),

	didRender(){
		var objDiv = document.getElementById("chat-scroll-div");
		objDiv.scrollTop = objDiv.scrollHeight;
    this.$('#chatbox-input').focus();
  },

	init() {
		//this.set('current_recipient_id', model.)

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
						let messageDate = e.date;
						console.log("QQQ");
						console.log(e);
						console.log("QQQ");
        		let model = self.get('model');
        		let user_id = self.get('user_id_sent');
        		let recipient_id = self.get('recipient_id_sent');
        		let message_sent = self.get('message_sent');
						let profile_image = self.get('recipient_user_image');
						//let sender =
        		//model.push({"id" : user_id, "recipient_id": recipient_id, "message": newMessage, "sender": null});
        		//console.log(model);
        		self.store.createRecord('selected-user-chat', {

					  	recipient_id: recipient_id,
					  	message: newMessage,
							message_date: messageDate,
					  	sender: true,
							profile_image: profile_image
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
		submitChatText(chatInputValue) {
			this.set('chatInputValue','');
			this.$('#chatbox-input').focus();
			// USED FOR SETTING THEM IN MODEL WHEN LARAVEL ECHO SERVER RECEIVES NEW MESSAGE.
			let userIdentifier = this.get('session.data.authenticated.identifier');
			let get_current_recipient_id = this.get('selectedUserId');
			let current_user_image = this.get('current_user_image');
			console.log("@@@@");
			console.log(get_current_recipient_id);
			console.log(current_user_image);
			console.log("@@@@");
			this.set('user_id_sent', userIdentifier);
			this.set('recipient_id_sent', get_current_recipient_id);
			this.set('message_sent', chatInputValue);

			var getModel = this.get('model');
			this.set('model', getModel);

			Ember.$.ajax({
        type: "POST",
        url: "http://"+location.hostname+":8000/api/postMessage",
        data: { user_id: userIdentifier, recipient_id: get_current_recipient_id, message: chatInputValue }
      }).then(response => {
      	var id = response[0];
				let messageDate = response[1];
				let time = messageDate.slice(-8);
      	console.log(response);
      	this.store.createRecord('selected-user-chat', {
      		id: id,
			  	recipient_id: get_current_recipient_id,
			  	message: chatInputValue,
					message_date: time,
					profile_image: current_user_image,
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
