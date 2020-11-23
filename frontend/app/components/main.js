import { alias } from '@ember/object/computed';
import { observer } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
	didRender() {
		var objDiv = document.getElementById("chat-scroll-div");
objDiv.scrollTop = objDiv.scrollHeight;

	},

	actions: {
		selectUser(userId) {
			alert(userId);
		}
	}
});
