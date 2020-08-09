<template>
  <div class="game-answers">
    <h1>Game Answers</h1>
    <input type="checkbox" id="checkbox" v-model="fetched" @change="fetchGameAnswers" />
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
      changedValue: 'Off'
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
          return gameAnswer.answer.toLowerCase().match(this.search.toLowerCase());
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
  .main-game-answer-field {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0 0 0;
  }

  .dark h1 {
    color: #f3f3f3;
  }

  .dark .game-answers {
    box-shadow: none;
  }

  .game-answers {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
  }

  .game-answer-ul {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1rem;

  .game-answer-li {
    position: relative;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: .5rem 1rem;
    margin-bottom: .5rem;
    display: flex;
    justify-content: space-between;
    width: 100%;

      input {
        margin-right: 1rem;
      }

      small {
        position: absolute;
        right: 40px;
        bottom: 5px;
        font-size: .8rem;
      }
    }
  }

  .game-space {
    display: flex;
    justify-content: space-evenly;
  }

  // Game Answers counter
  .dark .game-answers-counter {
    color: #f3f3f3;
  }

  .game-answers-counter {
    font-weight: bold;
    display: flex;
    justify-content: center;
    margin: 2em 0 0 0;
    color: #000;
  }

  // Search filter styles & dropdown filter
  .game-answer-filters {
    display: flex;
    align-items: baseline;
  }

  .search-filter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1rem;
    height: 30px;

    input {
      width: 50%;
      height: 100%;
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
      padding: 0 .5rem;
      font-size: 1rem;
      margin: 5% 10% 0 -25%;
    }
  }

  // Fetch game answers automatically
  .dark .toggle-switch {
    color: #f3f3f3;
  }

  .toggle-switch {
    font-size: 1.2rem;
  }

  .toggle-switch:hover {
    cursor: pointer;
  }

  .changed-off {
    color: #ff0000;
  }

  .changed-on {
    color: #008000;
  }
</style>
