<template>
  <div class="nav-item">
    <img v-if="src" :src="src" />

    <Icon v-else :icon="icon" />

    <span class="nav-bar-tooltip"> {{ name }} </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  name: String,
  src: String
});
</script>

<style>
.nav-item {
  position: relative;
  display: flex;
  justify-content: center;
}

.nav-item .icon {
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #3fb27f;
  background-color: #2f3136;
  border-radius: 2rem;
  transition: all 0.3s;
}

.router-link-active .nav-item .icon,
.nav-item:hover .icon {
  color: white;
  border-radius: 0.75rem;
  background-color: #3fb27f;
}

.nav-item .nav-bar-tooltip {
  font-size: 0.9rem;
  font-weight: bold;
  position: absolute;
  left: 4.5rem;
  top: 1.25rem;
  padding: 0.5rem;
  color: white;
  background-color: #202225;
  border-radius: 0.75rem;
  transform: scale(0);
  transform-origin: left;
  transition: transform 0.15s;
  white-space: nowrap;
}

.nav-item:hover .nav-bar-tooltip {
  transform: scale(1);
}

.nav-item img {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
}

.nav-item img:hover {
  opacity: 0.5;
}
</style>
