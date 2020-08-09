import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    gameAnswers: [],
    specialGames: [],
    searchValue: ''
  },
  mutations: {
    SET_GAMEANSWERS_TO_STATE: (state, gameAnswers) => {
      state.gameAnswers = gameAnswers;
    },
    SET_SPECIAL_GAMES_TO_STATE: (state, specialGames) => {
      state.specialGames = specialGames;
    },
    SET_CORRECT_GAMEANSWER: (state, gameAnswers, id) => {
      state.gameAnswers = gameAnswers.findIndex(t => t.id === id + 1);
    },
    SET_INCORRECT_GAMEANSWER: (state, gameAnswers, id) => {
      state.gameAnswers = gameAnswers.findIndex(t => t.id === id + 1);
    },
    SET_SEARCH_VALUE_TO_VUEX: (state, value) => {
      state.searchValue = value;
    }
  },
  actions: {
    GET_GAME_ANSWERS_FROM_API({commit}) {
      return axios.get('http://localhost:3000/api/v1/special_game_answers.json')
        .then((gameAnswers) => {
          commit('SET_GAMEANSWERS_TO_STATE', gameAnswers.data);
          return gameAnswers;
        })
        .catch((error) => {
          console.log(error);
          return error;
        })
    },
    GET_SPECIAL_GAMES_FROM_API({commit}) {
      return axios.get('http://localhost:3000/api/v1/special_games.json')
        .then((specialGames) => {
          commit('SET_SPECIAL_GAMES_TO_STATE', specialGames.data)
          return specialGames
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    CORRECT_GAME_ANSWER_API({commit}, id) {
      return axios.get(`http://localhost:3000/api/v1/special_game_answers/${id}/correct_answer.json`)
        .then((gameAnswers) => {
          commit('SET_CORRECT_GAMEANSWER', gameAnswers.data);
          return gameAnswers;
        })
        .catch((error) => {
          console.log(error);
          return error;
        })
    },
    INCORRECT_GAME_ANSWER_API({commit}, id) {
      return axios.get(`http://localhost:3000/api/v1/special_game_answers/${id}/incorrect_answer.json`)
        .then((gameAnswers) => {
          commit('SET_INCORRECT_GAMEANSWER', gameAnswers.data);
          return gameAnswers;
        })
        .catch((error) => {
          console.log(error);
          return error;
        })
    },
    GET_SEARCH_VALUE_TO_VUEX({commit}, value) {
      commit('SET_SEARCH_VALUE_TO_VUEX', value)
    }
  },
  getters: {
    GAMEANSWERS(state) {
      return state.gameAnswers;
    },
    SPECIALGAMES(state) {
      return state.specialGames;
    },
    SEARCH_VALUE(state) {
      return state.searchValue;
    }
  }
});

export default store;
