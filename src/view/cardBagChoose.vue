<template>
    <div class="cardBag">
            <mu-appbar color="primary" title="卡组选择">
            <mu-button slot="right" flat  @click="close">
                关闭
            </mu-button>
            </mu-appbar>
            <mu-paper class="cardBag-cont" :z-depth="0">
                <mu-paper style="margin-top:20px;" class="cardBag-card" :z-depth="1">
                    <div class="cardBagChList" v-for="(item,key) in mycardBagList" @click="openGames(item.cardBagId)" :key="key">
                        {{item.bagName}}
                    </div>
                </mu-paper>
            </mu-paper>
    </div>
</template>

<script>
import { clearLoginInfo } from '@/utils'
export default {
    data(){
        return{
            pageIndex: 1,
            pageSize: 15,
            mycardBagList:[], //我的卡组
        }
    },
    mounted(){
        this.getDateList();
        this.$socket.onmessage = this.websocketonmessage
        
        if(this.$socket.readyState==1){

        }else{
            this.socketState().then((date)=>{
                console.log(date)
                setTimeout(()=>{
                console.log(this.$socket)
                },4000)
            })
        }
    },
    computed:{
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
        getDateList(){
            const loading = this.$loading();
            this.$http({
                url: this.$http.adornUrl("/cardbag/cardBagList"),
                method: "get",
                params: this.$http.adornParams({
                page: this.pageIndex,
                limit: this.pageSize,
                })
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    console.log(data.cardBagList)
                    for(var i in data.cardBagList){
                        var number = 0;
                        for(var j in data.cardBagList[i].cardBagDetailsEntityList){
                            number+= data.cardBagList[i].cardBagDetailsEntityList[j].number
                        }
                        data.cardBagList[i].cardNumber = number
                    }
                    this.mycardBagList = data.cardBagList;
                } else {
                    this.mycardBagList = [];
                }
                loading.close();
            });
        },
        websocketonmessage(e){
            var json = JSON.parse(e.data);
            console.log(json)
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
                    console.log(json.msg)
                break;
                case "mate":
                    switch(json.type){
                        case 0: //匹配中
                            console.log(json.msg)
                        break;
                        case 1: //匹配完成
                            console.log(json.msg)
                            this.roomNumber = json.room
                            this.$router.push({ name: "battlePVP" });
                        break;
                    }
                break;
            }
        },
        //关闭
        close(){
            this.$router.push({ name: "home" });
        },
        openGames(id){ //发送开始匹配信息
            var json ={ 
                key: "mate", 
                token: this.$cookie.get("token"),
                cardId: id,
            }
            this.$socket.send(
                JSON.stringify(json)
            );
            console.log(this.$socket)
        },
        
    }
}
</script>

<style>

</style>
