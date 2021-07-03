<template>
  <chain-expertise
    :expertise="this.expertise"
    :options="this.options"
    :visible="isVisible"
    :classRank="classRank"
    @setValues="setValues"
    name="Synthesis"
  >
    <template v-slot:content>
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Expertise</th>
            <th>Minimum</th>
            <th>Percent</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Occultism</th>
            <td>Class 1 Rank 0</td>
            <td>40%</td>
            <td>{{ parseExpertise(expertise.occultism.value * 0.4) }}</td>
          </tr>
          <tr>
            <th>Demonology</th>
            <td>Class 0 Rank 0</td>
            <td>40%</td>
            <td>
              {{ parseExpertise(expertise.demonology.value * 0.4) }}
            </td>
          </tr>
          <tr>
            <th>Weapon Knowledge</th>
            <td>Class 0 Rank 0</td>
            <td>10%</td>
            <td>
              {{ parseExpertise(expertise.weaponKnowledge.value * 0.1) }}
            </td>
          </tr>
          <tr>
            <th>Mineralogy</th>
            <td>Class 0 Rank 0</td>
            <td>10%</td>
            <td>
              {{ parseExpertise(expertise.mineralogy.value * 0.1) }}
            </td>
          </tr>
        </tbody>
      </table>
      <h5 class="title is-6">Skills Acquired</h5>
      <div class="skill-summary">
        <skill
          v-for="skill in this.skills.filter(function (e) {
            return e.rank <= total && requirements;
          })"
          :key="skill.slug"
          :skill="skill"
        >
        </skill>
      </div>
    </template>
  </chain-expertise>
</template>

<script>
import Skill from "@/components/expertise/Skill.vue";
import ChainExpertise from "@/components/expertise/ChainExpertise.vue";
export default {
  name: "Synthesis",
  components: {
    Skill,
    ChainExpertise,
  },
  props: {
    expertise: {
      type: Object,
      required: true,
    },
    skills: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    hideLocked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    parseExpertise(amount) {
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
    setValues(to) {
      if (to === "zero") {
        this.expertise.occultism.value = 0;
        this.expertise.demonology.value = 0;
        this.expertise.weaponKnowledge.value = 0;
        this.expertise.mineralogy.value = 0;
      } else if (to === "required") {
        this.expertise.occultism.value = 1000;
      } else if (to === "max") {
        this.expertise.occultism.value = this.expertise.occultism.max;
        this.expertise.demonology.value = this.expertise.demonology.max;
        this.expertise.weaponKnowledge.value =
          this.expertise.weaponKnowledge.max;
        this.expertise.mineralogy.value = this.expertise.mineralogy.max;
      }
    },
  },
  computed: {
    isVisible() {
      if (!this.hideLocked) return true;
      else if (this.requirements) return true;
      else return false;
    },
    requirements() {
      if (this.expertise.occultism.value >= 1000) return true;
      else return false;
    },
    total() {
      let occultism = this.expertise.occultism.value * 0.4;
      let demonology = this.expertise.demonology.value * 0.4;
      let weaponKnowledge = this.expertise.weaponKnowledge.value * 0.1;
      let mineralogy = this.expertise.mineralogy.value * 0.1;

      return Number.parseInt(
        occultism + demonology + weaponKnowledge + mineralogy
      );
    },
    classRank() {
      let occultism = this.expertise.occultism.value * 0.4;
      let demonology = this.expertise.demonology.value * 0.4;
      let weaponKnowledge = this.expertise.weaponKnowledge.value * 0.1;
      let mineralogy = this.expertise.mineralogy.value * 0.1;

      var a =
        Number.parseInt(occultism + demonology + weaponKnowledge + mineralogy) /
        100;
      var b = a.toString();
      if (a === 0 || this.expertise.occultism.value < 1000) {
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
