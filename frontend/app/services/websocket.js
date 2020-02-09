import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
	socketRef: null,
	websockets: service(),

	turnOnWebsockets() {
    	this._super(...arguments);

    	
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
