import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Ember from 'ember';

const { computed, observer } = Ember;

export default Component.extend({
	store: service(),


	getChat: computed(function() {
		var test = this.store.peekAll('selected-user-chat');

		console.log('test');
	}),

	actions: {
		submitChatText(chatInputValue, recipient_id) {
			// this.socketRef.send(chatInputValue);
			
			// Ember.$.ajax({
	  //           type: "POST",
	  //           url: "http://localhost:8000/api/postMessage",
	  //           data: { user_id: 11, recipient_id: recipient_id, message: chatInputValue }
	  //       }).then(response => {
	  //       	var id = response;
	  //       	this.store.createRecord('selected-user-chat', {
	  //       		id: id,
			// 	  	recipient_id: recipient_id,
			// 	  	message: chatInputValue,
			// 	  	sender: false
			// 	});
			// 	let allChat = this.store.peekAll('selected-user-chat');
			// 	this.set('model', allChat);
	  //       	// this.test();
	  //       }).catch(response => {
	  //       	alert(response);
	  //       	alert('some error occured!!!');
	  //       })
		}
	}
});
