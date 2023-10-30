<template>
  <ul class="buttons">
    <li>
      <RouterLink
        :to="{
          name: 'home',
          query: {
            page: 1,
          },
        }"
      >
        All
      </RouterLink>
    </li>
    <li>
      <RouterLink
        :to="{
          query: {
            page: 1,
            species: 'human',
          },
        }"
      >
        Human
      </RouterLink>
    </li>
    <li>
      <RouterLink
        :to="{
          query: {
            page: 1,
            species: 'animal',
          },
        }"
        >Animal
      </RouterLink>
    </li>
    <li>
      <RouterLink
        :to="{
          query: {
            page: 1,
            species: 'alien',
          },
        }"
      >
        Alien
      </RouterLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.buttons {
  li {
    float: left;
    list-style: none;
    text-align: center;
    background-color: black;
    margin-right: 20px;
    padding: 0;
    width: 60px;
    line-height: 30px;

    a {
      text-decoration: none;
      color: #ffffff;
      display: block;

      &:hover {
        text-decoration: none;
        color: #000000;
        background-color: #33b5e5;
      }
    }
  }
}
</style>
