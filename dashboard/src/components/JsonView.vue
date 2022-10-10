<template>
  <div class="json-view">
    <pre>{{ JSON.stringify(value, undefined, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: { type: Object, required: true }
});
</script>
