<template>
  <FontAwesomeIcon
    class="icon"
    :class="{ invalid: !completeIcon, hidden: !props.icon }"
    :icon="completeIcon || ['fas', 'cancel']"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';

import * as allIcons from '@/code/icons';

const ICONS = Object.values(allIcons);

const LOOKUP = ICONS.reduce((acc, icon) => {
  acc[icon.iconName] = icon;
  return acc;
}, {} as { [key: string]: IconDefinition });

// add icons
library.add(...ICONS);

const props = defineProps({
  icon: String
});

const completeIcon = computed(() => {
  if (!props.icon) {
    return;
  }

  const icon = LOOKUP[props.icon];

  if (!icon) {
    console.error(`[Icon] Cannot find icon '${props.icon}'. Has it been imported? See /code/icons.js`);
    return;
  }

  return [icon.prefix, icon.iconName];
});
</script>

<style>
svg.icon.svg-inline--fa {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.icon.invalid {
  color: red;
}

.icon.hidden {
  opacity: 0;
}
</style>
