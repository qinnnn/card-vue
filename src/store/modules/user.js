export default {
  namespaced: true,
  state: {
    // userId: 0,
    userName: JSON.parse(localStorage.getItem("userName")) || '',
    money: JSON.parse(localStorage.getItem("money"))+"" || "0",
    roomNumber: JSON.parse(localStorage.getItem("roomNumber"))+"" || "0",
  },
  mutations: {
    // updateUserId(state, userId) {
    //   state.userId = userId
    // },
    updateUserName(state, userName) {
      localStorage.setItem('userName', JSON.stringify(userName)); 
      state.userName = userName
    },
    updateMoney(state, money) {
      localStorage.setItem('money', JSON.stringify(money)); 
      state.money = money+""
    },
    updateRoomNumber(state, roomNumber) {
      localStorage.setItem('roomNumber', JSON.stringify(roomNumber)); 
      state.roomNumber = roomNumber+""
    },
  }
}
