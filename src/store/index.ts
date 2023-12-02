import { createStore } from "vuex";

const defaultState = {
  count: 0,
  listData:{1:10},
  num:10
}
const store = createStore({
  state () {
    return {
      count: 10,
      listData:{1:10},
    num:10
    }
  },
  mutations: {
    increment (state: typeof defaultState) {
      state.count++
    },
    setData(state,value){
      state.listData=value
  },
  addNum(state){
    state.num=state.num+10
  }
  },

  actions: {
    setData(context,value){
      context.commit('setData',value)
    },
  },
  modules: {}

})
export default store;

// export default createStore({
//   state: {
//     listData:{1:10},
//     num:10
//   },
//   mutations: {
//     setData(state,value){
//         state.listData=value
//     },
//     addNum(state){
//       state.num=state.num+10
//     }
//   },
//   actions: {
//     setData(context,value){
//       context.commit('setData',value)
//     },
//   },
//   modules: {}
// });
