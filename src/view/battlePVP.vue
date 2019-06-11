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
      if ("WebSocket" in window) {
        this.websock = new WebSocket(
          window.SITE_CONFIG["webSocketUrl"] + "/webSocket"
        );
      } else {
        alert("浏览器不支持");
      }
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("服务器连接成功");
      this.websock.send(
        JSON.stringify({ key: "token", value: this.$cookie.get("token") })
      );
    },
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      console.log(e);
      //数据接收
      //const redata = JSON.parse(e.data); //注意：长连接我们是后台直接1秒推送一条数据，
      //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
      //console.log(redata.value);
    },
    websocketsend(agentData) {
      console.log(agentData);
      //数据发送
      this.websock.send("aaadddaaaaa");
    },

    websocketclose(e) {
      //关闭
      this.websock.close();
      console.log("connection closed (" + e.code + ")");
    }
  }
};
</script>


 