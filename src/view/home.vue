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
import { clearLoginInfo } from '@/utils'
export default {
    data(){
        return{
            name:"",
            number: 0,
        }
    },
    created(){
        this.name = this.userName?this.userName.substr(0,1):"C"

        this.$socket.onmessage = this.websocketonmessage
        if(this.$socket.readyState==1){

        }else{
            this.socketState().then((date)=>{
                console.log(date)
            })
        }
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
    methods:{
        websocketonmessage(e){
            var json = JSON.parse(e.data);
            switch(json.key){
                case "login": //重新登录
                    clearLoginInfo()
                    this.$router.push({ name: 'login' })
                break;
                case "reconnect": //重连
                    this.roomNumber = json.room
                    this.$router.push({ name: "battlePVP" });
                break;
                case "token":
                    this.number = json.online
                break;
                case "online":
                    this.number = json.online
                break;
            }
        },
        //我的卡牌 卡组
        mycardBag(){
            this.$router.push({ name: "cardBag" });
        },
        //我的卡包 抽卡
        cardPumping(){
            this.$router.push({ name: "cardPumping" });
        },
        battlePVP(){
            this.$router.push({ name: "cardBagChoose" });
        },
        //上传卡牌
        upCard(){
            this.$router.push({ name: "upCard" });
        }
    }
}
</script>

<style>

</style>
