<template>
  <h1>Recap</h1>
  <p>
    {{ hasWon ? props.quiz.success_message : props.quiz.failure_message }}
  </p>
  <p>
    Score : {{ score}} / {{ quiz.questions.length}}
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { QuizType } from './Quiz.vue';

export type RecapPropsType = {
  answers: (string | null)[];
  quiz: QuizType;
};

const props = defineProps<RecapPropsType>();
const score = computed(() => {
  return props.quiz.questions.reduce((acc, question, k) => {
    if (question.correct_answer  === props.answers[k]) {
      return acc + 1 
    } else {
      return acc
    }
  }, 0)
})

const hasWon = computed(() => score.value >= props.quiz.minimum_score)

</script>

<style>

</style>
