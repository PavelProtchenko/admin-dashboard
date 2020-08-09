<template>
  <div id="app" :class="mode">
    <component :is="layout" @toggle="toggle">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </component>
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'

export default {
  name: 'App',
  data () {
    return {
      mode: 'light'
    }
  },
  components: {
    MainLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main') + '-layout'
    }
  },
  methods: {
    toggle() {
      if (this.mode === 'dark') {
        this.mode = 'light'
      } else {
        this.mode = 'dark'
      }
    }
  }
}
</script>

<style>
  @import 'assets/index.scss';
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
