import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Content from '../views/Content'
Vue.use(VueRouter)
const routes = [
  { path: '/login', component: Login },
  { path: '/content', component: Content }
]

const router = new VueRouter({
  routes
})

export default router
