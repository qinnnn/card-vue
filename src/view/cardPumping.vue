<template>
    <div class="cardBag">
            <mu-appbar color="primary" title="我的卡包">
            <mu-button slot="right" flat  @click="close">
                关闭
            </mu-button>
            </mu-appbar>
            <mu-paper class="cardPumping-right" :z-depth="0">
            </mu-paper>
            <mu-paper class="cardPumping-left" :z-depth="5">

                <mu-ripple class="cardPumping-shop" @click="shop" color="white">牌店</mu-ripple>
            </mu-paper>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageIndex: 0,
            pageSize: 10,
            mycardBagList:[],
            mycardList:[],
            dataListLoading: false,
        }
    },
    activated(){
        this.getDateList();
    },
    methods:{
        getDateList(){
            const loading = this.$loading();
            this.$http({
                url: this.$http.adornUrl("/hotel/selfhotel/list"),
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
        },
        shop(){
            this.$router.replace({ name: "shop" });
        }
    }
}
</script>

<style>

</style>
