<template>
    <div>
        <p>
            <h1>
                <b>My Version</b>
            </h1>
        </p>

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
    </div>
  </template>  
  
  <script setup lang="ts">
  import cloneDeep from 'lodash/cloneDeep'
  import { ref, watch, computed } from 'vue'
  
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
  
  const _people = computed(() => cloneDeep(people.value))
  
  function detectChanges(newObj: any, oldObj: any, path: string) {
    if (newObj === undefined || oldObj === undefined) {
        return
    }

    if (typeof newObj !== 'object' || newObj === null) {
        if (newObj !== oldObj) {
            console.log(`${path} has changed from ${oldObj} to ${newObj}`)
        }
        return
    }

    if (Array.isArray(newObj) && Array.isArray(oldObj)) {
        if (newObj.length !== oldObj.length) {
            console.log(`${path} length has changed from ${oldObj.length} to ${newObj.length}`)
        }

        // Recursively compare array elements
        newObj.forEach((item, index) => {
            const newKeyPath = `${path}[${index}]`
            detectChanges(item, oldObj[index], newKeyPath)
        })
        return
    }

    const allKeys = new Set([...Object.keys(newObj), ...Object.keys(oldObj)])
    allKeys.forEach(key => {
        const newKeyPath = `${path}.${key}`
        detectChanges(newObj[key], oldObj[key], newKeyPath)
    })
}

  
  watch(_people, (newPeople, oldPeople) => {
      newPeople.forEach((newPerson, index) => {
          const oldPerson = oldPeople ? oldPeople[index] : undefined
          if (oldPerson) {
              detectChanges(newPerson, oldPerson, `person[${index}]`)
          }
      })
  }, { immediate: true })
  </script>
  