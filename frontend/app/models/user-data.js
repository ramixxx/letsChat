import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
	email: DS.attr('string')
});
