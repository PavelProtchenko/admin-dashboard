<template>
  <div class="answer-card">
      <span class="answer-content-card">
        <strong>{{ gameAnswerData.id }}</strong>
        Название игры: {{ gameAnswerData.special_game_name }}<br>
        Название команды: {{ gameAnswerData.name }}<br>
        Тур № {{ gameAnswerData.tour_number }}<br>
        Ответ: {{ gameAnswerData.answer }}<br>
      </span>
    <div>
      <button
        class="success"
        @click="correctAnswer"
      >Correct
      </button>
      <button
        class="danger"
        @click="incorrectAnswer"
        >Incorrect
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios';
import config from '../config'

export default {
  name: 'GameAnswerItem',
  props: {
    gameAnswerData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'GAMEANSWERS'
    ])
  },
  methods: {
    ...mapActions([
      'SET_CORRECT_GAME_ANSWER_API',
      'SET_INCORRECT_GAME_ANSWER_API'
    ]),
    correctAnswer() {
      const idx = this.GAMEANSWERS.findIndex(t => t.id === this.gameAnswerData.id)
      const correctData = {
        correct: this.GAMEANSWERS[idx].correct = true
      };
      console.log(correctData);
      axios.get(`${config.API_URL_ROOT}/special_game_answers/${idx + 1}/correct_answer.json`)
      this.$emit('correctGameAnswer', this.gameAnswerData.id)
    },
    incorrectAnswer() {
      const idx = this.GAMEANSWERS.findIndex(t => t.id === this.gameAnswerData.id)
      const incorrectData = {
        correct: this.GAMEANSWERS[idx].correct = false
      };
      console.log(incorrectData);
      axios.get(`${config.API_URL_ROOT}/special_game_answers/${idx + 1}/incorrect_answer.json`)
      this.$emit('incorrectGameAnswer', this.gameAnswerData.id)
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/styles/game_answer_item.scss';
</style>
