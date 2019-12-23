import Service from '@ember/service';

export default Service.extend({
	loadingLogin: false,

	init() {
		this._super(...arguments);
	},

	on() {
    	this.set('loadingLogin', true);
  	},

  	off() {
    	this.set('loadingLogin', false);
  	}
});
