<template>
  <ul class="toolbar">
    <li><a href="#" @click.prevent="$emit('click')" class="nav-link-right">
      <img src="../assets/logo.png" alt="logo" width="80rem">
    </a></li>
    <div class="spacer"></div>
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
    <a href="#" class="router-link">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    links: [
      { title: 'Game Answers', url: '/game_answers', exact: true },
      { title: 'Game Questions', url: '/game_questions' }
    ]
  }),

  methods: {
    // isOpen () {
    //   this.isShow = true
    // } 
  }
}
</script>

<style lang="scss">
  .dark .toolbar {
    background-color: #15202b;
    transition: background 0.5s ease-in-out;
  }

  .router-link-exact-active a {
    display: flex;
    color: #ff0000;
  }

  li {
    list-style: none;
  }

  .router-link {
    color: #fff;
    padding: .8rem .5rem .8rem .5rem;
    text-decoration: none;
  }

  .router-link:hover {
    color: #a748c3;
    cursor: pointer;
  }

.nav-logo {
  display: flex;
  padding: .8rem 0 .8rem 0;
  height: 100%;
  justify-items: flex-start;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
}

.small-space {
  padding: 0 0 0 1em
}

  .toolbar {
    position: inherit;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #1976d2;
    color: white;
    font-weight: 600;
  }

  .toolbar img {
    margin: 0 16px;
  }

  .spacer {
    flex: 1;
  }
</style>
