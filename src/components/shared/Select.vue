<template>
  <div class="select">
    <p
      class="select-title"
      @click="areOptionsVisible = !areOptionsVisible"
    >{{selected}}
    </p>
    <div
      class="options"
      v-if="areOptionsVisible"
    >
      <p
        v-for="option in options"
        :key="option.index"
        @click="selectOption(option)"
      >
        {{option.name}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    selected: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      areOptionsVisible: false
    }
  },
  computed: {},
  methods: {
    selectOption(option) {
      this.$emit('select', option)
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    }
  },
  mounted() {
    document.addEventListener('click', this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideSelect)
  }
}
</script>

<style lang="scss">
  .dark .select {
    background-color: #f3f3f3;
  }

  .select {
    position: relative;
    width: 200px;
    cursor: pointer;
  }

  .select p {
    margin: 0;
  }

  .select-title {
    border: solid 1px #ccc;
  }

  .dark .options {
    background-color: #f3f3f3;
  }

  .options {
    border: solid 1px #ccc;
    position: absolute;
    top: 30px;
    right: 0;
    width: 100%;
    z-index: 2;
  }

  .options p:hover {
    background-color: #aeae;
  }
</style>
