<template>
  <div>
		<o-field label="Level">
			<multistep-number-input
				v-model.number="options.level.value"
				:editable="false"
				:step1="1"
				:step2="10"
				:min="1"
				:max="99"
			>
    </multistep-number-input>
		</o-field>
    <o-field label="Golden Arc Casino">
      <step-number-input
        :min="0"
        :max="4000"
        :step="1000"
        v-model.number="options.casino.value"
      />
    </o-field>
    <o-field label="Special Training">
      <step-number-input
        :min="0"
        :max="3000"
        :step="1000"
        v-model.number="options.specialTraining.value"
      />
    </o-field>
    <o-field>
      <template v-slot:label>
				Tier 1 Demon Digitalize
				<o-tooltip label="Races: Divines, Wild Birds, Earth Elements, Fairies, Beasts, Elementals, Brutes, Evil Dragons, Haunts" multiline position="right">
					<o-icon  size="small" icon="help-circle-outline" />
				</o-tooltip>
      </template>
      <step-number-input
        :min="0"
        :max="3000"
        :step="1000"
        v-model.number="options.tierOneDDS.value"
      />
    </o-field>
    <o-field>
      <template v-slot:label>
				Tier 2 Demon Digitalize
				<o-tooltip label="Races: Raptor, Yoma, Nocturne, Wilder, Dragon King, Femme, Foul" multiline position="right">
					<o-icon  size="small" icon="help-circle-outline" />
				</o-tooltip>
      </template>
      <step-number-input
        :min="0"
        :max="3000"
        :step="1000"
        v-model.number="options.tierTwoDDS.value"
      />
    </o-field>
    <o-field>
      <template v-slot:label>
				Tier 3 Demon Digitalize
				<o-tooltip label="Races: Fallen Angel, Dragon, Avian, Evil Demon, Godly Beast, Holy Beast" multiline position="right">
					<o-icon  size="small" icon="help-circle-outline" />
				</o-tooltip>
      </template>
      <step-number-input
        :min="0"
        :max="3000"
        :step="1000"
        v-model.number="options.tierThreeDDS.value"
      />
    </o-field>
		<label class="o-field__label">Level 10 Demon Digitalize</label>
		<o-field>
			<o-switch v-model.number="options.levelTenDDS1.value" :true-value="3000" :false-value="0" :leftLabel="true">
				Group 1
				<o-tooltip label="Races: Demigod" position="right">
					<o-icon size="small" icon="help-circle-outline" />
				</o-tooltip>
			</o-switch>
		</o-field>
		<o-field>
			<o-switch v-model.number="options.levelTenDDS2.value" :true-value="3000" :false-value="0" :leftLabel="true">
				Group 2
				<o-tooltip label="Races: Goddess, Vile, Heavenly God" position="right">
					<o-icon size="small" icon="help-circle-outline" />
				</o-tooltip>
			</o-switch>
		</o-field>
		<o-field>
			<o-switch v-model.number="options.levelTenDDS3.value" :true-value="3000" :false-value="0" :leftLabel="true">
				Group 3
				<o-tooltip label="Races: Reaper" position="right">
					<o-icon size="small" icon="help-circle-outline" />
				</o-tooltip>
			</o-switch>
		</o-field>
		<o-field>
			<o-switch v-model.number="options.levelTenDDS4.value" :true-value="3000" :false-value="0" :leftLabel="true">
				Group 4
				<o-tooltip label="Races: Guardian, Earth Mother, Nation Ruler" position="right">
					<o-icon size="small" icon="help-circle-outline" />
				</o-tooltip>
			</o-switch>
		</o-field>
		<o-field>
			<o-switch v-model.number="options.levelTenDDS5.value" :true-value="3000" :false-value="0" :leftLabel="true">
				Group 5
				<o-tooltip label="Races: Entity" position="right">
					<o-icon size="small" icon="help-circle-outline" />
				</o-tooltip>
			</o-switch>
		</o-field>
    <o-field>
      <template v-slot:label>
        <span class="option-title">Diaspora</span>
      </template>
      <step-number-input
        :min="0"
        :max="16000"
        :step="1000"
        v-model.number="options.diaspora.value"
      />
    </o-field>
    <o-field>
      <template v-slot:label>
        <span class="option-title">St. Germain Quests</span>
      </template>
      <step-number-input
        :min="0"
        :max="2000"
        :step="1000"
        v-model.number="options.saintGermain.value"
      />
    </o-field>
    <o-field grouped>
      <o-button expanded @click="reset" icon-left="refresh">Reset Options</o-button>
      <o-button expanded @click="link" icon-left="link">Generate Link</o-button>
    </o-field>
  </div>
</template>

<script>
import StepNumberInput from "@/components/StepNumberInput.vue";
import MultistepNumberInput from "@/components/MultistepNumberInput.vue";

export default {
  name: "Options",
  components: {
    StepNumberInput,
    MultistepNumberInput,
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods:{
    reset(){
      this.$emit("reset-expertise");
    },
    link(){
      this.$emit("open-link-modal");
    },
  }
};
</script>

<style lang="scss">

.o-switch__label {
    display: block;
		color: #e6e6e6;
    font-size: 1rem;
    font-weight: 600;
}
.o-tip__content{
	background-color: hsl(275, 20%, 50%);
}

.o-tip__arrow {
  color: hsl(275, 20%, 50%);
}

.o-tabs__nav-item-default--active {
    border-bottom-color: hsl(275, 20%, 50%);
    color: #e6e6e6
}

.o-tabs__nav-item-default:hover:not(.o-tabs__nav-item-default--active) {
		color:#e6e6e6;
    background-color: hsl(275, 20%, 50%);
    border-bottom-color: hsl(275, 20%, 50%);
}

</style>