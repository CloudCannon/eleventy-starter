const currentEnv = process.env.ELEVENTY_ENV || "development"
console.log({currentEnv})
const isDevEnv = currentEnv !== 'production';

function showDraft(data) {
	const isDraft = data.draft == true ? 'draft' : '';
	return isDevEnv || (!isDraft);
}

module.exports = {
	layout: "layouts/post.html",
	eleventyComputed: {
		eleventyExcludeFromCollections: function(data) {
			if (showDraft(data)) {
				return data.eleventyExcludeFromCollections;
			} else {
				return true;
			}
		},
		permalink: function(data) {
			if (showDraft(data)) {
				if (data.permalink) {
					return data.permalink;
				} else {
					return "/blog/{{ title | slugify }}/";
				}
			} else {
				return false;
			}
		}
	}
};