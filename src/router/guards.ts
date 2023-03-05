import type { NavigationGuard, RouteLocationRaw, RouteLocation } from 'vue-router';
import { useAuthStore } from '../app/store/authStore';

export function inheritedMeta(to: RouteLocation): any {
  return to.matched.reduce((meta, item) => Object.assign(meta, item.meta), {});
}

/**
 * Authentication Guard
 *
 * Checks if route requires authentication or not and redirects to default route
 */
export const checkAuth: NavigationGuard = (to, from, next: (to?: RouteLocationRaw) => void) => {
  const authModule = useAuthStore();
  const inherited = inheritedMeta(to);
  if (inherited.auth) {
    if (!authModule.loggedIn) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else if (inherited.unAuthOnly) {
    next(authModule.loggedIn ? '/home' : undefined);
  } else {
    next();
  }
};
