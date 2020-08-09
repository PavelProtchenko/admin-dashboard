import Vue from 'vue'
import Router from 'vue-router'
import GameAnswers from '../components/GameAnswers'
import GameQuestions from '../components/GameQuestions'

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: "/game_answers",
      meta: {layout: 'main'}
    },
    {
      path: '/game_answers',
      name: 'Game Answers',
      meta: {layout: 'main'},
      component: GameAnswers,
      props: true
    },
    {
      path: '/game_questions',
      name: 'Game Questions',
      meta: {layout: 'main'},
      component: GameQuestions,
      props: true
    }
  ]
})

export default router;
