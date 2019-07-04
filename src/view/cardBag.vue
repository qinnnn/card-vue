<template>
    <div class="cardBag">
            <mu-appbar color="primary" title="我的卡牌">
            <mu-button slot="right" flat  @click="close">
                关闭
            </mu-button>
            </mu-appbar>
            <mu-paper class="cardBag-left" :z-depth="0">
                <mu-paper class="cardBag-card" :z-depth="1">
                    <div v-for="(itme,key) in mycardList" :key="key" class="cardBag-cardList">
                        <div v-if="itme.type==0" class="cardBag-cardInfo" @click="addCard(key)">
                            <div class="cardBag-crystal">{{itme.crystal}}</div>
                            <div class="cardBag-img" ></div> <!--:style="'background-image: url('+itme.cardImg+')'"-->
                            <div :class="itme.rarity==0?'cardBag-title ordinary':itme.rarity==1?'cardBag-title rare':itme.rarity==2?'cardBag-title legend':'cardBag-title epic'">{{itme.cardName}}</div>
                            <div class="cardBag-txt">
                                <div class="cardBag-txt-cont">
                                    <span style="font-weight: bold;">{{itme.keyword}}</span> {{itme.introduce}}
                                </div>
                            </div>
                            <div :class="itme.rarity==0?'cardBag-bottom ordinary':itme.rarity==1?'cardBag-bottom rare':itme.rarity==2?'cardBag-bottom legend':'cardBag-bottom epic'">
                                <div class="cardBag-bottom-left"><i class="iconfont">&#xe794;</i> {{itme.agg}}</div>
                                <div v-if="itme.entType==1" class="cardBag-bottom-cont"><i style="font-size:13px;" class="iconfont">&#xe6b0;</i> 野兽</div>
                                <div class="cardBag-bottom-right"><i class="iconfont">&#xe7f9;</i> {{itme.life}}</div>
                            </div>
                        </div>
                        <div v-if="itme.type==1" class="cardBag-cardInfo">
                            <div class="cardBag-crystal">{{itme.crystal}}</div>
                            <div class="cardBag-imgs" :style="'background-image: url('+itme.cardImg+')'"></div>
                            <div :class="itme.rarity==0?'cardBag-title ordinary':itme.rarity==1?'cardBag-title rare':itme.rarity==2?'cardBag-title legend':'cardBag-title epic'">{{itme.cardName}}</div>
                            <div class="cardBag-txts">
                                <div class="cardBag-txt-cont">
                                    <span style="font-weight: bold;">{{itme.keyword}}</span> {{itme.introduce}}
                                </div>
                            </div>
                        </div>
                    </div>
                </mu-paper>
            </mu-paper>
            
            <mu-paper class="cardBag-right" :z-depth="5">
                <div class="cardBag-newBag" @click="newCardBag">新建卡组</div>
                <div class="cardBag-bagList" v-for="(item,key) in mycardBagList" :key="key" @click="updateCardBag(item.cardBagId)">
                    <div class="cardBag-bagName">{{item.bagName}}</div>
                    <div class="cardBag-bagNumber">{{item.cardNumber}}/40</div>
                </div>
                <div class="cardBag-new" v-if="cardBagState">
                    <div class="cardBag-new-buttom">
                        <mu-button color="warning" @click="cardBagState = false">取消</mu-button>
                        <mu-button @click="saveCardBag" color="primary">保存</mu-button>
                    </div>
                    <mu-text-field v-model="cardBagInfo.bagName" label="卡组名称" label-float ></mu-text-field>
                    <div class="cardBag-new-list">
                        <div @click="deleteCard(key)" :class="item.rarity==0?'cardBag-new-li ordinary':item.rarity==1?'cardBag-new-li rare':item.rarity==2?'cardBag-new-li legend':'cardBag-new-li epic'" v-for="(item,key) in cardBagInfo.cardBagDetailsEntityList" :key="key">
                            <div class="cardBag-new-crystal">{{item.crystal}}</div>
                            <div class="cardBag-new-title">{{item.cardName}}</div>
                            <div class="cardBag-new-number">x {{item.number}}</div>
                        </div>
                    </div>

                </div>
            </mu-paper>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageIndex: 1,
            pageSize: 15,
            mycardBagList:[], //我的卡组
            mycardList:[], //我的卡牌
            dataListLoading: false,
            cardBagState: false, //当前卡组显示状态
            cardBagInfo: { //当前卡组信息
                bagName:"",
                cardBagDetailsEntityList:[]
            },
        }
    },
    mounted(){
        this.getDateList();
    },
    methods:{
        getDateList(){
            const loading = this.$loading();
            this.$http({
                url: this.$http.adornUrl("/cardbag/list"),
                method: "get",
                params: this.$http.adornParams({
                page: this.pageIndex,
                limit: this.pageSize,
                })
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    console.log(data.cardBagList)
                    this.mycardList = data.cardList;
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
                    this.mycardList = [];
                }
                loading.close();
            });
        },
        //关闭
        close(){
            this.$router.replace({ name: "home" });
        },
        addCard(key){ //添加卡牌
            var state = true;
            for(var i = 0;i<this.cardBagInfo.cardBagDetailsEntityList.length;i++){
                if(this.cardBagInfo.cardBagDetailsEntityList[i].cardId == this.mycardList[key].cardId&&this.cardBagInfo.cardBagDetailsEntityList[i].number==2){ //已超出
                    state = false;
                    this.$toast.message("同种类型的卡只可以放2张!");
                }else if(this.cardBagInfo.cardBagDetailsEntityList[i].cardId == this.mycardList[key].cardId&&this.cardBagInfo.cardBagDetailsEntityList[i].number==1){
                    this.cardBagInfo.cardBagDetailsEntityList[i].number = 2
                    state = false;
                }
            }
            if(state){
                var obj = {
                    cardId:this.mycardList[key].cardId,
                    crystal:this.mycardList[key].crystal,
                    cardName:this.mycardList[key].cardName,
                    rarity:this.mycardList[key].rarity,
                    number:1
                }
                this.cardBagInfo.cardBagDetailsEntityList.push(obj)
                for(var i=0;i<this.cardBagInfo.cardBagDetailsEntityList.length;i++){
                    for(var j = i + 1;j<this.cardBagInfo.cardBagDetailsEntityList.length;j++){
                        if(this.cardBagInfo.cardBagDetailsEntityList[i].crystal>this.cardBagInfo.cardBagDetailsEntityList[j].crystal){
                            var tmp = this.cardBagInfo.cardBagDetailsEntityList[i];
                            this.cardBagInfo.cardBagDetailsEntityList[i] = this.cardBagInfo.cardBagDetailsEntityList[j];
                            this.cardBagInfo.cardBagDetailsEntityList[j] = tmp;
                        }
                    }
                }
            }

        },
        newCardBag(){ //新建卡组
            this.cardBagState = true
            this.cardBagInfo= { //当前卡组信息
                cardBagId: 0,
                bagName:"",
                cardBagDetailsEntityList:[]
            }
        },
        updateCardBag(id){ //修改卡组
            this.cardBagState = true
            for(var i in this.mycardBagList){
                if(this.mycardBagList[i].cardBagId==id){
                    this.cardBagInfo= { //当前卡组信息
                        cardBagId: this.mycardBagList[i].cardBagId,
                        bagName:this.mycardBagList[i].bagName,
                        cardBagDetailsEntityList:this.mycardBagList[i].cardBagDetailsEntityList
                    }
                }
            }
            
        },
        saveCardBag(){ //保存卡组
            if(this.cardBagInfo.bagName==""){
                this.$toast.message("请输入卡包名称");
                return
            }
            var number = 0;
            var arr = ""
            for(var item in this.cardBagInfo.cardBagDetailsEntityList){
                number += this.cardBagInfo.cardBagDetailsEntityList[item].number
                if(arr){
                    arr += "-#-" + JSON.stringify(this.cardBagInfo.cardBagDetailsEntityList[item])
                }else{
                    arr = JSON.stringify(this.cardBagInfo.cardBagDetailsEntityList[item])
                }
            }
            // console.log(number)
            if(this.cardBagInfo.cardBagId==0){ //新增
                this.$http({
                    url: this.$http.adornUrl("/cardbag/save"),
                    method: "post",
                    data: this.$http.adornData({
                        bagName: this.cardBagInfo.bagName,
                        arr: arr,
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.$toast.message("保存成功");
                        this.cardBagState = false
                        this.getDateList()
                    } else {
                        this.$toast.message(data.msg);
                    }
                });
            }else{ //修改
                this.$http({
                    url: this.$http.adornUrl("/cardbag/update"),
                    method: "post",
                    data: this.$http.adornData({
                        bagName: this.cardBagInfo.bagName,
                        arr: arr,
                        cardBagId: this.cardBagInfo.cardBagId,
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.$toast.message("修改成功");
                        this.cardBagState = false
                        this.getDateList()
                    } else {
                        this.$toast.message(data.msg);
                    }
                });
            }
        },
        deleteCard(key){ //删除卡牌
            // console.log(key)
            if(this.cardBagInfo.cardBagDetailsEntityList[key].number==2){
                this.cardBagInfo.cardBagDetailsEntityList[key].number=1
            }else{
                this.cardBagInfo.cardBagDetailsEntityList.splice(key,1)
            }
        }
    }
}
</script>

<style>

</style>
