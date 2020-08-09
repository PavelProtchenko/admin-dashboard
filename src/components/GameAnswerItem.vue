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
      axios.get(`http://localhost:3000/api/v1/special_game_answers/${idx + 1}/correct_answer.json`)
      this.$emit('correctGameAnswer', this.gameAnswerData.id)
    },
    incorrectAnswer() {
      const idx = this.GAMEANSWERS.findIndex(t => t.id === this.gameAnswerData.id)
      const incorrectData = {
        correct: this.GAMEANSWERS[idx].correct = false
      };
      console.log(incorrectData);
      axios.get(`http://localhost:3000/api/v1/special_game_answers/${idx + 1}/incorrect_answer.json`)
      this.$emit('incorrectGameAnswer', this.gameAnswerData.id)
    }
  }
}
</script>

<style lang="scss">
  /* Game Answer Card */
  .answer-card {
    display: flex;
    justify-content: space-between;
    width: 60%;
  }

  .answer-content-card {
    display: inline-block;
    // width: 100%;
    justify-content: space-between;
  }

  .correct {
    background-color: #76ecbe;
  }

  .incorrect {
    background-color: #ff6a80;
  }

  .nocorrect {
    background-color: #fff;
  }

  .success {
    background-color: #008000;
    border: 0;
    border-radius: 5px;
    color: #fff;
    padding: .3rem;
    font-weight: bold;
    outline: 0;
    margin: 0 5px 0 0;
  }

  .success:hover {
    cursor: pointer;
  }

  .success:active {
    cursor: pointer;
    background-color: #f0c;
    box-shadow: #008000 0 0 .5rem;
  }

  .danger {
    background-color: #ff0000;
    border: 0;
    border-radius: 5px;
    color: #fff;
    padding: .3rem;
    font-weight: bold;
    outline: 0;
  }

  .danger:hover {
    cursor: pointer;
  }

  .danger:active {
    cursor: pointer;
    background-color: #f0c;
    box-shadow: #ff0000 0 0 .5rem;
  }
</style>
