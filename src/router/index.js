import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomeView.vue";
import Apples from "@/views/AppleView.vue";
import Books from "@/views/BookView.vue";
import Expertise from "@/views/ExpertiseView.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/apples",
		name: "Apples",
		component: Apples,
	},
	{
		path: "/books",
		name: "Books",
		component: Books,
	},
	{
		path: "/expertise",
		name: "Expertise",
		component: Expertise,
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

export default router;