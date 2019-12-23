import Component from '@ember/component';

const { computed, observer } = Ember;
const { alias } = computed;

export default Component.extend({
	actions: {
		selectUser(userId) {
			alert(userId);
		}
	}
});
