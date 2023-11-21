<template>
  <div v-if="hasFavourites">
    <div class="cards" v-for="character in favCards" :key="character.id">
      <CharacterCard
        class="character-card"
        :name="character.name"
        :imageUrl="character.image"
        :species="character.species"
        :status="character.status"
        :id="character.id"
        :isFavourite="character.isFavourite"
      />
    </div>
  </div>
  <h1 v-else class="title">No cards</h1>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

import CharacterCard from "../components/CharacterCard.vue"

const store = useStore()

const favCards = computed(() => store.state.favouritesList)
const hasFavourites = computed(() =>
  store.state.favouritesList.length === 0 ? false : true
)
</script>

<style scoped>
.title {
  text-align: center;
}
.cards {
  display: inline-block;
  margin: 0 0 0 10px;
}

.character-card {
  max-width: 300px;
}
</style>
