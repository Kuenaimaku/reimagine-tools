<template>
  <div id="character">
    <section class="hero is-dark is-bold is-small">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-10">
              <!-- Left side -->
              <h1 class="title">Character Builder</h1>
              <p class="subtitle">Watch out, I'm about to do something WICKED (alpha)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
		
    <section class="section" id="drag-container">
			<AttributePanel :attributes="this.attributes" :panel="this.panels.player"/>
			<ExpertisePanel :expertise="this.expertise" :panel="this.panels.expertise"/>
			<SkillsPanel :expertise="this.expertise" :panel="this.panels.skills"/>
			<BuffsPanel :buffs="this.buffs" :panel="this.panels.buffs"/>
			<DemonTargetPanel :buffs="this.demons" :panel="this.panels.demons"/>
			<TechnicalPanel :technical="this.technical" :panel="this.panels.technical"/>
			<OptionsPanel :options="this.options" :panel="this.panels.options"/>
			<div id="menu">
				<o-tooltip label="Player Attributes"><a @click="togglePlayerPanel"><o-icon pack="mdi" class="icon" icon="card-account-details"/></a></o-tooltip>
				<o-tooltip label="Expertise"><a @click="toggleExpertisePanel"><o-icon pack="mdi" class="icon" icon="arm-flex"/></a></o-tooltip>
				<o-tooltip label="Skills"><a @click="toggleSkillsPanel"><o-icon pack="mdi" class="icon" icon="fire"/></a></o-tooltip>
				<o-tooltip label="Buffs and Boosts"><a @click="toggleBuffsPanel"><o-icon pack="mdi" class="icon" icon="auto-fix"/></a></o-tooltip>
				<o-tooltip label="Demon (Target)"><a @click="toggleDemonTargetPanel"><o-icon pack="mdi" class="icon" icon="emoticon-devil-outline"/></a></o-tooltip>
				<o-tooltip label="Technical Data"><a @click="toggleTechnicalPanel"><o-icon pack="mdi" class="icon" icon="calculator-variant"/></a></o-tooltip>
				<o-tooltip label="Options"><a @click="toggleOptionsPanel"><o-icon pack="mdi" class="icon" icon="cog"/></a></o-tooltip>
			</div>
    </section>
  </div>
</template>

<script>
import dataService from "@/services/dataService";
import AttributePanel from "@/components/character/AttributePanel.vue";
import ExpertisePanel from "@/components/character/ExpertisePanel.vue";
import BuffsPanel from "@/components/character/BuffsPanel.vue";
import TechnicalPanel from "@/components/character/TechnicalPanel.vue";
import OptionsPanel from "@/components/character/OptionsPanel.vue";
import DemonTargetPanel from "@/components/character/DemonTargetPanel.vue";
import SkillsPanel from "@/components/character/SkillsPanel.vue";

export default {
  name: "Character",
  components: {
    AttributePanel,
    ExpertisePanel,
    BuffsPanel,
    TechnicalPanel,
    OptionsPanel,
    DemonTargetPanel,
		SkillsPanel
},
  data() {
    return {
			attributes:{},
			expertise:{},
			buffs:{},
			technical:{},
      options:{},
			demons:{},
			panels:{
				player:{
					x: 0,
					y: 0,
					isActive: false,
				},
				expertise:{
					x: 0,
					y: 0,
					isActive: false,
				},
				skills:{
					x: 0,
					y: 0,
					isActive: false,
				},
				buffs:{
					x: 0,
					y: 0,
					isActive: false,
				},
				demons:{
					x: 0,
					y: 0,
					isActive: false,
				},
				technical:{
					x: 0,
					y: 0,
					isActive: false,
				},
				options:{
					x: 0,
					y: 0,
					isActive: false,
				}
			}
    };
  },
	created(){
		this.expertise = dataService.getExpertise();
		this.options = dataService.getExpertiseDefaults();
	},
	methods: {
		togglePlayerPanel(){
			this.panels.player.isActive = !this.panels.player.isActive;
		},
		toggleExpertisePanel(){
			this.panels.expertise.isActive = !this.panels.expertise.isActive;
		},
		toggleSkillsPanel(){
			this.panels.skills.isActive = !this.panels.skills.isActive;
		},
		toggleBuffsPanel(){
			this.panels.buffs.isActive = !this.panels.buffs.isActive;
		},
		toggleDemonTargetPanel(){
			this.panels.demons.isActive = !this.panels.demons.isActive;
		},
		toggleTechnicalPanel(){
			this.panels.technical.isActive = !this.panels.technical.isActive;
		},
		toggleOptionsPanel(){
			this.panels.options.isActive = !this.panels.options.isActive;
		},
	}
};
</script>

<style>
#character {
  height: 82vh;
}

#drag-container {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 73vh;

	position: relative;
  border: 1px solid #000;
  user-select: none;
}

#menu {
	position: absolute;
	right: 1em;
	bottom: 0.25em;
	display:flex;
	column-gap: 5px;

	background-color: RGBA(36, 86, 111, 0.8);
	padding: 5px;
}

#menu a{
	color: #cccccc;
	display: block;
	line-height: 2.5;
	padding: 0.5rem 0.75rem;
	position: relative;
	border: 1px solid #ccc;
	height:50px;
}

.hidden{
	display:none;
}

.vdr-container{
	border: 1px solid #000 !important;
}
</style>