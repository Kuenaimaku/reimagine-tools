<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Share Your Build</p>
      <o-icon
        clickable
        native-type="button"
        icon="close"
        @click.="$emit('close')"/>
    </header>
    <section class="modal-card-body">
      <o-field @click="copy" label="Click to Copy to Clipboard">
        <o-input maxlength="200" type="textarea" class="is-fullwidth" style="resize:none;" disabled v-model="link"></o-input>
      </o-field>
    </section>
    <footer class="modal-card-foot">
      <o-button type="button" @click="$emit('close')">Close</o-button>
    </footer>
  </div>
</template>

<script>
import dataService from "@/services/dataService.js";
export default {
  name: "linkModal",
  props: {
    expertise: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    link() {
      let baseUrl = window.location.origin + this.$route.path;
      let params = dataService.toExpertiseQueryParams(this.expertise, this.options);
      if (params !== "") {
        return baseUrl + "?" + params.toString();
      } else {
        return baseUrl;
      }
    },
  },
  methods:{
    copy() {
      navigator.clipboard.writeText(this.link);
      this.$oruga.notification.open({
          message: 'Link copied to clipboard!',
          rootClass: 'toast-notification',
          position: 'top',
          duration: 2000
        })
    }
  }
};
</script>

<style lang="scss" scoped>
  .modal-card {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 40px);
    overflow: hidden;
  }
  @media screen and (min-width: 769px) {
    .modal-card {
      margin: 0 auto;
      max-height: calc(100vh - 40px);
      width: 50%
    }
  }
  .modal-card {
    margin: 0 20px;
    max-height: calc(100vh - 160px);
    overflow: auto;
    position: relative;
    width: 400px !important;
  }
</style>