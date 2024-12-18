import { createRouter, createWebHistory } from 'vue-router'

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams'}, //redirect: '/teams' or TeamsList 컴포넌트 부분에 alias: '/' 추가  
        { 
          name: 'teams',
          path: '/teams',
          meta: { needsAuth: true },
          components: { default: TeamsList, footer: TeamsFooter},
          children: [
            {name: 'team-members', path: ':teamId', component: TeamMembers, props: true}, // props: true 프로퍼티로서 컴포넌트에 전달되어야 한다고 알려주는 기능
          ] // name 사용이유: 가독성 및 유지보수 쉬움
        }, // our-domain.com/teams => TeamsList! 
        { 
            path: '/users',
            components: {
              default: UsersList,
              footer: UsersFooter
            },
            beforeEnter(to, from, next){
              console.log('users beforeENter');
              console.log(to, from);
              if(to.meta.needsAuth){
                console.log('Needs auth!');
                next();
              }else{
                next();
              }
            }
        },
        
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
  console.log('Global beforeEach');
  console.log(to, from);

  // if(to.name === 'team-members'){
  //   next();
  // }else{
  //   next({name: 'team-members', parmas: { teamId : 't2'}});
  // }

  next();
  
});

router.afterEach(function(to, from) {
  // sending analyrics data
  console.log('Global afterEach');
  console.log(to, from);
});

export default router;