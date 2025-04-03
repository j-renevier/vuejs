<template>
  <div @mouseover="handleHover">
    <h2>{{ title }}</h2>
    <p>{{ value }}</p>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref }  from 'vue'

  const props = defineProps({
    title: String,
    value: Number
  })

  const emits = defineEmits([['valid', 'unvalid']])

  const handleHover = (event) => {
    if(props.value % 2 === 0){
      emits('valid', event)
    } else {
      emits('unvalid', event)
    }
  }
</script>

<style>

</style>