import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Callback from '../pages/Callback.vue'
import Playlists from '../pages/Playlists.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: Playlists
  }, 
  {
    path: '/global',
    name: 'Global',
    component: Playlists
  }, 
  {
    path: '/toptracks',
    name: 'Top TracKS',
    component: Playlists
  },
  {
    path: '/topartists',
    name: 'Top Artists',
    component: Playlists
  }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
