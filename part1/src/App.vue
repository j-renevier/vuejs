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
  <form @submit.prevent="addElementRef">
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
  <br>
  <br>

  <TodoList />

  <br>

  <ChildComponent title="Child Component" :value="count" class="childComponent" @click="increment" @valid="toggleValid" @unvalid="toggleValid"/>
  <br>
  {{ valid }}

  <br>
  
  <ChildComponent2 v-model:first-name="user.firstName" v-model:last-name="user.lastName"/>
  <button @click="reset()">Reset</button>

  <br>

  <ChildComponent3>
    <template v-slot:header>
      En tête
    </template>
    <template v-slot:aside>
      Sidebar
    </template>
    <template v-slot:main>
      Main
    </template>
    <template v-slot:footer>
      Footer
    </template>
  </ChildComponent3>

  <br>
  <input type="text" v-model="page.title">
  <br>

  <p>Temps écoulé : {{ time }}</p>  
  <button @click="resetTime()">Reset</button>

  <br>
  <p>Nom : {{ state.user.name }}</p>
  <button @click="changeName">changeName</button>

  <br>

  <Transition>
    <p v-if="count % 2 === 0">Paire</p> 
  </Transition>

  <Transition name="odd-fade">
    <p v-if="count % 2 === 0">Paire</p> 
  </Transition>

  <FadeTransition>
    <p v-if="count % 2 === 0">Paire</p> 
  </FadeTransition>

  <br>

  <TransitionGroup name="list" tag="ul">
    <li v-for="(element, index) in elements" :key="element.name ">
      {{ index + 1 }}. {{ element.name }} - {{ element.description }}
      <button @click=deleteElement(element)>Supprimer</button>
    </li>
  </TransitionGroup>

  <br>
  <button @click="randomize">Reorder</button>
  <br>

  <DarkMode>
    <DarkModeChild />
  </DarkMode>

  <br>

  <ul>
    <template v-for="(element, index) in elements">
      <li v-if="index % 2 === 0">
        {{ element.name }}
      </li>
    </template>
  </ul>

  <br>

  <component :is="componentToShow" />
  
  <br>
  
</template>

<script setup>
  import { computed, ref, watch, watchEffect, shallowRef, reactive, inject, provide}  from 'vue'
  
  import TodoList from './components/TodoList.vue';
  import ChildComponent from './components/ChildComponent.vue';
  import ChildComponent2 from './components/ChildComponent2.vue';
  import ChildComponent3 from './components/ChildComponent3.vue';
  import FadeTransition from './components/FadeTransition.vue';
  import DarkModeChild from './components/DarkModeChild.vue';
  import useTimer from './composable/useTimer.ts'; 
  import DarkMode from './components/DarkMode.vue';
  import IconTooling from './components/icons/IconTooling.vue'
  import IconSupport from './components/icons/IconSupport.vue'


  const maVar = 5;

  const count = ref(0);
  const description = ref('test');

  const valid = ref(0)
  
  const increment = (event) => {
    count.value ++ 
  }
  
  const decrement = () => {
    count.value --
  }

  const toggleValid = (event) => {
    console.log(event)
    valid.value = !valid.value
  }

  const injected = `<span>${count.value}</span>`;


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

  const element = ref({
    name: "",
    description: ""
  })

  const addElementRef = (event) => {
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

  const user = ref({
    firstName: "test",
    lastName: "test"
  })
  
  const reset = () => {
    user.value.firstName = ""
    user.value.lastName  = ""
  }

  const page = ref({
    title: ''
  })

  watch(() => page.value.title , (newValue, oldValue) => {
    document.title = newValue
  })

  watchEffect(() => {
    document.title = page.value.title
  })

  const { time, reset: resetTime } = useTimer()

  const state = reactive({
    user: {
      name: 'Alice',
      age: 25
    }
  })

  const changeName = () =>{
    state.user.name = 'newName'
  }

  const shuffleArray = (array) =>{
    return array
      .map((item) => ({value: item, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map((item) => item.value)
  }

  const randomize = () => {
    elements.value = shuffleArray(elements.value)
  }

  const componentToShow = computed(() => {
    if (count.value % 2 === 0 ){
      return IconSupport
    } else {
      return IconTooling
    }
  })

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

.childComponent{
  background : rgb(0, 0, 104);
}

.v-enter-active,
.v-leave-active,
.odd-fade-enter-active,
.odd-fade-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to,
.odd-fade-enter-from,
.odd-fade-leave-to {
  opacity: 0;
}


.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-active {
  position: absolute;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: all 0.5s ease;
}

</style>

