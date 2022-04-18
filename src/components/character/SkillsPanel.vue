<template>
	<Vue3DraggableResizable 
		:w=400 :h=600 
		:x="panel.x"
		:y="panel.y" 
		:handles="[]" :parent="true"
		:class="{ hidden: !panel.isActive}">
		<div class="draggable-panel">
			<header class="panel-header">
				<o-icon pack="mdi" class="icon" icon="fire"/>
				<h1>Skills</h1>
				<o-button variant="danger" class="danger" size="small" @click="onClose">x</o-button>
			</header>
			<div class="panel-body">
				<expertise-summary
					:expertise="Object.values(expertise)"
				/>
			</div>
		</div>
	</Vue3DraggableResizable>
</template>

<script>

import ExpertiseSummary from "@/components/character/ExpertiseSummary.vue";

export default {
  name: "SkillsPanel",
  components: {
		ExpertiseSummary
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
    };
  },
	methods:{
		onClose(){
			this.panel.isActive = !this.panel.isActive;
		}
	}
};
</script>

<style scoped>

.draggable-panel{
	background-color: RGBA(29,62,79, 0.4);
	height:100%;
	width:100%;
	font-size:0.8em;
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

.panel-body{
	padding: 0.5em;
	overflow-x:hidden;
	overflow-y:scroll;
	height:545px;
}

.panel-body::-webkit-scrollbar {
    width: 12px;
}
.panel-body::-webkit-scrollbar-thumb {
    background-color: #7dbbbb;
    border-radius: 20px;
    border: 3px solid rgba(23,29,30,.8);
    margin: 3px;
}

.panel-body::-webkit-scrollbar-track {
    background: none;
}

</style>