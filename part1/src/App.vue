<template>
  <h1>Mon titre</h1>
  <p v-bind:class="`p-${maVar}`">Voici la valeur de maVar : {{ maVar }}</p>
  <p v-bind:class="`p-${count}`">Voici la valeur de count : {{ count }}</p>
  <div>
    <button v-on:click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
  <!-- Si count.value est négatif alors on affiche le message Invalid sinon le message valide Si count.value est positif alors on affiche le message Valid  -->
  <p v-show="count < 0">Invalide</p>
  <p v-show="count >= 0">Valide</p>

  <!-- Si count.value est négatif alors on ajoute le message Invalide sinon le message valide --> 
  <p v-if="count < 0" :style="`color: red`">Invalide</p> 
  <p v-else :style="{color: count > 5 ? 'green' : 'lightgreen'}">Valide</p>

  <!-- Si count.value est null la class est ajouté --> 
  <p :class="{isNull: count === 0 }">Null</p>

  <br>
  <form @submit="addElement">
    <input type="text" placeholder="Nom" v-model="element.name"/>
    <input type="text" placeholder="Description" v-model="element.description"/>
    <button type="submit">Ajouter</button>
  </form>

  <br>
  <ul>
    <li v-for="(element, index) in elements" :key="index">
      {{ index + 1 }}. {{ element.name }} - {{ element.description }}
      <br> 
      <button @click=deleteElement(element)>Supprimer</button>
    </li>
  </ul>

  <br>

  <button @click=sortElement()>Trier</button>
</template>

<script setup>
  import { ref }  from 'vue'
  const maVar = 5;

  const count = ref(0);
  
  const increment = (event) => {
    count.value ++ 
  }
  
  const decrement = () => {
    count.value --
  }

  const inject = `<span>${count.value}</span>`;

  const element = ref({
    name: "",
    description: ""
  })

  const elements = ref([
    {
      name: 'First', 
      description: 'Description'
    },
    {
      name: 'Second', 
      description: 'Description'
    },
    {
      name: 'Third', 
      description: 'Description'
    }
  ])

  const addElement = (event) => {
    event.preventDefault()
    elements.value.push({...element.value})
    element.value.name = ''
    element.value.description = ''
  }

  const sortElement = (event) => {
    elements.value.sort((a,b) => a.name > b.name ? 1 : -1)
  }

  const deleteElement = (element2Remove) => {
    elements.value = elements.value.filter(element => element2Remove.name !== element.name)
  }
</script>

<style>
body {
  background: rgb(24, 24, 24);
}
h1 {
  color: white;
}

.isNull{
  background: brown;
}
</style>

