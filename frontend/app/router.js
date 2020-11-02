import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('login', { path: '/' });
  	this.route('register', { path: '/register' });
	  this.route('main', { path: '/main' });
	  this.route('channel');
	  this.route('contacts', function() {
		this.route('chat', { path: ':userId' });
	});
});

export default Router;
