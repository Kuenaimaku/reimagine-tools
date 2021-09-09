<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
    };
  },
}
</script>

<style>
</style>
