/* An editor for adding and removing translations from a passage. */

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
			this.setPref('currentTranslationId', translation.id)

			// all done if the translation is the default text
			if (translation.id === 0) return

			// make sure translation exists for all passages in this story
			this.story.passages.forEach(passage => {
				// create a translations prop if it doesn't exist
				const translations = passage.translations || []

				// ensure there is a translation for this language
				if (!translations.find(t => t.id === translation.id)){
					translations.push({
						...translation,
						text: ''
					})
				}

				this.updatePassage(
					this.storyId,
					passage.id,
					{ translations }
				)
			})
		}
	},

	vuex: {
		getters: {
			allStories: state => state.story.stories,
			currentTranslationId: state => state.pref.currentTranslationId
		},
		actions: { updatePassage, setPref }
	}
});
