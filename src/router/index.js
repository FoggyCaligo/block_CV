import { createRouter, createWebHistory } from "vue-router";
import BlocksPage from "../pages/BlocksPage.vue";
import ComposerPage from "../pages/ComposerPage.vue";
import ResumesPage from "../pages/ResumesPage.vue";

const routes = [
  { path: "/", redirect: "/blocks" },
  { path: "/blocks", component: BlocksPage },
  { path: "/composer", component: ComposerPage },
  { path: "/resumes", component: ResumesPage }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
