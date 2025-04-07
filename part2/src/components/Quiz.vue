<template>
  <div>
    <h2>{{ quiz.title }}</h2>
    <Progress :value="step" :max="quiz.questions.length - 1" />
    <Question :key="question.question" :question="question" v-if="state === 'question'" @answer="addAnswers"/>
    {{ answers }}
    <Recap v-if="state === 'recap'" :answers="answers" :quiz="quiz"/>
  </div>
</template>

<script setup lang="ts">
import type { QuestionType } from './Question.vue';

import { computed, ref } from 'vue';

import Recap from './Recap.vue';
import Progress from './Progress.vue';
import Question from './Question.vue';

export type QuizType = {
  title: string;
  minimum_score: number;
  success_message: string;
  failure_message: string;
  questions: QuestionType[];
};
const props = defineProps<{ quiz: QuizType }>();
const state = ref('question');
const answers = ref<(string|null)[]>(props.quiz.questions.map(()=> null))
const step = ref(0);
const question = computed(() => props.quiz.questions[step.value]);

const addAnswers = (answer: string) => {
  answers.value[step.value] = answer

  if (step.value === props.quiz.questions.length - 1){
    state.value = 'recap'
  } else {
    step.value++
  }
}


</script>



