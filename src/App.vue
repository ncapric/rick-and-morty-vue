<template>
  <header>
    <nav>
      <div>
        <RouterLink
          active-class="links"
          :to="{
            name: 'home',
            query: { page: 1 },
          }"
          :class="{
            ['links']: isLinkActive('character'),
          }"
          >Characters
        </RouterLink>
        <RouterLink
          active-class="links"
          :to="{
            name: 'favourites',
          }"
          >Favourites
        </RouterLink>
      </div>
      <div class="navigation-right">
        <span
          ><img
            src="./assets/images/A_perfect_SVG_heart.svg.png"
            alt="Heart"
            class="heart"
          />
        </span>

        <span class="favouritesAmount">{{ favouritesLength }}</span>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const favouritesLength = computed(() => store.getters.favouritesLength);

onMounted(async () => {
  const storedFavourites = JSON.parse(localStorage.getItem("favouriteItems"));

  if (storedFavourites) {
    await store.dispatch("setFavouritesList", storedFavourites);
  }

  await store.dispatch("getCards", 1);
});

function isLinkActive(path) {
  return route.path.includes(path);
}

window.addEventListener("beforeunload", async () => {
  await store.dispatch("setFavouritesListOnUnmount");
});
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
}

nav {
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: rgb(183, 183, 183);

  a {
    color: rgb(183, 183, 183);
    display: inline-block;
    height: 100%;
    text-decoration: none;
    padding: 20px;
  }
}

.navigation-right {
  margin-right: 10px;

  .heart {
    width: 20px;
    height: auto;
    margin-right: 10px;
  }
  .favouritesAmount {
    font-size: 25px;
  }
}

.links {
  color: white;
}
</style>
