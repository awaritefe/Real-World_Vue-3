<script setup>
import { onMounted, ref, computed, watchEffect } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps(['page'])

const events = ref('')
const totalEvents = ref(0)

const page = computed(() => props.page)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(2, page.value)
      .then((response) => {
        console.log('events:', response.data)
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        router.push({ name: 'NetworkError' })
      })
  })
})
</script>

<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>

  <div class="pagination">
    <Router-link
      id="page-prev"
      :to="{ name: 'eventList', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
    >
      &#60; Prev page
    </Router-link>
    <Router-link
      id="page-next"
      :to="{ name: 'eventList', query: { page: page + 1 } }"
      rel="next"
      v-if="hasNextPage"
    >
      Next page &#62;
    </Router-link>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
  margin: auto;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
