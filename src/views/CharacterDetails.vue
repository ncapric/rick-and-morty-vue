<template>
  <Loader v-if="isLoading" />
  <div class="card" v-else>
    <div class="card-details">
      <h1 class="card__name">{{ character?.name }}</h1>
      <span class="card__species">{{ character?.species }}</span>
      <span> - </span>
      <span class="card__status">{{ character?.status }}</span>
      <p class="card__location">Last known location: {{ lastLocation }}</p>
      <p class="card__episode">First seen in: Episode {{ firstEpisode }}</p>
      <button
        class="card__button"
        @click="addToFavourites"
        v-if="!isCharaterInFavourites"
      >
        Add to Favourites
      </button>
      <button
        class="card__button card__button--remove"
        @click="removeFromFavourites"
        v-else
      >
        Remove from Favourites
      </button>
    </div>
    <img class="card__image" :src="character?.image" :alt="character?.name" />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import Loader from "@/components/LoaderComponent.vue";

const store = useStore();
const route = useRoute();

const isLoading = computed(() => store.state.isLoading);

onMounted(async () => {
  await store.dispatch("fetchCurrentCharacter", route.params.id);
});

const character = computed(() => store.state.currentCharacterDetails);
const isCharaterInFavourites = computed(() =>
  store.getters.favouritesIds.includes(character.value?.id)
);

const lastLocation = computed(() => character.value?.location.name);

const firstEpisode = computed(() => {
  const last2 = character.value?.episode[0].slice(-2);

  if (last2) {
    if (last2[0] === "/") {
      return Number(last2[1]);
    }
  }

  return Number(last2);
});

function addToFavourites() {
  store.dispatch("addToFavourites", character.value.id);
}

function removeFromFavourites() {
  store.dispatch("removeFromFavourites", character.value.id);
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: space-between;
  margin: 20px 40px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &__button {
    width: 100%;
    height: 50px;
    margin-top: 80px;

    &--remove {
      background-color: rgb(255, 42, 42);
      color: white;
    }
  }
}

.card-details {
  padding: 20px;
}

p {
  font-size: 20px;
  margin: 10px 0;
}

@media screen and (max-width: 700px) {
  .card {
    flex-direction: column-reverse;

    &__button {
      margin-top: 50px;
    }
  }

  .card-details {
    padding: 30px;
    min-height: 300px;
  }
}

// smanji sliku, sredi description
</style>
