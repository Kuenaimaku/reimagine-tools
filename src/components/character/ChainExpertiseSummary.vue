<template>
  <div>
    <div class="level">
      <div class="level-left">
        <h4 class="title is-4">Chain Expertise</h4>
      </div>
      <div class="level-right">
        <o-switch size="small" v-model="hideLocked">Hide Locked</o-switch>
      </div>
    </div>
    <arms-maker
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('arms-maker')"
    />
    <conditions-magic
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('conditions-magic')"
    />
    <conditions-melee
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('conditions-melee')"
    />
    <conditions-ranged
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('conditions-ranged')"
    />
    <craftsmanship
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('craftsmanship')"
    />
    <curse-of-the-wretched
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('curse-of-the-wretched')"
    />
    <enhancement
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('enhancement')"
    />
    <magic-bullet
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('magic-bullet')"
    />
    <magic-fist
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('magic-fist')"
    />
    <three-forms
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('three-forms')"
    />
    <miitama
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('miitama')"
    />
    <rampage
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('rampage')"
    />
    <retaliation
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('regal-presence')"
    />
    <sharpshooter
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('sharpshooter')"
    />
    <support-bullet
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('support-bullet')"
    />
    <swordsmith
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('swordsmith')"
    />
    <synthesis
      :expertise="expertise"
      :options="options"
      :hideLocked="hideLocked"
      :skills="skills('synthesis')"
    />
  </div>
</template>

<script>
import dataService from "@/services/dataService";

import ArmsMaker from "@/components/expertise/singletons/ArmsMaker.vue";
import ConditionsMagic from "@/components/expertise/singletons/ConditionsMagic.vue";
import ConditionsMelee from "@/components/expertise/singletons/ConditionsMelee.vue";
import ConditionsRanged from "@/components/expertise/singletons/ConditionsRanged.vue";
import Craftsmanship from "@/components/expertise/singletons/Craftsmanship.vue";
import CurseOfTheWretched from "@/components/expertise/singletons/CurseOfTheWretched.vue";
import Enhancement from "@/components/expertise/singletons/Enhancement.vue";
import MagicBullet from "@/components/expertise/singletons/MagicBullet.vue";
import MagicFist from "@/components/expertise/singletons/MagicFist.vue";
import Miitama from "@/components/expertise/singletons/Miitama.vue";
import Rampage from "@/components/expertise/singletons/Rampage.vue";
import Retaliation from "@/components/expertise/singletons/Retaliation.vue";
import Sharpshooter from "@/components/expertise/singletons/Sharpshooter.vue";
import SupportBullet from "@/components/expertise/singletons/SupportBullet.vue";
import Swordsmith from "@/components/expertise/singletons/Swordsmith.vue";
import Synthesis from "@/components/expertise/singletons/Synthesis.vue";
import ThreeForms from "@/components/expertise/singletons/ThreeForms.vue";

export default {
  name: "ChainExpertiseSummary",
	components:{
    ArmsMaker,
    ConditionsMagic,
    ConditionsMelee,
    ConditionsRanged,
    Craftsmanship,
    CurseOfTheWretched,
    Enhancement,
    MagicBullet,
    MagicFist,
    Miitama,
    Rampage,
    ThreeForms,
    Retaliation,
    Sharpshooter,
    SupportBullet,
    Swordsmith,
    Synthesis
	},
  props: {
    expertise: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      hideLocked: false,
      chainExpertise: {},
    }
  },
  created(){
    let c = dataService.getChainExpertise();
    this.chainExpertise = c;
  },
  methods: {
    classRank(amount) {
      var a = Number.parseInt(amount) / 100;
      var b = a.toString();
      if (a === 0) {
        return "Class 0 Rank 0";
      } else if (a >= 100) {
        return "Class " + b.charAt(0) + b.charAt(1) + " Rank " + b.charAt(2);
      } else if (a >= 10) {
        return "Class " + b.charAt(0) + " Rank " + b.charAt(1);
      } else {
        return "Class 0 Rank " + b.charAt(0);
      }
    },
    skills(slug){
      return this.chainExpertise[slug];
    }
  },
};
</script>

<style lang="scss" scoped>

</style>