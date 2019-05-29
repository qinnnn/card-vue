<template>
    <div class="home">
        <mu-paper class="home-paper" :z-depth="5">
            <mu-button color="info">对战模式</mu-button>
            <mu-button color="info">冒险模式</mu-button>
            <mu-button color="info">竞技模式</mu-button>
            <mu-button color="info">乱斗模式</mu-button>
        </mu-paper>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:"",
        }
    },
    created(){

    },
    methods:{
        dataFromSubmit(){
        },
    }
}
</script>

<style>

</style>
