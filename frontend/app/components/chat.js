import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Ember from 'ember';

const { computed, observer } = Ember;

export default Component.extend({
	store: service(),
	websockets: service(),
	socketRef: null,

	didInsertElement() {
    	this._super(...arguments);

    /*
      2. The next step you need to do is to create your actual websocket. Calling socketFor
      will retrieve a cached websocket if one exists or in this case it
      will create a new one for us.
    */
    	const socket = this.websockets.socketFor('ws://localhost:8080/');

    /*
      3. The next step is to define your event handlers. All event handlers
      are added via the `on` method and take 3 arguments: event name, callback
      function, and the context in which to invoke the callback. All 3 arguments
      are required.
    */
    	socket.on('open', this.myOpenHandler, this);
    	socket.on('message', this.myMessageHandler, this);
    	socket.on('close', this.myCloseHandler, this);

    	this.set('socketRef', socket);
  	},

  	willDestroyElement() {
	    this._super(...arguments);

	    const socket = this.socketRef;

	    /*
	      4. The final step is to remove all of the listeners you have setup.
	    */
	    socket.off('open', this.myOpenHandler);
	    socket.off('message', this.myMessageHandler);
	    socket.off('close', this.myCloseHandler);
	},

  	myOpenHandler(event) {
	    console.log(`On open event has been called: ${event}`);
	},

	myMessageHandler(event) {
	    console.log(`Message: ${event.data}`);
	    console.log(event);
	    this.set('model', JSON.parse(event.data));
	},

	myCloseHandler(event) {
		console.log(event);
	    console.log(`On close event has been called: ${event}`);
	},

	getChat: computed(function() {
		var test = this.store.peekAll('selected-user-chat');

		console.log('test');
	}),

	actions: {
		submitChatText(chatInputValue, recipient_id) {
			this.socketRef.send(chatInputValue);
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
