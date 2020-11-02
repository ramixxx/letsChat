import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
	recipient_id: DS.attr('string'),
	message: DS.attr('string'),
	profile_image: DS.attr('string'),
	message_date: DS.attr('string')
});
