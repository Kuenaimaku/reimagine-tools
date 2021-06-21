import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomeView.vue";
import Apples from "@/views/AppleView.vue";
import Books from "@/views/BookView.vue";
import Expertise from "@/views/ExpertiseView.vue";

const DEFAULT_TITLE = 'ReIMAGINE Tools';
const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: { title: DEFAULT_TITLE }
	},
	{
		path: "/apples",
		name: "Apples",
		component: Apples,
		meta: { title: "Golden Apple Calculator" }
	},
	{
		path: "/books",
		name: "Books",
		component: Books,
		meta: { title: "Expertise Textbook Calculator" }
	},
	{
		path: "/expertise",
		name: "Expertise",
		component: Expertise,
		meta: { title: "Expertise Calculator" }
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				el: to.hash,
				behavior: 'smooth',
			}
		}
	},
});

router.afterEach((to, from) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
        document.title = to.meta.title(to) || DEFAULT_TITLE;
    });
});

export default router;