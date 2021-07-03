<template>
  <chain-expertise
    :expertise="this.expertise"
    :options="this.options"
    :visible="isVisible"
    :classRank="classRank"
    @setValues="setValues"
    name="Retaliation"
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
            <th>Attack</th>
            <td>Class 2 Rank 0</td>
            <td>20%</td>
            <td>{{ parseExpertise(expertise.attack.value * 0.2) }}</td>
          </tr>
          <tr>
            <th>Weapon Knowledge</th>
            <td>Class 1 Rank 0</td>
            <td>40%</td>
            <td>
              {{ parseExpertise(expertise.weaponKnowledge.value * 0.4) }}
            </td>
          </tr>
          <tr>
            <th>Survival Techniques</th>
            <td>Class 1 Rank 0</td>
            <td>40%</td>
            <td>
              {{ parseExpertise(expertise.survivalTechniques.value * 0.4) }}
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
  name: "Retaliation",
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
        this.expertise.attack.value = 0;
        this.expertise.weaponKnowledge.value = 0;
        this.expertise.survivalTechniques.value = 0;
      } else if (to === "required") {
        this.expertise.attack.value = 2000;
        this.expertise.weaponKnowledge.value = 1000;
        this.expertise.survivalTechniques.value = 1000;
      } else if (to === "max") {
        this.expertise.attack.value = this.expertise.attack.max;
        this.expertise.weaponKnowledge.value =
          this.expertise.weaponKnowledge.max;
        this.expertise.survivalTechniques.value =
          this.expertise.survivalTechniques.max;
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
      if (
        this.expertise.attack.value >= 2000 &&
        this.expertise.weaponKnowledge.value >= 1000 &&
        this.expertise.survivalTechniques.value >= 1000
      )
        return true;
      else return false;
    },
    total() {
      let attack = this.expertise.attack.value * 0.2;
      let weaponKnowledge = this.expertise.weaponKnowledge.value * 0.4;
      let survivalTechniques = this.expertise.survivalTechniques.value * 0.4;

      return Number.parseInt(attack + weaponKnowledge + survivalTechniques);
    },
    classRank() {
      let attack = this.expertise.attack.value * 0.2;
      let weaponKnowledge = this.expertise.weaponKnowledge.value * 0.4;
      let survivalTechniques = this.expertise.survivalTechniques.value * 0.4;

      var a =
        Number.parseInt(attack + weaponKnowledge + survivalTechniques) / 100;
      var b = a.toString();
      if (
        a === 0 ||
        this.expertise.attack.value < 2000 ||
        this.expertise.weaponKnowledge.value < 1000 ||
        this.expertise.survivalTechniques.value < 1000
      ) {
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
