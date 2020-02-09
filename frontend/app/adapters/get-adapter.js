import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  	host: 'http://'+location.hostname+':8000/api'
});