import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage'),
    },
    {
      path: '/:username/calling/tribe/:roomname',
      name: 'call',
      component: require('@/components/CallPage'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
