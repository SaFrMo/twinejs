const Vue = require('vue');
const without = require('lodash.without');
// const { setTagColorInStory } = require('../../../../data/actions/story');
const { updatePassage } = require('../../../../data/actions/passage');

require('./index.less');

module.exports = Vue.extend({
	props: {
		language: {
			type: String,
			required: true
		},
		passage: {
			type: Object,
			required: true
		},
		storyId: {
			type: String,
			required: true
		}
	},

	template: require('./index.html'),

	methods: {
		remove() {
			this.updatePassage(
				this.storyId,
				this.passage.id,
				{ language: without(this.passage.languages, this.language) }
			);
		},
		// setColor(color) {
		// 	this.setTagColorInStory(this.storyId, this.tag, color);
		// }
	},

	vuex: {
		actions: { setTagColorInStory, updatePassage }
	},

	components: {
		'drop-down': require('../../../../ui/drop-down')
	}
});
