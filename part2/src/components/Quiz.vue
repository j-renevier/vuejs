<template>
  <div>
    <h2>{{ quiz.title }}</h2>
    <Progress :value="step" :max="quiz.questions.length - 1" />
    <Question :question="question" v-if="question" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Progress from './Progress.vue';
import Question from './Question.vue';
import type { QuestionType } from './Question.vue';

type QuizType = {
  title: string;
  minimum_score: number;
  success_message: string;
  failure_message: string;
  questions: QuestionType[];
};

const props = defineProps<{ quiz: QuizType }>();

const step = ref(0);

const question = computed(() => props.quiz.questions[step.value]);
</script>



