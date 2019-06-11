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
                        <div v-if="itme.type==0" class="cardBag-cardInfo">
                            <div class="cardBag-crystal">{{itme.crystal}}</div>
                            <div class="cardBag-img" :style="'background-image: url('+itme.cardImg+')'"></div>
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
                <div class="cardBag-newBag">新建卡组</div>
            </mu-paper>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageIndex: 1,
            pageSize: 15,
            mycardBagList:[],
            mycardList:[],
            dataListLoading: false,
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
                    this.mycardBagList = data.cardBagList;
                    this.mycardList = data.cardList;
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
        }
    }
}
</script>

<style>

</style>
