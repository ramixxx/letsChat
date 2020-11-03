import Route from '@ember/routing/route';
import DS from 'ember-data';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
	routeAfterAuthentication: 'main',

  	// model: function() {
 		// var url = 'http://localhost:8000/api/contacts';

  	// 	var promise = new Ember.RSVP.Promise(function(resolve, reject) {
   //          var contacts = Ember.$.ajax({ url: url, type: 'GET' });
   //          resolve(contacts);
   //      });
   //      var ttt = DS.PromiseObject.create({ promise: promise });
   //      console.log(ttt);
   //      // var test = DS.PromiseObject.create({ promise: abc });
   //      // console.log(abc);
   //      // console.log(test);
  	// },



	actions: {

  	}
});
