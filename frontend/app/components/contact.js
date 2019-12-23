import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Ember from 'ember';
import { set } from '@ember/object';

const { computed, observer } = Ember;

export default Component.extend({
	store: service(),
	sidebarOpened: true,
	selectedUserChat: service('get-service'),



	didInsertElement() {
		var model = this.get('model');
		
	},

	actions: {

	}
});
