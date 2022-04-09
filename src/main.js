import { createApp } from 'vue'
import App from './App.vue'

import Vue3DraggableResizable from 'vue3-draggable-resizable'
//default styles
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full.css'
import '@mdi/font/css/materialdesignicons.css'

import 'bulma/css/bulma.css'
import './assets/styles/main.scss'

import router from './router'


const vueApp = createApp(App)
	.use(router)
	.use(Oruga)
	.use(Vue3DraggableResizable)
	.mount('#app')
