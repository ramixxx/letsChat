import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
	session: service(),
	configInfo: null,

	init() {
		this._super(...arguments);
		this.getConfig();
	},

	async getConfig() {
		let currentUserIdentifier = this.get('session.data.authenticated').identifier;
		let config = await (await fetch('http://localhost:8000/api/config/' + currentUserIdentifier)).json();
		this.set('configInfo', config);
	}
});
