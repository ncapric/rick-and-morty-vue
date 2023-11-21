<template>
  <div class="card">
    <RouterLink
      :to="{
        name: 'characterDetails',
        params: {
          id: id,
        },
      }"
    >
      <img :src="imageUrl" :alt="name" class="card-image" />
    </RouterLink>
    <div class="card__content">
      <h3 class="card__name">
        <b>{{ name }}</b>
      </h3>
      <p class="card__attributes">{{ species }} - {{ status }}</p>
      <button class="card__button" @click="addToFavourites" v-if="!isFavourite">
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
  </div>
</template>

<script setup>
import { useStore } from "vuex"

const store = useStore()

const props = defineProps({
  name: String,
  imageUrl: String,
  species: String,
  status: String,
  id: Number,
  isFavourite: Boolean,
})

function addToFavourites() {
  store.dispatch("addToFavourites", props.id)
}

function removeFromFavourites() {
  store.dispatch("removeFromFavourites", props.id)
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid rgb(167, 167, 167);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-top: 10px;
  width: 100%;
  height: auto;

  &__content {
    padding: 20px;
  }

  &__name {
    font-weight: bold;
    font-size: 25px;
  }

  &__attributes {
    font-size: 20px;
    margin: 10px 0px;
  }

  &__button {
    width: 100%;
    height: 50px;

    &--remove {
      background-color: rgb(255, 42, 42);
      color: white;
    }
  }
}

.card-image {
  width: 100%;
}

@media screen and (max-width: 450px) {
  .card {
    max-height: auto;
  }
}
</style>
