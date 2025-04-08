<template>
  <div @mouseover="handleHover" :class="{container: true, darkMode: darkMode}">
    <h2>Dark Mode child</h2>
    <p>
      {{ darkMode ? 'Passer un mode clair' : 'Passer un mode sombre' }}
    </p>
    <button @click="toggleDarkMode">Toggle dark mode</button>
  </div>
</template>

<script setup>
import { inject }  from 'vue'

const { darkMode, toggleDarkMode} = inject('darkMode')


</script>

<style>
.container{
  background: rgb(230, 230, 230);
  color: rgb(0, 0, 0);
}
.darkMode{
  color: white;
  background: rgb(27, 27, 27);
}
</style>