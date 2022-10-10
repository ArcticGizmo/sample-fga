<template>
  <div class="layout">
    <div class="nav-bar">
      <img class="logo" src="logo.svg" />
      <router-link v-for="route in routes" :key="route.path" :to="route.path">
        <NavItem :name="route.name" :icon="route.meta.icon" :src="route.meta.src" />
      </router-link>
    </div>

    <div class="page-wrapper">
      <div class="page">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import NavItem from './NavItem.vue';

import router from '@/router';

interface Route {
  name: string;
  path: string;
  meta: {
    icon?: string;
    src?: string;
  };
}

const routes: ComputedRef<Route[]> = computed(() => {
  return router
    .getRoutes()
    .filter(r => !r.meta.hide)
    .map(r => {
      return {
        path: r.path,
        name: r.name as string,
        meta: {
          icon: r.meta?.icon as string,
          src: r.meta?.src as string
        }
      };
    });
});
</script>

<style src>
body {
  margin: 0;
}

.layout {
  color: black;
}

.layout .nav-bar {
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 4rem;
  background-color: #202225;
  height: 100vh;
  z-index: 1000;
}

.layout .logo {
  border-bottom: 1px solid gray;
  padding: 0.5rem;
}

.layout .page-wrapper {
  margin-left: 4rem;
}

.layout .page {
  margin: 1rem;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 0.1px solid gray;
}
</style>
