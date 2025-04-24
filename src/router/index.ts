import { createRouter, createWebHistory } from 'vue-router';

import { useAuthUserStore } from '@/store/useAuthUserStore';

import Layout from '@/components/Layout.vue';
import UsersView from '@/views/UsersView.vue';
import UserDetails from '@/views/UserDetails.vue';
import CountriesView from '@/views/CountriesView.vue';
import HomePage from '@/views/HomePage.vue';
import ErrorView from '@/views/ErrorView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/users',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: UsersView },
      { path: ':id', component: UserDetails, props: true },
    ],
  },
  {
    path: '/countries',
    component: Layout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [{ path: '', component: CountriesView }],
  },
  {
    path: '/error',
    name: 'Error',
    meta: { requiresAuth: true },
    component: ErrorView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const auth = useAuthUserStore();

  if (!auth.user) {
    auth.restoreUserFromStorage();
  }

  const isAuthenticated = !!auth.isAuthenticated;
  const isAdmin = auth.user?.isAdmin;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ path: '/' });
  }

  if (to.meta.requiresAdmin && !isAdmin) {
    return next({ path: '/users' });
  }

  next();
});

export default router;
