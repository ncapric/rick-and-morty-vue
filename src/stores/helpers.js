export function setPropertyIsFavourite(listOfCharacters, favState) {
  const favouritesIds = favState.map((favCharacter) => favCharacter.id)

  return listOfCharacters.forEach((character) => {
    if (favouritesIds.includes(character.id)) {
      character.isFavourite = true
    } else {
      character.isFavourite = false
    }
  })
}
