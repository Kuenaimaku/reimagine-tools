<template>
  <div>
    <h4 class="title is-4">Chain Expertise</h4>
    <MagicFist
      :expertise="expertise"
      :skills="skills('magic-fist')"
      :options="options"
      :hideLocked="hideLocked"/>
  </div>
</template>

<script>
import dataService from "@/services/dataService";

import MagicFist from "@/components/expertise/singletons/MagicFist.vue";
export default {
  name: "ChainExpertiseSummary",
	components:{
    MagicFist
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