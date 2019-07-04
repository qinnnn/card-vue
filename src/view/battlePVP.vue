<template>
  <div class="battle">
    <div class="battle-enemy">
      <mu-paper class="battle-enemy-hand" :z-depth="5"> </mu-paper>
      <mu-paper class="battle-enemy-venue" :z-depth="5"> </mu-paper>
    </div>
    <div class="battle-my">
      <mu-paper class="battle-my-venue" :z-depth="5">
        {{ number }}
        <mu-button @click="websocketsend">发送</mu-button>
        <mu-button @click="websocketclose">关闭</mu-button>
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
    }
  },
  methods: {
    init() {
    //   if ("WebSocket" in window) {
    //     this.websock = new WebSocket(
    //       window.SITE_CONFIG["webSocketUrl"] + "/webSocket"
    //     );
    //   } else {
    //     alert("浏览器不支持");
    //   }
    //   this.websock.onopen = this.websocketonopen;
    //   this.websock.onerror = this.websocketonerror;
    //   this.websock.onmessage = this.websocketonmessage;
    //   this.websock.onclose = this.websocketclose;
       this.websocketonerror = this.$socket.onerror;
       this.websocketonmessage = this.$socket.onmessage;
    },
    // websocketonopen() {
    //   console.log("服务器连接成功");
    //   this.websock.send(
    //     JSON.stringify({ key: "token", value: this.$cookie.get("token") })
    //   );
    // },
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误");
    },
    websocketclose(e) {
      //关闭
      this.websock.close();
      console.log("connection closed (" + e.code + ")");
    },
    websocketonmessage(e) {
      console.log(e);
      //数据接收
      const redata = JSON.parse(e.data);
      switch(redata.key){
        case "token": //token验证成功
            tokenCallback(redata)
          break;

      }
    },
    tokenCallback(redata){ //token验证成功
      switch(redata.type){
        case 1:
          //重连
          break;
        case 0:
          //准备匹配
          //卡包列表
          break;
      }
    },
    
  }
};
</script>


 