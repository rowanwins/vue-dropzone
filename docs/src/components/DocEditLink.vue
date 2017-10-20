<template>
	<div>
		<a href="#" class="float doc-link" :href="url" target="_blank" v-if="link">
			Edit on Github
		</a>
	</div>
</template>
<script>
import docConfig from '../config/docConfig';
export default {
	props: {
		link: {
			type: String,
			required: false,
			defaut: "#"
		}
	},
	computed: {
		url() {
			return docConfig.repository + "/blob/" + docConfig.branch + "/" + docConfig.docSource + "/" + this.link;
		}
	}
}
</script>
