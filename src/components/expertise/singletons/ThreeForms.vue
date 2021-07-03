<template>
  <chain-expertise
    :expertise="this.expertise"
    :options="this.options"
    :visible="isVisible"
    :classRank="classRank"
    @setValues="setValues"
    name="Mastery of the Three Forms of Life"
  >
    <template v-slot:content>
      <p>
        <span class="option-title">Requirement to Unlock</span>: Level 98+, Act
        XX Clear, Complete various quests.
      </p>
      <p>1-0 Skill is unlocked by clearing Act XX.</p>
      <p>
        1-2 Skill is unlocked by completing the Mastery of Three Forms of Life
        (1) quest from Saint Germain
      </p>
      <p>
        1-4 Skill is unlocked by completing the Mastery of Three Forms of Life
        (2) quest from Saint Germain
      </p>
      <p>
        1-6 Skill is unlocked by completing the Mastery of Three Forms of Life
        (3) quest from the Slime in Home 2's Residential Area
      </p>
      <p>All three quests have a Level 98+ requirement.</p>
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
            <th>Weapon Knowledge</th>
            <td>Class 0 Rank 0</td>
            <td>20%</td>
            <td>{{ parseExpertise(expertise.weaponKnowledge.value * 0.2) }}</td>
          </tr>
          <tr>
            <th>Gun Knowledge</th>
            <td>Class 0 Rank 0</td>
            <td>20%</td>
            <td>
              {{ parseExpertise(expertise.gunKnowledge.value * 0.2) }}
            </td>
          </tr>
          <tr>
            <th>Magic Control</th>
            <td>Class 0 Rank 0</td>
            <td>20%</td>
            <td>{{ parseExpertise(expertise.magicControl.value * 0.2) }}</td>
          </tr>
          <tr>
            <th>Bless</th>
            <td>Class 0 Rank 0</td>
            <td>20%</td>
            <td>
              {{ parseExpertise(expertise.bless.value * 0.2) }}
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
  name: "MasteryOfTheThreeFormsOfLife",
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
        this.options.level.value = 1;
      } else if (to === "required") {
        this.options.level.value = 98;
      } else if (to === "max") {
        this.options.level.value = 99;
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
      if (this.options.level.value >= 98) return true;
      else return false;
    },
    total() {
      let weaponKnowledge = this.expertise.weaponKnowledge.value * 0.2;
      let gunKnowledge = this.expertise.gunKnowledge.value * 0.2;
      let magicControl = this.expertise.magicControl.value * 0.2;
      let bless = this.expertise.bless.value * 0.2;

      return Number.parseInt(
        Math.min(weaponKnowledge + gunKnowledge + magicControl + bless, 6600)
      );
    },
    classRank() {
      let weaponKnowledge = this.expertise.weaponKnowledge.value * 0.2;
      let gunKnowledge = this.expertise.gunKnowledge.value * 0.2;
      let magicControl = this.expertise.magicControl.value * 0.2;
      let bless = this.expertise.bless.value * 0.2;

      var a =
        Number.parseInt(
          Math.min(weaponKnowledge + gunKnowledge + magicControl + bless, 6600)
        ) / 100;
      var b = a.toString();
      if (a === 0 || this.options.level.value < 98) {
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
