import { createRouter, createWebHistory } from "vue-router";
import CharactersList from "../views/CharactersList.vue";
import FavouritesList from "../views/FavouritesList.vue";
import CharacterDetails from "../views/CharacterDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: CharactersList,
      props: (route) => ({
        page: parseInt(route.query.page) || 1,
        name: route.query.name || undefined,
        species: route.query.species || undefined,
      }),
    },
    {
      path: "/favourites",
      name: "favourites",
      component: FavouritesList,
    },
    {
      path: "/character/:id",
      name: "characterDetails",
      props: true,
      component: CharacterDetails,
    },
  ],
});

export default router;
