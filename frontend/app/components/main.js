import Component from '@ember/component';

const { computed, observer } = Ember;
const { alias } = computed;

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
