<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BaseService from './services/BaseService';
import HelloWorld from './components/HelloWorld.vue'
import { onMounted } from 'vue';
const message = ref<string>('Hello, GaussDB!');
onMounted(() => {
  BaseService.getMsg().then((res) => {
    message.value = res.data?.message;
  });
})
</script>

<template>
  <header>
    <d-row align="middle" justify="center">
      <d-col :span="10" class="flex-center-all">
        <img
          alt="Vue logo"
          src="@/assets/sequelize.svg"
          width="100"
          height="100"
        />
      </d-col>
      <d-col :span="4" class="flex-center-all">
        <i class="icon icon-add"></i
      ></d-col>
      <d-col :span="10" class="flex-center-all">
        <img alt="Vue logo" src="@/assets/gauss.png" width="100" height="100" />
      </d-col>
    </d-row>

    <div class="wrapper">
      <HelloWorld :msg="message" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/add">Add</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  padding: 1rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    padding-left: 1rem;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

  main {
    height: 100vh;
    border-left: 1px solid var(--color-border);
  }
}
</style>
