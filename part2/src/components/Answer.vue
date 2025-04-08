<template>
  <label :for="id" :class="classes">
    <input :disabled="disabled" type="radio" name="answer" :id="id" v-model="model" :value="value" @change="onChange">
    {{ value }}
  </label>
</template>
 
<script setup lang="ts">
import { computed } from 'vue';


export type AnswerPropsType = {
  id: string;
  disabled: boolean;
  value: string;
  correctAnswer: string;
};

const props = defineProps<AnswerPropsType>();

const emits = defineEmits(['change'])

const onChange = (event: Event) => {
  emits('change', event)
} 

const model = defineModel()
const classes = computed(()=> ({
  disabled : props.disabled, 
  right: props.disabled && props.value === props.correctAnswer,
  wrong: props.disabled && props.value !== props.correctAnswer && model.value === props.value
}))
</script>

<style>
.disabled {
  opacity: 0.5;
}
.right {
  color: green;
  opacity: 1;
  font-weight: bold;
}
.wrong {
  color: red;
  opacity: 1;
}
</style>