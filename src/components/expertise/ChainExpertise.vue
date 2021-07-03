<template>
  <div id="chain-expertise">
    <div class="card" v-if="visible">
      <div class="card-header toggle-header" @click.prevent="toggle">
        <p class="card-header-title">
          <span class="option-title">{{ name }}</span>
          - {{ classRank }}
        </p>
				<a class="card-header-icon" aria-label="expand">
					<span class="icon">
						<o-icon pack="mdi" class="icon has-text-white" :icon="expanded ? 'chevron-down' : 'chevron-up'"/>
					</span>
				</a>
      </div>
      <div class="card-content" v-if="expanded">
        <div>
          <slot v-if="$slots.content" name="content" />
        </div>
      </div>
      <footer class="card-footer"  v-if="expanded">
        <a href="#" class="card-footer-item" @click.prevent="setValues('zero')"
          >Set to Zero</a
        >
        <a
          href="#"
          class="card-footer-item"
          @click.prevent="setValues('required')"
          >Set to Required</a
        >
        <a href="#" class="card-footer-item" @click.prevent="setValues('max')"
          >Set to Max</a
        >
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChainExpertise",
  props: {
    expertise: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
    },
    classRank: {
      type: String,
    },
  },
	data() {
    return {
      hideLocked: false,
			expanded:false,
    };
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
      this.$emit("setValues", to);
    },
		toggle(){
			this.expanded = !this.expanded;
		}
  },
  computed: {},
};
</script>

<style lang="scss">

.toggle-header{
	cursor: pointer;
}

#chain-expertise{
  margin: 0.25em auto;
}

.is-label {
  margin-right: 1rem;
}

.option-title {
  font-weight: bold;
  font-size: 1.1em;
}

.collapse.card {
  margin: 1em auto;
}
</style>
