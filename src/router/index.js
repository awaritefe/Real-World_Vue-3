import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'
import NotFoundComponent from '../views/NotFoundComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'eventList',
      component: EventList,
      props: (route) => ({ page: parseInt(route.query.page) || 1 })
    },
    {
      path: '/event/:id',
      name: 'eventDetails',
      props: true,
      component: EventDetails
    },
    {
      path: '/event/:id/register',
      name: 'eventRegister',
      props: true,
      component: EventRegister
    },
    {
      path: '/event/:id/edit',
      name: 'eventEdit',
      props: true,
      component: EventEdit
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundComponent
    }
  ]
})

export default router
