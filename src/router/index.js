import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('../components/Pages/Home.vue')
const CompanyFAQ = () => import('../components/Pages/FAQ/Company/Index.vue')
const TermOfServices = () => import('../components/Pages/FAQ/Legal/Term_Of_Services.vue')
const PrivacyPolicy = () => import('../components/Pages/FAQ/Legal/Privacy.vue')
const HowToDownload = () => import('../components/Pages/Other/how_to_download.vue')
const NotFound = () => import('../components/Pages/NotFound.vue')

const lang = localStorage.getItem('lang')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:lang('+lang+')?/',
      component: HomeView,
      meta: { type: 'all', lang: lang },
    },
    {
      path: '/:lang('+lang+')?/tiktok',
      component: HomeView,
      meta: { type: 'tiktok', lang: lang }
    },
    {
      path: '/:lang('+lang+')?/douyin',
      component: HomeView,
      meta: { type: 'douyin', lang: lang }
    },
    {
      path: '/:lang('+lang+')?/how_to_download',
      component: HowToDownload,
      meta: { type: 'how_to_download', lang: lang }
    },
    {
      path: '/:lang('+lang+')?/landing',
      children: [
        {
          path: 'contact',
          component: CompanyFAQ,
          meta: { type: 'all', lang: lang }
        },
        {
          path: 'terms-of-service',
          component: TermOfServices,
          meta: { type: 'all', lang: lang }
        },
        {
          path: 'privacy-policy',
          component: PrivacyPolicy,
          meta: { type: 'all', lang: lang }
        }
      ]
    },
    {
      path: '/:lang('+lang+')?/:pathMatch(.*)*',
      component: NotFound,
      meta: { type: 'all', lang: lang }
    }
  ]
})

export default router
