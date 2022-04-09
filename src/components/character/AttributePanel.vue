<template>
	<div class="draggable-panel">
		<header class="panel-header">
			<o-icon pack="mdi" class="icon" icon="card-account-details"/>
			<h1>Player Attributes</h1>
			<o-button variant="danger" class="danger" size="small" @click="onClose">x</o-button>
		</header>
		<div class="columns">
			<div class="column">
				<table class="table is-fullwidth">
					<tbody>
						<tr>
							<th>Lv</th>
							<td><o-input size="small"></o-input></td>
						</tr>
					</tbody>
				</table>
				<table class="table is-fullwidth">
					<tbody>
						<tr>
							<th>Strength</th>
							<td><o-input size="small"></o-input></td>
						</tr>
						<tr>
							<th>Magic</th>
							<td><o-input size="small"></o-input></td>
						</tr>
						<tr>
							<th>Vitality</th>
							<td><o-input size="small"></o-input></td>
						</tr>
						<tr>
							<th>Intelligence</th>
							<td><o-input size="small"></o-input></td>
						</tr>
						<tr>
							<th>Speed</th>
							<td><o-input size="small"></o-input></td>
						</tr>
						<tr>
							<th>Luck</th>
							<td><o-input size="small"></o-input></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="column">
				Fields go here
			</div>
		</div>
	</div>

</template>

<script>
export default {
  name: "AttributePanel",
  components: {

  },
		props: {
    attributes: {
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
	overflow: hidden;
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

</style>