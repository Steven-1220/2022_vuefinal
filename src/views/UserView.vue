<template>
  <Navbar></Navbar>

  <router-view></router-view>
  <!-- <FooterView></FooterView> -->
</template>

<script>
import Navbar from "@/components/NavBar.vue";
// import FooterView from "@/components/FooterView.vue";
export default {
  components: {
    Navbar,
    // FooterView,
  },
};
</script>
