import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://rickandmortyapi.com/api/character",
});

export default {
  getCharacters(page, name = "", species = "") {
    if (name !== "" && species !== "") {
      return apiClient.get(`?page=${page}&name=${name}&species=${species}`);
    }

    if (name !== "" && species === "") {
      return apiClient.get(`?page=${page}&name=${name}`);
    }

    if (name === "" && species !== "") {
      return apiClient.get(`?page=${page}&species=${species}`);
    }

    return apiClient.get(`?page=${page}`);
  },

  getCharacter(id) {
    return apiClient.get(`${id}`);
  },
};
