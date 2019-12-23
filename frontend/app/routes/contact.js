import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Ember from 'ember';

export default Route.extend({
	store: service(),
	
	async model() {
		console.log(this.get('model'));
  	//   var contactsUrl = 'http://localhost:8000/api/contacts';
	  // let fetchUrlResponse = await fetch(contactsUrl);
	  // let contactsJson = await fetchUrlResponse.json();
	  // // this.store.createRecord('contact', {
	  // //           	id: 1,
	  // //           	name: json[0].name,
	  // //           	surname: json[0].surname
	  // // });
	  // return contactsJson;
	},

	actions: {
		selectUser(userId) {
			alert("User selected");
		}
	}

});
