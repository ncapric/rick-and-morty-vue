export default {
  favouritesLength(state) {
    return state.favouritesList.length;
  },

  favouritesIds(state) {
    return state.favouritesList.map((favCharacter) => favCharacter.id);
  },
};
