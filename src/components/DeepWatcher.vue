<template>
    <div>
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

        <!-- <button @click="people.total = 999">
        Update 1
      </button> -->

      <!-- <button @click="people.children[1].name = 'Ņew name!!'">
        Update 2
      </button> -->

        <!-- <button @click="people.children.push({ uuid: 3, name: 'New Child', age: 10 })">
            Add New Child
        </button> -->

        <div>
            <pre>{{ people }}</pre>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, toRaw } from 'vue'
  import { useDeepWatcher } from '../composables/useDeepWatcher'
  
  const people = ref([
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

//   const people = ref({
//     total: 2,
//     children: [
//         { uuid: 1, name: 'Morty' },
//         { uuid: 2, name: 'Marty' },
//     ],
//   })
  
  const { oldValue, newValue, change } = useDeepWatcher(people)
  
  watch(change, _change => {
    console.log('Change detected:', JSON.stringify(toRaw(_change), null, 2))
  })

  watch(newValue, _newValue => {
    console.log('OldValue:', JSON.stringify(toRaw(oldValue.value), null, 2))
    console.log('NewValue:', JSON.stringify(toRaw(_newValue), null, 2))
  })
  </script>
  