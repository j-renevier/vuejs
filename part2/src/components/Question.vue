<template>
  <div class="question">
    <h3>{{ question.question }}</h3>
    <p>{{ question.correct_answer }}</p>
  </div>
</template>

<script setup lang="ts">

export type QuestionType = {
  question: string;
  choices: string[];
  correct_answer: string;
};

defineProps<{ question: QuestionType }>();
</script>