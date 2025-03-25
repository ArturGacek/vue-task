import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/Layout.vue';
import UsersView from '@/views/UsersView.vue';
import UserDetails from '@/views/UserDetails.vue';
import CountriesView from '@/views/CountriesView.vue';

const routes = [
  { path: '/', redirect: '/users' },
  { 
    path: '/users', 
    component: Layout, 
    children: [
      { path: '', component: UsersView },
      { path: ':id', component: UserDetails, props: true }
    ]
  },
  { 
    path: '/countries', 
    component: Layout, 
    children: [
      { path: '', component: CountriesView }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;