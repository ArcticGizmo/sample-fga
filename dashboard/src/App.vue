<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script setup lang="ts">
import Layout from "@/layout/Layout.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

button {
  cursor: pointer;
  min-width: 4rem;
  height: 1.5rem;
  background-color: #3fb27f;
  color: white;
  box-shadow: none;
  border: none;
  box-shadow: 1px 1px 2px grey;
}

button:hover {
  opacity: 0.9;
}
</style>
