/*
A modal which lets the author manage translation languages.
*/

const Vue = require('vue');
const moment = require('moment');
const linkParser = require('../../data/link-parser');
const locale = require('../../locale');
const { updateStory } = require('../../data/actions/story');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	data: () => ({
		storyId: '',
		origin: null,
		translations: null
	}),

	ready(){
		this.translations = [].concat(this.story.translations)
	},

	computed: {
		story() {
			return this.allStories.find(story => story.id === this.storyId);
		},
	},

	vuex: {
		getters: {
			allStories: state => state.story.stories
		},
		actions: {
			updateStory
		}
	},

	methods: {
		close(){
			this.saveTranslations()
		},
		saveTranslations(){
			this.updateStory(
				this.story.id,
				{
					translations: this.translations
				}
			);
		}
	},

	components: {
		'modal-dialog': require('../../ui/modal-dialog')
	}
});
