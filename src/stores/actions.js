import router from "@/router"
import EventService from "@/services/axios"

import mutations from "./constants/mutationTypes"

import { setPropertyIsFavourite } from "./helpers"

export default {
  async getCards({ commit, state }, { page, name, species }) {
    try {
      commit(mutations.IS_LOADING, true)

      const res = await EventService.getCharacters(page, name, species)

      const characterList = res.data.results

      setPropertyIsFavourite(characterList, state.favouritesList)

      commit(mutations.SET_CHARACTER_LIST, characterList)
      commit(mutations.SET_TOTAL_NUMBER_OF_PAGES, res.data.info.pages)
    } catch (data) {
      alert("No data found, try again")
      router.push("/")
    } finally {
      commit(mutations.IS_LOADING, false)
    }
  },

  async fetchCurrentCharacter({ commit }, id) {
    try {
      commit(mutations.IS_LOADING, true)

      const res = await EventService.getCharacter(id)

      const currentCharacterDetails = res.data

      commit(mutations.SET_CURRENT_CHARACTER_DETAILS, currentCharacterDetails)
    } catch {
      alert("Character not found")
      router.push("/")
    } finally {
      commit(mutations.IS_LOADING, false)
    }
  },

  addToFavourites({ commit, state }, characterId) {
    state.characterList.forEach((character) => {
      if (character.id === characterId && character.isFavourite === true) {
        alert("That card is already in favourites")
      }

      if (character.id === characterId && character.isFavourite === false) {
        character.isFavourite = true

        commit(mutations.ADD_TO_FAVOURITES, character)
      }
    })
  },

  removeFromFavourites({ commit, state }, characterId) {
    const filteredFavouritesList = state.favouritesList.filter(
      (favCharacter) => favCharacter.id !== characterId
    )

    const changedCharactersList = state.characterList.map((character) => {
      if (character.id === characterId) {
        character.isFavourite = false
      }

      return character
    })

    commit(mutations.SET_CHARACTER_LIST, changedCharactersList)
    commit(mutations.SET_FAVOURITES_LIST, filteredFavouritesList)
  },

  setFavouritesList({ commit }, favouritesList) {
    commit(mutations.SET_FAVOURITES_LIST, favouritesList)
  },

  setFavouritesListOnUnmount({ state }) {
    localStorage.setItem("favouriteItems", JSON.stringify(state.favouritesList))
  },
}
