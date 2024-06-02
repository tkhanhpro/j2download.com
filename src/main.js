import './assets/main.css'
import { createApp } from 'vue'
import i18n from './i18n/index.js'
import App from './App.vue'
import router from './router'
import { VueHeadMixin, createHead } from '@unhead/vue'

import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App)
const head = createHead()

app.use(i18n)
app.use(router)
app.use(head)
app.mixin(VueHeadMixin)
app.use(LoadingPlugin)
app.mount('#app')