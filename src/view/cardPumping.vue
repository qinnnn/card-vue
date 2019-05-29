<template>
    <div class="cardBag">
            <mu-appbar color="primary" title="我的卡牌">
            <mu-button slot="right" flat  @click="close">
                关闭
            </mu-button>
            </mu-appbar>
            <div class="cardBag-view">
                <mu-paper class="cardBag-left" :z-depth="0">
                </mu-paper>
                <mu-paper class="cardBag-right" :z-depth="5">
                </mu-paper>
            </div>
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
        }
    }
}
</script>

<style>

</style>
