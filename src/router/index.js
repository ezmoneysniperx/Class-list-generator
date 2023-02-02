import Vue from "vue";
import VueRouter from "vue-router";

import ImportExcel from "../components/ImportExcel.vue";
import Home from "../components/HomePage.vue";
import DownloadStudentCard from "../components/DownloadStudentCard.vue";
import DownloadFile from "../components/DownloadFile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/importexcel",
    name: "Import Excel",
    component: ImportExcel,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/examcard",
    name: "Exam Card",
    component: DownloadStudentCard,
  },
  {
    path: "/filedownload",
    name: "Class Data",
    component: DownloadFile,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
