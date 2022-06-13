import Vue from 'vue'
import VueRouter from 'vue-router'
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getHomeRouteForLoggedInUser } from '@/auth/utils'
const appConfig = require("@/appConfig")
import { t } from '@/@core/libs/i18n/utils'

Vue.use(VueRouter)

// Router Before Each hook for route protection


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
     {//ADMINPANEL MAIN COMPONENT
      path: '/admin-panel',
      name: 'admin-panel',
      component: () => import('@/views/adminpanel/AdminPanel.vue'),
      meta: {
        pageTitle: 'Admin Panel',
        breadcrumb: [
          {
            text: 'Admin Panel',
            active: true,
          },
        ],
      },
    },
       {//ADMINPANEL MAIN COMPONENT
        path: '/working-plan',
        name: 'working-plan',
        component: () => import('@/views/adminpanel/AdminPanel.vue'),
        meta: {
          pageTitle: 'Working Plan',
          breadcrumb: [
            {
              text: 'Working Plan',
              active: true,
            },
          ],
        },
      },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'not-authorized',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
if(appConfig["forceAuth"]){
router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  if(to.path!=="/login"&&!isLoggedIn){
  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    // ! We updated login route name here from `auth-login` to `login` in starter-kit
    if (!isLoggedIn) return next({ name: 'login' })

    // If logged in => not authorized
    return next({ name: 'not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    next({name:'home'})
  }

}
  return next()
})
}
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
