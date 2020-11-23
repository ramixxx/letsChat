import $ from 'jquery';
import { observer, computed } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Echo from 'laravel-echo';

export default Component.extend({
	store: service(),
	sidebarState: service(),
	configInfo: service(),
	user_id_sent: null,
	recipient_id_sent: null,
	message_sent: null,
	model: null,
	currentUser: service(),
	session: service(),
	current_recipient_id: null,
	recipient_user_image: null,
	current_user_image: null,

	didModelChange: observer('model', function() {
		// console.log("MODEL DID CHANGE");
		// console.log(this.selectedUserId);

		// let profile_image = this.configInfo.configInfo[0].value;
		// console.log(profile_image);
		// let model = this.model;
		// let currentUserIdentifier = this.get('session.data.authenticated').identifier;

		// var BreakException = {};

		// try {
		// 	model.forEach((item, i) => {

		// 		if (currentUserIdentifier != item.recipient_id) {
		// 			console.log("WWW : ",profile_image);
		// 			console.log("ZZZ : ",item.recipient_id);
		// 			this.set('current_recipient_id',item.recipient_id);
		// 			this.set('current_user_image',profile_image);
		// 			throw BreakException;
		// 		} else {
		// 			this.set('recipient_user_image',item.profile_image);
		// 			throw BreakException;
		// 		}
		// 	});
		// } catch (e) {

		// }
		
		
		

	}),

	didRender(){
		// This scrolls to chat newest messages.
		// alert("TEST");
		window.scrollTo(0,document.body.scrollHeight);
		console.log("CHAT DID RENDER");
  },

	init() {

		let profile_image = this.configInfo.configInfo[0].value;
		console.log("DDDD", profile_image);
		let model = this.model;
		let currentUserIdentifier = this.get('session.data.authenticated').identifier;

		var BreakException = {};

		try {
			model.forEach((item, i) => {

				if (currentUserIdentifier != item.recipient_id) {
					console.log("WWW : ",profile_image);
					console.log("ZZZ : ",item.recipient_id);
					this.set('current_recipient_id',item.recipient_id);
					this.set('current_user_image',profile_image);
					throw BreakException;
				} else {
					this.set('recipient_user_image',item.profile_image);
					// throw BreakException;
				}
			});
		} catch (e) {

		}


				console.log("CHAT INITTED");
		// alert("INIT");
		this._super(...arguments);
		const self = this
		// window.io = require('socket.io-client');
		window.Echo = new Echo({
		    broadcaster: 'socket.io',
		    host: window.location.hostname + ':6001'
		});
		window.Echo.channel('office-dashboard')
        	.listen('.SomeTestEvent', function (e) {
						var currentUserIdentifier = self.get('session.data.authenticated').identifier;
        		let newMessage = e.message;
						let messageDate = e.date;
						let image = e.image;
						console.log("QQQ");
						console.log(e);
						console.log("QQQ");
						const audio = new Audio("/message_alert.mp3");
  					audio.play();
        		let model = self.get('model');
        		let user_id = self.get('user_id_sent');
        		let recipient_id = self.get('recipient_id_sent');
        		let message_sent = self.get('message_sent');
						let profile_image = image;
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
		return "//"+window.location.hostname+":6001/socket.io/socket.io.js";
	}),

	actions: {
		submitChatText(chatInputValue) {
			this.set('chatInputValue','');
			this.$('#chatbox-input').focus();
			// USED FOR SETTING THEM IN MODEL WHEN LARAVEL ECHO SERVER RECEIVES NEW MESSAGE.
			let userIdentifier = this.get('session.data.authenticated').identifier;
			let get_current_recipient_id = this.get('current_recipient_id');
			let current_user_image = this.current_user_image;
			// console.log("@@@@");
			// console.log(get_current_recipient_id);
			// console.log(current_user_image);
			// console.log("@@@@");
			// this.set('user_id_sent', userIdentifier);
			// this.set('recipient_id_sent', get_current_recipient_id);
			// this.set('message_sent', chatInputValue);

			// var getModel = this.model;
			// this.set('model', getModel);

			$.ajax({
        type: "POST",
        url: "http://"+location.hostname+":8000/api/postMessage",
        data: { user_id: userIdentifier, recipient_id: get_current_recipient_id, message: chatInputValue, current_user_image: current_user_image}
      }).then(response => {

		let lastId = response.id;
		let messageDate = response.time;
      	
      	this.store.createRecord('selected-user-chat', {
      		id: lastId,
			recipient_id: get_current_recipient_id,
			message: chatInputValue,
			message_date: messageDate,
			profile_image: current_user_image,
			sender: false
		});
		console.log('!!!!', current_user_image);
		console.log('????', get_current_recipient_id);
			let allChat = this.store.peekAll('selected-user-chat');
			this.set('model', allChat);
      	// this.test();
      }).catch(response => {
      	alert(response);
      	alert('some error occured!??!!');
      })
		}
	}
});
