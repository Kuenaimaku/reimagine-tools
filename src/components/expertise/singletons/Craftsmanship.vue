<template>
  <chain-expertise
    :expertise="this.expertise"
    :options="this.options"
    :visible="isVisible"
    :classRank="classRank"
    @setValues="setValues"
    name="Craftsmanship"
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
            <th>Creation</th>
            <td>Class 1 Rank 0</td>
            <td>60%</td>
            <td>{{ parseExpertise(expertise.creation.value * 0.6) }}</td>
          </tr>
          <tr>
            <th>Medical Sciences</th>
            <td>Class 2 Rank 0</td>
            <td>20%</td>
            <td>
              {{ parseExpertise(expertise.medicalSciences.value * 0.2) }}
            </td>
          </tr>
          <tr>
            <th>Sketching</th>
            <td>Class 0 Rank 0</td>
            <td>20%</td>
            <td>{{ parseExpertise(expertise.sketching.value * 0.2) }}</td>
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
  name: "Craftsmanship",
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
        this.expertise.creation.value = 0;
        this.expertise.medicalSciences.value = 0;
        this.expertise.sketching.value = 0;
      } else if (to === "required") {
        this.expertise.creation.value = 1000;
        this.expertise.medicalSciences.value = 2000;
      } else if (to === "max") {
        this.expertise.creation.value = this.expertise.creation.max;
        this.expertise.medicalSciences.value =
          this.expertise.medicalSciences.max;
        this.expertise.sketching.value = this.expertise.sketching.max;
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
        this.expertise.creation.value >= 1000 &&
        this.expertise.medicalSciences.value >= 2000
      )
        return true;
      else return false;
    },
    total() {
      let creation = this.expertise.creation.value * 0.6;
      let medicalSciences = this.expertise.medicalSciences.value * 0.2;
      let sketching = this.expertise.sketching.value * 0.2;

      return Number.parseInt(creation + medicalSciences + sketching);
    },
    classRank() {
      let creation = this.expertise.creation.value * 0.6;
      let medicalSciences = this.expertise.medicalSciences.value * 0.2;
      let sketching = this.expertise.sketching.value * 0.2;

      var a = Number.parseInt(creation + medicalSciences + sketching) / 100;
      var b = a.toString();
      if (
        a === 0 ||
        this.expertise.creation.value < 1000 ||
        this.expertise.medicalSciences.value < 2000
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
