import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('login', { path: 'index' });
  	this.route('register', { path: '/register' });
	this.route('main', { path: '/' }, function() {
		this.route('chat', { path: '/chat/:userId' });
	});
	
	this.route('channel');
	
});

export default Router;
