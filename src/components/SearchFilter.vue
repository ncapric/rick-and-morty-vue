<template>
  <div class="filter">
    <LinkButtonList class="button-list" />

    <div class="filter__search">
      <input
        type="text"
        v-model="search"
        placeholder="Search by name..."
        class="filter__search-area"
      />
      <RouterLink
        :to="{
          query: {
            page: 1,
            name: search,
            species: species,
          },
        }"
      >
        <button
          class="filter__button"
          :disabled="!isButtonDisabled"
          @click="sendName"
        >
          Search
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import LinkButtonList from "@/components/LinkButtonList.vue";

const search = ref("");
const isButtonDisabled = computed(() => search.value.length);

const emit = defineEmits(["sendValue"]);

defineProps({
  species: String,
});

function sendName() {
  emit("sendValue", search.value);
}
</script>

<style scoped>
.filter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 7vh;
  align-items: center;
  justify-items: flex-start;
  background-color: rgb(236, 236, 236);
}

.filter__search {
  justify-self: flex-end;
  margin-right: 20px;
}
.filter__search-area {
  margin-left: 3rem;
  height: 35px;
  justify-self: flex-end;
}

.filter__button {
  height: 35px;
  border-radius: 0px;
}

@media screen and (max-width: 700px) {
  .filter {
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr;
    height: auto;
    padding: 10px 0;
  }

  .button-list {
    justify-self: center;
    padding-left: 10px;
  }

  .filter__search {
    margin-top: 20px;
    justify-self: center;
  }
}
</style>
