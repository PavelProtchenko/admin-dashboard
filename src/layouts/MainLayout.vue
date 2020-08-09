<template>
  <div>
    <Navbar />
    <div class="main-container">
      <div class="container">
        <ToggleMode :mode="mode" @toggle="$emit('toggle')" />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import ToggleMode from '@/components/shared/ToggleMode'


export default {
  name: 'MainLayout',
  components: {
    Navbar,
    ToggleMode
  },
  props: ['mode'],
  data() {
    return {}
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {}
}
</script>

<style lang="scss">
  .dark .main-container {
    background-color: #192734;
    transition: background 0.5s ease-in-out;
  }

  .dark .container {
    background-color: #000;
    transition: background 0.5s ease-in-out;
    // color: #f3f3f3;
  }

  .main-container {
    height: 100%;
    margin: 0;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-color: #f5f5f5;
  }

  .container {
    background-color: #fff;
    margin: 0 auto;
    width: 80%;
    height: 85vh;
    padding: 0 2% 0 2%;
    overflow: auto;
  }
</style>
