import mutations from "./constants/mutationTypes"

export default {
  [mutations.SET_CHARACTER_LIST](state, characters) {
    state.characterList = characters
  },

  [mutations.SET_FAVOURITES_LIST](state, favouritesList) {
    state.favouritesList = favouritesList
  },

  [mutations.SET_TOTAL_NUMBER_OF_PAGES](state, pages) {
    state.totalNumberOfPages = pages
  },

  [mutations.SET_CURRENT_CHARACTER_DETAILS](state, characterDetails) {
    state.currentCharacterDetails = characterDetails
  },

  [mutations.ADD_TO_FAVOURITES](state, character) {
    state.favouritesList = [...state.favouritesList, character]
  },

  [mutations.IS_LOADING](state, isLoading) {
    state.isLoading = isLoading
  },
}
