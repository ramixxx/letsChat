import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('login', { path: 'index' });
    this.route('main', { path: '/' });
  	this.route('register', { path: '/register' });
	  this.route('main', { path: '/main' });
	  this.route('channel');
	  this.route('chat', { path: 'chat/:userId' });
});

export default Router;
