<template>
  <div class="toggle-wrapper">
    <span class="label-mode">Dark/Light</span>
    <label class="toggle">
      <input
        type="checkbox"
        :checked="(mode === 'dark') ? 'checked' : false"
        @change="$emit('toggle')"
      />
      <span class="toggler round"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: ['mode']
}
</script>

<style lang="scss">
  .toggle {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 24px;
  }

  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggler {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #15202b;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .toggler:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 17px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .toggler {
    background-color: #2196f3;
  }

  input:focus + .toggler {
    box-shadow: 0 0 2px #2196f3;
  }

  input:checked + .toggler:before {
    -webkit-transform: translateX(21px);
    -ms-transform: translateX(21px);
    transform: translateX(21px);
  }

  .toggler.round {
    border-radius: 34px;
  }

  .toggler.round:before {
    border-radius: 50%;
  }

  .dark .label-mode {
    color: #f3f3f3;
    transition: color 0.5s ease-in-out;
  }

  .label-mode {
    padding: 0 2% 0 0;
  }
</style>
