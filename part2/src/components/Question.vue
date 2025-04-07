<template>
  <div class="question">
    <h3>{{ question.question }}</h3>
    <ul>
      <li v-for="(choice, index) in randomChoices" :key="choice">
        <Answer :id="`answere${index}`" :disabled="hasAnswer" :value="choice" v-model="answer" :correctAnswer="question.correct_answer"/>
      </li>
    </ul>


    <p>{{ question.correct_answer }}</p>
  </div>
</template>

<script setup lang="ts">
import { shuffleArray } from '@/functions/array';
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import Answer from './Answer.vue';

export type QuestionType = {
  question: string;
  choices: string[];
  correct_answer: string;
};

const props = defineProps<{ question: QuestionType }>();

const emits = defineEmits(['answer'])
const answer = ref(null)
const hasAnswer = computed(() => answer.value !== null)

watch(() => props.question.question , ()=> {
  answer.value = null
})

const randomChoices = computed(() => shuffleArray(props.question.choices))

let timer : ReturnType<typeof setTimeout>;
onMounted(()=>{
  timer = setTimeout(()=>{
    emits('answer', answer.value)
  }, 3000)
})

onUnmounted(()=>{
  clearTimeout(timer)
})

</script>

<style>
.question{
  padding-top: 2rem;
}

.question button {
  margin-left: auto;
  display: block;
}
</style>