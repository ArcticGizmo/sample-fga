<template>
  <div class="tuples-page">
    <CheckRelationship />

    <FindRelationShips />
  </div>
</template>

<script setup lang="ts">
import CheckRelationship from '@/components/CheckRelationship.vue';
import FindRelationShips from '@/components/FindRelationships.vue';
</script>

<style scoped>
div > * {
  margin-bottom: 1rem;
}
</style>
