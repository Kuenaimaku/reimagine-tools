import { createApp } from 'vue'
import App from './App.vue'

import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full.css'
import '@mdi/font/css/materialdesignicons.css'

import 'bulma/css/bulma.css'
import './assets/styles/main.scss'

import router from './router'


createApp(App)
	.use(router)
	.use(Oruga)
	.mount('#app')
