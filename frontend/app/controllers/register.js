import $ from 'jquery';
import Controller from '@ember/controller';
import { observer } from '@ember/object';
import { match, not, gte, and } from '@ember/object/computed';

export default Controller.extend({
	authenticated: false,
	error: false,

	name: '',
	email: '',
	isValidEmail: match('email', /^.+@.+\..+$/),
	isNameEnoughLong: gte("name.length", 5),

  	isValid: and('isNameEnoughLong', 'isValidEmail'),

	actions: {
		register(name, email, password) {
			$.ajax({
	            type: "POST",
	            url: "http://localhost:8000/api/register",
	            data: { name: name, email: email, password: password }
	        }).then(response => {
	            alert('Registered!');
	            this.set('name', '');
	            this.set('email', '');
	            this.set('password', '');
	            this.transitionToRoute('login');
	        }).catch(response => {
	        	alert('some error occured!!!');
	        })
		}
	}
});


