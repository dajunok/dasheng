import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)



const routes = [];

const router = new VueRouter({
  routes,
  //返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：
  scrollBehavior (to, from, savedPosition) { //滚动行为
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };  //让页面滚动到顶部
    }
  },
})

export default router
