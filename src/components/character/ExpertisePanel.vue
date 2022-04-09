<template>
	<div class="draggable-panel">
		<header class="panel-header">
			<o-icon pack="mdi" class="icon" icon="arm-flex"/>
			<h1>Expertise</h1>
			<o-button variant="danger" class="danger" size="small" @click="onClose">x</o-button>
		</header>
		<div class="panel-body">
			<o-tabs v-model="activeTab" :expanded="true">
				<o-tab-item value="0" label="Expertise" class="tabcontent">
					<h2>Expertise Limit</h2>
					<progressbar
						:type="progressType"
						size="is-large"
						:value="currentExpertise"
						:max="expertiseFloor + bonusExpertise"
						show-value>
						{{ currentExpertise }}/{{ expertiseFloor + bonusExpertise }}
					</progressbar>
					<ExpertiseInput
						v-for="item in expertise"
						:key="item.queryParam"
						:expertise="item"
					/>
				</o-tab-item>
				<o-tab-item value="1" label="Chain Expertise" class="tabcontent">
					test
				</o-tab-item>
			</o-tabs>
		</div>
	</div>

</template>

<script>

import ExpertiseInput from "@/components/expertise/ExpertiseInput.vue";
import Progressbar from "@/components/Progressbar.vue";

export default {
  name: "ExpertisePanel",
  components: {
		ExpertiseInput,
		Progressbar
  },
	props: {
    expertise: {
      type: Object,
      required: true,
    },

		panel: {
			type: Object,
			required: true,
		}
  },
  data() {
    return {
			activeTab: "0",
			expertiseFloor: 17000,
      options: {},
    };
  },
	methods:{
		onClose(){
			this.panel.isActive = !this.panel.isActive;
		}
	},
	computed:{
		currentExpertise() {
      const values = Object.values(this.expertise);
      let e = 0;
      values.forEach(function (v) {
        e += v.value;
      });
      return e;
    },
    bonusExpertise() {
      return 0
    },
    progressType() {
      if (this.currentExpertise <= this.expertiseFloor + this.bonusExpertise)
        return "is-warning";
      else return "is-danger";
    },
	}
};
</script>

<style scoped>

.draggable-panel{
	background-color: RGBA(29,62,79, 0.4);
	height:100%;
	width:100%;
	font-size:0.8em;
	overflow:hidden;
}

.panel-header {
	display: flex;
  flex-direction: row;
	align-items: center;
	column-gap: 1em;
	background-color: RGBA(36, 86, 111, 0.8);
	padding: 1em;
}

.panel-header h1{
	font-size:1.2em;
	font-weight: bold;

}

.panel-header button{
	margin-left: auto;
	padding: 0px 3px 4px 3px;
	height:16px;
	line-height:16px
}

.panel-header button.danger{
	background-color: #b60000;
}

.panel-body {
	overflow: hidden;
}

.tabcontent {
	overflow-y: scroll;
	overflow-x: hidden;
	height: 504px;
	padding: 0.5em;
}

.tabcontent::-webkit-scrollbar {
    width: 12px;
}
.tabcontent::-webkit-scrollbar-thumb {
    background-color: #7dbbbb;
    border-radius: 20px;
    border: 3px solid rgba(23,29,30,.8);
    margin: 3px;
}

.tabcontent::-webkit-scrollbar-track {
    background: none;
}

</style>