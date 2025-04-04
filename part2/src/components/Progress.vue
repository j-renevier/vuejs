<template>
  <div>
    Etape {{ value + 1 }}/{{ max  + 1 }}
    <progress :value="value" :max="max"/>
  </div>
</template>

<script setup lang="ts">
type Props = {
  value?: number, 
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 5
});
</script>