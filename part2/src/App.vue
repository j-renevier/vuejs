<template>
  <main>
    <div v-if="state ==='error'">
      <p>
        Impossible de charger le quiz
      </p>
    </div>
    <div :aria-busy="state === 'loading'">
      <Quiz :quiz="quiz" v-if="quiz"/>
    </div>
    
    <details>
      <summary>Question</summary>
      <pre>
        <code>
          {{ quiz }}
        </code>
      </pre>
    </details>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Quiz from './components/Quiz.vue'

const quiz = ref(null)
const state = ref('loading')

onMounted( ()=> {
  fetch('/src/assets/question/quiz.json')
    .then((res) => {
      if (res.ok){ 
        return res.json()
      }
        
      throw new Error('Questions Introuvables')
    })
    .then((data) => {
      quiz.value = data
      state.value = 'idle'
    })
    .catch((e) => {
      state.value = 'error'
    })
})
</script>

<style scoped>

</style>
