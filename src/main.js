import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams'}, //redirect: '/teams' or TeamsList 컴포넌트 부분에 alias: '/' 추가  
        { 
          name: 'teams',
          path: '/teams',
          components: { default: TeamsList, footer: TeamsFooter},
          children: [
            {name: 'team-members', path: ':teamId', component: TeamMembers, props: true}, // props: true 프로퍼티로서 컴포넌트에 전달되어야 한다고 알려주는 기능
          ] // name 사용이유: 가독성 및 유지보수 쉬움
        }, // our-domain.com/teams => TeamsList! 
        { path: '/users', components: {
          default: UsersList,
          footer: UsersFooter
        } },
        
        { path: '/:notFound(.*)', component: NotFound} //순서 주의
    ],
    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition){
      console.log(to, from, savedPosition);
      if(savedPosition){
        return savedPosition;
      }
      return { left: 0, top: 0};
      
    }
});

router.beforeEach(function(to, from, next){
  console.log(to, from);

  // if(to.name === 'team-members'){
  //   next();
  // }else{
  //   next({name: 'team-members', parmas: { teamId : 't2'}});
  // }

  next();
  
});

const app = createApp(App)

app.use(router);

app.mount('#app');


