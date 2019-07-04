<template>
    <div class="home">
        <mu-paper class="home-myinfo" :z-depth="5">
            <mu-avatar style="margin-right:10px;" color="teal">
                {{name}}
            </mu-avatar>
            {{userName}}
            <mu-badge style="margin-left:10px;" :content='"￥"+money' color="secondary"></mu-badge>
            当前在线人数:
            <mu-badge style="margin-left:5px;" :content='""+number' color="primary"></mu-badge>
        </mu-paper>
        <mu-paper class="home-paper" :z-depth="5">
            <mu-button @click="battlePVP" color="info">对战模式</mu-button>
            <mu-button color="info">冒险模式</mu-button>
            <mu-button color="info">竞技模式</mu-button>
            <mu-button color="info">乱斗模式</mu-button>
        </mu-paper>
        <mu-paper class="home-mycard" :z-depth="5">
            <mu-button color="info" @click="cardPumping">我的卡包</mu-button><br/>
            <mu-button style="margin-top:10px;" color="info" @click="mycardBag">我的卡牌</mu-button>
        </mu-paper>
        <mu-paper class="home-upCard" :z-depth="5">
            <mu-button color="info" @click="upCard">上传卡牌</mu-button>
        </mu-paper>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:"",
            number: 0,
        }
    },
    created(){
        this.name = this.userName?this.userName.substr(0,1):"C"
        // console.log(this.$socket)
        this.$socket.onmessage = this.websocketonmessage
        this.$socket.onopen = this.websocketonopen
        this.webSocketOpen()
    },
    computed:{
        userName: {
            get() {
                return this.$store.state.user.userName;
            }
        },
        money: {
            get() {
                return this.$store.state.user.money;
            }
        }
    },
    methods:{
        websocketonmessage(e){
            var json = JSON.parse(e.data);
            switch(json.key){
                case "token":
                    this.number = json.online
                break;
                case "online":
                    this.number = json.online
                break;
            }
        },
        websocketonopen(){
            console.log("服务器连接成功");
        },
        webSocketOpen(){
            if(this.$socket.readyState==1){
                this.$socket.send(
                    JSON.stringify({ key: "token", value: this.$cookie.get("token") })
                );
            }else{
                setTimeout(()=>{
                    this.webSocketOpen()
                },500)
            }
        },
        //我的卡牌 卡组
        mycardBag(){
            this.$router.replace({ name: "cardBag" });
        },
        //我的卡包 抽卡
        cardPumping(){
            this.$router.replace({ name: "cardPumping" });
        },
        battlePVP(){
            this.$router.replace({ name: "cardBagChoose" });
        },
        //上传卡牌
        upCard(){
            this.$router.replace({ name: "upCard" });
        }
    }
}
</script>

<style>

</style>
