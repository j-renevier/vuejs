<template>
  <input type="text" v-model="firstName" placeholder="firstName"/>
  <input type="text" v-model="lastName" placeholder="lastName"/>
</template>

<script setup>
  const firstName = defineModel('firstName')
  const lastName = defineModel('lastName')
</script>
