import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Controller.extend({
	session: service(),
});
