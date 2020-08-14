<template>
  <div class="game-answers">
    <h1>Game Answers</h1>
    <input type="checkbox" id="checkbox" v-model="fetched" @change="fetchGameAnswers" class="check-fetch-data" />
    <label class="toggle-switch" for="checkbox">Получать новые ответы каждые 10 сек. <span :class="fetched ? 'changed-on' : 'changed-off'">{{ changedValue }}</span></label>
    <div class="game-answer-filters">
      <Select
        :options="SPECIALGAMES"
        @select="optionSelect"
        :selected="selected"
      />
      <div class="search-filter">
        <input
          type="text"
          placeholder="Поиск по ответам..."
          v-model="search"
        >
      </div>
    </div>
    <span class="game-answers-counter">Общее число ответов: {{ filteredGameAnswers.length }}</span>
    <ul :class="toursOff ? 'nogame-tours' : 'game-tours'">
      <li v-for="(tour) in sortedGameAnswers.flatMap((gameAnswer) => {return gameAnswer.tour_number}).filter((v, i, a) => a.indexOf(v) === i)"
        :key="tour.id"
        class="game-tour"
        @click="filterAnswerByTour(tour)"
      >
      {{tour}}
      </li>
    </ul>
    <div class="game-space">
      <div class="main-game-answer-field">
        <ul class="game-answer-ul">
          <GameAnswerItem class="game-answer-li"
            :class="getCorrectClass(gameAnswer.correct)"
            :correct="gameAnswer.correct"
            @correct="correctGameAnswer"
            @incorrect="incorrectGameAnswer"

            v-for="gameAnswer in filteredGameAnswers"
            :key="gameAnswer.id"
            :gameAnswerData="gameAnswer"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import GameAnswerItem from '../components/GameAnswerItem'
import Select from '../components/shared/Select'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'GameAnswers',
  components: {
    GameAnswerItem,
    Select
  },
  data() {
    return {
      search: '',
      selected: 'All',
      defaultSelected: {id: 0, name: 'All'},
      sortedGameAnswers: [],
      fetched: false,
      timer: null,
      changedValue: 'Off',
      filteredTours: [],
      selectedTour: 0,
      tourItem: 0,
      toursOff: false,
      tourNumber: null
    }
  },
  computed: {
    ...mapGetters([
      'GAMEANSWERS',
      'SPECIALGAMES'
    ]),
    filteredGameAnswers() {
      if (this.sortedGameAnswers.length) {
        return this.sortedGameAnswers.filter((gameAnswer) => {



          let number = this.selectedTour;
          if (number) {
            return gameAnswer.tour_number === number && gameAnswer.answer.toLowerCase().match(this.search.toLowerCase());            
          } else {
            return gameAnswer.answer.toLowerCase().match(this.search.toLowerCase());
          }
        })
      } else {
        return this.GAMEANSWERS.filter((gameAnswer) => {
          return gameAnswer.answer.toLowerCase().match(this.search.toLowerCase());
        })
      }
      // return this.sortedGameAnswers.filter((gameAnswer) => {
      //   return gameAnswer.answer.toLowerCase().match(this.search.toLowerCase());
      // })
    }
  },
  methods: {
    ...mapActions([
      'GET_GAME_ANSWERS_FROM_API',
      'GET_SPECIAL_GAMES_FROM_API'
    ]),
    correctGameAnswer(id) {
      this.SET_CORRECT_GAME_ANSWER_API(id)
        .then((response) => {
          return response.findIndex(t => t.id === id + 1)
      })
    },
    incorrectGameAnswer(id) {
      this.SET_INCORRECT_GAME_ANSWER_API(id)
        .then((response) => {
          return response.slice(t => t.id === id + 1)
      })
    },
    getCorrectClass(correct) {
      if (correct === true) {
        return 'correct'
      } else if (correct === false) {
        return 'incorrect'
      } else {
        return 'nocorrect'
      }
    },
    optionSelect(option) {
      this.sortedGameAnswers = [];
      let vm = this;
      this.GAMEANSWERS.map((item) => {
        if (item.special_game_name == option.name) {
          vm.sortedGameAnswers.push(item);
        }
      })
      this.selected = option.name
      // console.log(this.selected)
    },
    fetchGameAnswers() {
      if (this.fetched === true) {
        this.changedValue = 'On'
        this.timer = setInterval(() => {
          this.GET_GAME_ANSWERS_FROM_API()
            .then((response) => {
            if (response.data) {
              console.log('Fetched game answers')
          }
        })}, 10000)
      } else if (this.fetched === false) {
        this.changedValue = 'Off'
        clearInterval(this.timer)
      }
    },
    filterAnswerByTour(number) {
      return this.selectedTour = number;
    },
    selectTour(arr, n) {
      return arr.filter((el) => {
        el === n
      })
    }
  },
  mounted() {
    this.GET_GAME_ANSWERS_FROM_API()
      .then((response) => {
        if (response.data) {
          console.log('Fetched game answers')
        }
      }),
    this.GET_SPECIAL_GAMES_FROM_API()
      .then((response) => {
        if (response.data.push(this.defaultSelected)) {
          console.log('Fetched special games')
        }
      })
  },
  beforeRouteLeave (to, from, next) {
    if(this.timer)
        clearInterval(this.timer);
    next();
  }
}
</script>

<style lang="scss">
  @import '../assets/styles/game_answers.scss';
</style>
