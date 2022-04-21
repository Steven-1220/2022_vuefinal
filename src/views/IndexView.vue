<template>
  <Navbar />
  <div class="wrap">
    <RouterView />
  </div>

  <FooterView />
</template>

<script>
import Navbar from "@/components/NavBar.vue";
import FooterView from "@/components/FooterView.vue";

export default {
  components: {
    Navbar,
    FooterView,
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}
.wrap {
  min-height: calc(100vh - 200px);
}
footer {
  width: 100%;
}
</style>
