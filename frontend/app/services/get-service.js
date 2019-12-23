import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
	store: service(),
	host: 'http://localhost:8000/api',

	init() {
		this._super(...arguments);
	},

	getWithParam(requestUrl, userId) {
			this.store.query(requestUrl, {
			  filter: {
			    id: userId
			  }
			}).then(function(response) {
				return response;
			});
	}
});
