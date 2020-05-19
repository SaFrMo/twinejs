/* An editor for adding and removing languages from a passage. */

const Vue = require('vue');
const { updatePassage } = require('../../../data/actions/passage');
const uniq = require('lodash.uniq');

module.exports = Vue.extend({
	data: () => ({
		newVisible: false
	}),

	computed: {
		languageColors() {
			return '#000';//this.allStories.find(s => s.id === this.storyId).tagColors;
		}
	},

	props: {
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
		showNew() {
			this.newVisible = true;
			this.$nextTick(() => this.$els.newName.focus());
		},

		hideNew() {
			this.newVisible = false;
		},

		addNew() {
			const newName = this.$els.newName.value.replace(/\s/g, '-');

			/* Clear the newName element while it's transitioning out. */

			this.$els.newName.value = '';

			this.updatePassage(
				this.storyId,
				this.passage.id,
				{
					languages: uniq([].concat(this.passage.languages || [], newName))
				}
			);

			this.hideNew();
		}
	},

	vuex: {
		getters: {
			allStories: state => state.story.stories
		},
		actions: { updatePassage }
	},
});
