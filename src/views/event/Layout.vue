<script setup>
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const event = ref(null)

const props = defineProps({
  id: {
    require: true
  }
})

onMounted(() => {
  // select data by id
  EventService.getEvent(props.id)
    .then((response) => {
      console.log('event:', response.data)
      event.value = response.data
    })
    .catch((error) => {
      if (error.response && error.response.status == 404) {
        router.push({
          name: '404Resource',
          params: { resource: 'event' }
        })
      } else {
        router.push({ name: 'NetworkError' })
      }
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'eventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'eventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'eventEdit' }">Edit</router-link>
    </div>
    <RouterView :event="event"></RouterView>
  </div>
</template>
