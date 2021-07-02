<template>
  <div>
    <h4 class="title is-4">Selected Expertise</h4>
    <div
      v-for="item in expertise.filter(function (e) {
        return e.value > 0;
      })"
      :key="item.queryParam"
    >
      <span class="option-title">{{ item.name }}</span>
      {{ classRank(item.value) }}
      <div class="skill-summary">
        <skill
            v-for="skill in item.skills.filter(function (e) {
              return e.rank <= item.value;
            })"
          :key="skill.slug"
          :skill="skill"
        >
			</skill>
      </div>
    </div>
  </div>
</template>

<script>

import Skill from '@/components/expertise/Skill.vue'

export default {
  name: "ExpertiseSummary",
	components:{
		Skill
	},
  props: {
    expertise: {
      type: Array,
      required: true,
    },
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
  },
};
</script>

<style lang="scss">
.skill-summary{
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>