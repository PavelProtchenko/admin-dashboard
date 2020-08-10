<template>
  <div>
    <Navbar />
    <div class="main-container">
      <div class="container">
        <ToggleMode :mode="mode" @toggle="$emit('toggle')" />
        <router-view />
      </div>
      <!-- <button class="sidebar-btn">Sidebar</button> -->
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
  .dark body, html {
    background-color: #192734;
  }

  .dark .main-container {
    background-color: #192734;
    transition: background 0.5s ease-in-out;
  }

  .dark .container {
    background-color: #2c3d63;
    transition: background 0.5s ease-in-out;
  }

  .main-container {
    height: 93vh;
    margin: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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

  // Sidebar btn
  .sidebar-btn {
    font-weight: bold;
    border: 0;
    border-radius: 50%;
    padding: 20px 5px 20px 5px;
    color: #fff;
    background-color: #008000;
    outline: 0;
    margin: 0 auto;
    position: sticky;
    z-index: 10;
  }

  .sidebar-btn:hover {
    cursor: pointer;
  }

  .sidebar-btn:active {
    cursor: pointer;
    background-color: #3399ff;
    box-shadow: #008000 0 0 .5rem;
  }

  .hide-sidebar-btn {
    visibility: hidden;
  }

  .show-sidebar-btn {
    visibility: visible;
  }
</style>
