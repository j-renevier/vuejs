<template>
  <h1>Todo list</h1>

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
      <li v-for="(todo, index) in sortedTodos()" :key="index" :class="{done: todo.completed}">
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
  </div>
</template>

<script setup>
  import { ref }  from 'vue'

  const todos = ref([
    {
      title: "First", 
      completed: false, 
      date : Date.now()
    },
    {
      title: "Second", 
      completed: true, 
      date : Date.now()
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

  const sortedTodos = () => {
    return todos.value.filter((todo) => !hideCompeted.value || todo.completed === false).toSorted((a, b)=> a.completed > b.completed ? 1 : -1)
  }

</script>

<style>
.done{
  text-decoration: line-through;
}
</style>