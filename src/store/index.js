import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,  //开启严格模式。在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
    plugins:[],    //Store 插件，Vuex 的 store 接受 plugins 选项，这个选项暴露出每次 mutation 的钩子。
    state: { },
    getters:{},
    mutations: {},
    /* # Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，
      或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，
      你就知道 context 对象为什么不是 store 实例本身了。
    */
    actions: { },  //Action 提交的是 mutation，而不是直接变更状态。
    modules: { }
})
