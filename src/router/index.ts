import { createRouter, createWebHistory } from 'vue-router';
import { checkAuth } from './guards';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { unAuthOnly: true },
    },
    {
      path: '/home',
      name: 'layout',
      component: () => import('../views/MainLayout.vue'),
      meta: { auth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/TodosView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home',
    },
  ],
});

router.beforeEach(checkAuth);

export default router;
