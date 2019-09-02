import StaticMeter from '../index.vue';

export default {title: '<static-meter>'};

const components = {StaticMeter};

export const full = () => ({
	components,
	template: '<static-meter :percent="100" />'
});

export const half = () => ({
	components,
	template: '<static-meter :percent="50" />'
});

export const empty = () => ({
	components,
	template: '<static-meter :percent="0"></static-meter>'
});
