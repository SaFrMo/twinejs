/* An editor for adding and removing tags from a passage. */

const Vue = require('vue');
const { updatePassage } = require('../../../data/actions/passage');
const { setPref } = require('../../../data/actions/pref')
const uniq = require('lodash.uniq');

module.exports = Vue.extend({

	computed: {
		story() {
			return this.allStories.find(story => story.id === this.storyId);
		}
	},

	props: {
		storyId: {
			type: String,
			required: true
		}
	},

	template: require('./index.html'),

	methods: {
		selectTranslation(translation){
			this.setPref('currentLanguageId', translation.id)
		}
	},

	vuex: {
		getters: {
			allStories: state => state.story.stories
		},
		actions: { updatePassage, setPref }
	}
});
