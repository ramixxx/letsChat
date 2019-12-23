import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
	socketRef: null,
	websockets: service(),

	turnOnWebsockets() {
    	this._super(...arguments);

    	const socket = this.websockets.socketFor('ws://localhost:8080/');
    	socket.on('open', this.myOpenHandler, this);
    	socket.on('message', this.myMessageHandler, this);
    	socket.on('close', this.myCloseHandler, this);

    	this.set('socketRef', socket);
  	},

  	willDestroyElement() {
	    this._super(...arguments);

	    const socket = this.socketRef;

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
});
