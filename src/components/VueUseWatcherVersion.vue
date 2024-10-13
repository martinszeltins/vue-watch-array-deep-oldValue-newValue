<template>
    <h1>
        <b>VueUse Version (does not work)</b>
    </h1>

    <h2>People List</h2>
      
      <ul>
        <li v-for="(person, index) in people" :key="person.id">
          <strong>Person {{ index }}:</strong>
          <div>Name: {{ person.name }}</div>
          <div>Comment: {{ person.comment }}</div>
          <div>Address:</div>
          <ul>
            <li>Street Name: {{ person.address.street.name }}</li>
            <li>Street Number: {{ person.address.street.number }}</li>
          </ul>
          <div>Family:</div>
          <ul>
            <li>Father: {{ person.family.father.name }}, Age: {{ person.family.father.age }}</li>
            <li>Children:</li>
            <ul>
              <li v-for="(child, childIndex) in person.family.father.children" :key="childIndex">
                Child {{ childIndex }} - Name: {{ child.name }}, Age: {{ child.age }}
              </li>
            </ul>
          </ul>
        </li>
      </ul>

    <button @click="people[0].address.street.number = 124">
        Update John's Address
      </button>
  
      <button @click="people[0].family.father.children[0].name = 'John Doe'">
        Update John's Child's Name
      </button>
  
      <button @click="people[1].address.street.number = 991">
        Update John's Address
      </button>
  
      <button @click="people[1].family.father.children[0].name = 'Whooooaaahhh!!'">
        Update John's Child's Name
      </button>

      <!-- Add new child for people[1] of father -->
        <button @click="people[1].family.father.children.push({ name: 'New Child', age: 10 })">
            Add New Child
        </button>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { watchArray, watchDeep } from '@vueuse/core'
  
  interface Address {
      street: {
          name: string
          number: number
      }
  }
  
  interface Child {
      name: string
      age: number
  }
  
  interface Father {
      name: string
      age: number
      children: Child[]
  }
  
  interface Family {
      father: Father
  }
  
  interface Person {
      id: number
      name: string
      comment: string
      address: Address
      family: Family
  }
  
  const people = ref<Person[]>([
      {
          id: 1,
          name: 'John',
          comment: 'Hello',
          address: {
              street: {
                  name: 'Main',
                  number: 123
              }
          },
          family: {
              father: {
                  name: 'John Sr',
                  age: 50,
                  children: [
                      {
                          name: 'John Jr',
                          age: 30
                      }
                  ]
              }
          }
      },
      {
          id: 2,
          name: 'Jimmy',
          comment: 'Jackson',
          address: {
              street: {
                  name: 'Urban',
                  number: 567
              }
          },
          family: {
              father: {
                  name: 'Joey',
                  age: 50,
                  children: [
                      {
                          name: 'Joey Jr',
                          age: 30
                      }
                  ]
              }
          }
      }
  ])

  watchDeep(people, (newPeople, oldPeople) => {
  console.log(newPeople)
  console.log(oldPeople)
})
</script>
