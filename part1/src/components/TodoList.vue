<template>
  <h1>Todo list</h1>

  <br/>
  <br/>
  <br/>
  <div>
    <form @submit.prevent="addTodo">
      <input type="text" placeholder="Nouvelle tâches" v-model="newTodo">
      <button type="submit" :disabled="newTodo.length===0">Ajouter</button>
    </form>
  </div>

  <br/>
  <div v-if="todos.length === 0">Aucune tâche</div>
  <div v-else>
    <ul>
      <li v-for="(todo, index) in sortedTodos" :key="todo.date" :class="{done: todo.completed}">
        <label>
          <input type="checkbox" v-model="todo.completed">
          {{todo.title}}
        </label>
      </li>
    </ul>
    <div>
      <label>
        <input type="checkbox" v-model="hideCompeted"> 
        Masquer les tâches completées
      </label>
    </div>
    <p v-if="remainingTodos" :style="{color: remainingTodos < 5 ? 'green': remainingTodos < 10 ? 'orange' : 'red'}">
      Il vous reste {{ remainingTodos }} to do !
    </p>
  </div>
</template>

<script setup>
  import { computed, ref }  from 'vue'

  const todos = ref([
    {
      title: "First", 
      completed: true, 
      date : Date.now() + 1
    },
    {
      title: "Second", 
      completed: false, 
      date : Date.now() + 2 
    },
    {
      title: "Third", 
      completed: false, 
      date : Date.now() + 3
    }
  ])
  const newTodo = ref('')
  const hideCompeted = ref(false)

  const addTodo = () => {
    todos.value.push({
      title: newTodo.value, 
      completed: false, 
      date : Date.now()
    })
    newTodo.value = ""
  }

  const sortedTodos = computed(() => {
    const sort = todos.value.toSorted((a, b) => a.completed - b.completed) 
    return sort.filter((todo) => !hideCompeted.value || todo.completed === false)
  })

  const remainingTodos = computed(() => {
    return todos.value.filter(todo => todo.completed === false).length
  })
</script>

<style>
.done{
  text-decoration: line-through;
}
</style>