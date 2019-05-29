export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    corpId: null,
    corpName: "",
    canChangeCorp: 0, //是否允许修改当前租户
    showLine: "",//显示列
  },
  mutations: {
    updateId(state, id) {
      state.id = id
    },
    updateName(state, name) {
      state.name = name
    },
    updateCorpId(state, id) {
      state.corpId = id;
    },
    updateCorpName(state, name) {
      state.corpName = name;
    },
    updateCanChangeCorp(state, int) {
      state.canChangeCorp = int;
    },
    updateShowLine(state, line) {
      state.showLine = line;
    }
  }
}
