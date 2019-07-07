<template>
  <div class="battle">
    <div class="battle-enemy">
      <mu-paper class="battle-enemy-hand" :z-depth="5"> </mu-paper>
      <mu-paper class="battle-enemy-venue" :z-depth="5"> </mu-paper>
    </div>
    <div class="battle-my">
      <mu-paper class="battle-my-venue" :z-depth="5">
        {{ number }}
      </mu-paper>
      <mu-paper class="battle-my-hand" :z-depth="5"> </mu-paper>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websock: "",
      number: 0
    };
  },
  created() {
    this.name = this.userName ? this.userName.substr(0, 1) : "C";
  },
  mounted() {
    this.init();
  },
  computed: {
    userName: {
      get() {
        return this.$store.state.user.userName;
      }
    },
    roomNumber: {
            get() {
                return this.$store.state.user.RoomNumber;
            },
            set(val) {
                this.$store.commit("user/updateRoomNumber", val);
            }
        },
  },
  methods: {
    init() {
       this.websocketonmessage = this.$socket.onmessage;
       if(this.$socket.readyState==1){

       }else{
          this.socketState().then((date)=>{
            console.log(date)
          })
       }
    },
    websocketonmessage(e) {
      console.log(e);
      //数据接收
      const redata = JSON.parse(e.data);
      switch(redata.key){
        case "login": //重新登录
          clearLoginInfo()
          this.$router.push({ name: 'login' })
        break;
        case "token": //token验证成功
            console.log(redata.msg)
        break;
        case "reconnect": //重连
          this.roomNumber = json.room
          console.log(redata.msg)
        break;

      }
    },
    
  }
};
</script>


 