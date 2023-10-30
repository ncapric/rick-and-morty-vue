<template>
  <Loader v-if="isLoading" />
  <div v-else>
    <SearchFilter
      class="search-filter"
      :species="species"
      @sendValue="filteredNames"
    />
    <div class="cards">
      <CharacterCard
        v-for="character in characterList"
        :key="character.id"
        :name="character.name"
        :imageUrl="character.image"
        :species="character.species"
        :status="character.status"
        :id="character.id"
        :isFavourite="character.isFavourite"
      />
    </div>
    <div class="router-links">
      <RouterLink
        v-if="page != 1"
        :to="{
          name: 'home',
          query: {
            page: page - 1,
            name: searchValue ? searchValue : name,
            species: species,
          },
        }"
        @click="scrollToTop"
      >
        &lt;&lt; Prev Page
      </RouterLink>
      <p>Page {{ page }} of {{ totalNumberOfPages }}</p>
      <RouterLink
        v-if="page !== totalNumberOfPages"
        :to="{
          name: 'home',
          query: {
            page: page + 1,
            name: searchValue ? searchValue : name,
            species: species,
          },
        }"
        @click="scrollToTop"
      >
        Next Page &gt;&gt;
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import SearchFilter from "../components/SearchFilter.vue";
import CharacterCard from "../components/CharacterCard.vue";
import Loader from "@/components/LoaderComponent.vue";

import { useStore } from "vuex";

import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

defineProps({
  page: Number,
  name: String,
  species: String,
});

const store = useStore();
const router = useRoute();

const characterList = computed(() => store.state.characterList);
const totalNumberOfPages = computed(() => store.state.totalNumberOfPages);
const isLoading = computed(() => store.state.isLoading);

const searchValue = ref("");

watchEffect(async () => {
  store.dispatch("getCards", {
    page: router.query.page,
    name: router.query.name,
    species: router.query.species,
  });
});

function filteredNames(name) {
  searchValue.value = name;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
  });
}
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 0 auto;
  gap: 10px;
  width: 90%;
}

.router-links {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 7vh;
  background-color: rgb(236, 236, 236);
}

@media screen and (max-width: 700px) {
  .cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 425px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
