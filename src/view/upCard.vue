<template>
    <div class="upCard">
            <mu-paper class="upCard-card" :z-depth="5">
                <mu-form ref="form" :model="validateForm">
                    <mu-form-item label="卡牌名称" prop="cardName" :rules="cardNameRules">
                        <mu-text-field v-model="validateForm.cardName" prop="cardName"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item label="卡牌图片" help-text="暂时是输入框请去网上找找图片或联系作者加一下图片上传" prop="cardImg" :rules="cardImgRules">
                        <mu-text-field v-model="validateForm.cardImg" prop="cardImg"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item label="卡牌水晶耗量" prop="crystal" help-text="别乱写" :rules="crystalRules">
                        <mu-text-field v-model="validateForm.crystal" type="number" prop="crystal"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item label="卡牌类型" prop="type" :rules="typeRules">
                        <mu-radio v-model="validateForm.type" value="0" label="随从牌"></mu-radio>
                        <mu-radio v-model="validateForm.type" @click="openSpells" value="1" label="法术牌"></mu-radio>
                    </mu-form-item>
                    <mu-form-item v-if="validateForm.type=='0'" label="随从生命值" prop="life" :rules="lifeRules">
                        <mu-text-field v-model="validateForm.life" type="number" prop="life"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item v-if="validateForm.type=='0'" label="随从攻击力" prop="agg" :rules="aggRules">
                        <mu-text-field v-model="validateForm.agg" type="number" prop="agg"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item v-if="validateForm.type=='0'" label="随从攻击次数" help-text="用于风怒特性" prop="speed" :rules="speedRules">
                        <mu-text-field v-model="validateForm.speed" type="number" prop="speed"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item v-if="validateForm.type=='0'" label="随从牌的类型" prop="entType" :rules="entTypeRules">
                        <mu-radio v-model="validateForm.entType" value="0" label="普通"></mu-radio>
                        <mu-radio v-model="validateForm.entType" value="1" label="野兽"></mu-radio>
                    </mu-form-item>
                    <mu-form-item v-if="validateForm.type=='0'" label="随从牌的特殊类型" prop="specialType" :rules="specialTypeRules">
                        <mu-radio v-model="validateForm.specialType" value="0" label="无特殊类型"></mu-radio>
                        <mu-radio v-model="validateForm.specialType" value="1" label="冲锋"></mu-radio>
                        <mu-radio v-model="validateForm.specialType" value="2" label="嘲讽"></mu-radio>
                        <mu-radio v-model="validateForm.specialType" value="3" label="圣盾"></mu-radio>
                    </mu-form-item>
                    <mu-form-item label="稀有度" prop="rarity" :rules="rarityRules">
                        <mu-radio v-model="validateForm.rarity" value="0" label="普通"></mu-radio>
                        <mu-radio v-model="validateForm.rarity" value="1" label="稀有"></mu-radio>
                        <mu-radio v-model="validateForm.rarity" value="2" label="传说"></mu-radio>
                        <mu-radio v-model="validateForm.rarity" value="3" label="史诗"></mu-radio>
                    </mu-form-item>
                    <mu-form-item label="范围" prop="ranges" help-text="必须为随从才可自身" :rules="rangesRules">
                        <mu-radio v-model="validateForm.ranges" value="-1" label="无范围"></mu-radio>
                        <mu-radio v-model="validateForm.ranges" value="0" label="全场"></mu-radio>
                        <mu-radio v-model="validateForm.ranges" value="1" label="敌方全场"></mu-radio>
                        <mu-radio v-model="validateForm.ranges" value="2" label="我方全场"></mu-radio>
                        <mu-radio v-model="validateForm.ranges" value="3" label="敌方全体随从"></mu-radio>
                        <mu-radio v-model="validateForm.ranges" value="4" label="敌方单体随从"></mu-radio>
                        <mu-radio v-model="validateForm.ranges" value="5" label="敌方英雄"></mu-radio>
                        <mu-radio v-model="validateForm.ranges" value="6" label="我方全体随从"></mu-radio>
                        <mu-radio v-model="validateForm.ranges" value="7" label="我方单体随从"></mu-radio>
                        <mu-radio v-model="validateForm.ranges" value="8" label="我方英雄"></mu-radio>
                        <mu-radio v-model="validateForm.ranges" value="9" label="自身"></mu-radio>
                        <mu-radio v-model="validateForm.ranges" value="10" label="双方全场随从"></mu-radio>
                        <mu-radio v-model="validateForm.ranges" value="11" label="双方单体随从"></mu-radio>
                    </mu-form-item>
                    <mu-form-item label="时机" prop="oppor" help-text="限制随从才有其他效果，法术牌为0" :rules="opporRules">
                        <mu-radio v-model="validateForm.oppor" value="0" label="立即"></mu-radio>
                        <mu-radio v-model="validateForm.oppor" value="1" label="回合结束时"></mu-radio>
                        <mu-radio v-model="validateForm.oppor" value="2" label="回合开始时"></mu-radio>
                        <mu-radio v-model="validateForm.oppor" value="3" label="我方随从死亡时"></mu-radio>
                        <mu-radio v-model="validateForm.oppor" value="4" label="敌方随从死亡时"></mu-radio>
                    </mu-form-item>
                    <mu-form-item label="是否有影响" prop="isEffect" help-text="影响就是是否加血或扣血等意思" :rules="isEffectRules">
                        <mu-radio v-model="validateForm.isEffect" @click="closeEffect" value="0" label="无影响"></mu-radio>
                        <mu-radio v-model="validateForm.isEffect" value="1" label="有影响"></mu-radio>
                    </mu-form-item>
                    <mu-form-item v-if="validateForm.isEffect=='1'" label="影响的生命值" help-text="正就是加多少血，负就是减多少血" prop="effectLife" :rules="effectLifeRules">
                        <mu-text-field v-model="validateForm.effectLife" type="number" prop="effectLife"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item v-if="validateForm.isEffect=='1'" label="影响的攻击力" help-text="正就是加多少攻击，负就是减多少攻击" prop="effectAgg" :rules="effectAggRules">
                        <mu-text-field v-model="validateForm.effectAgg" type="number" prop="effectAgg"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item v-if="validateForm.isEffect=='1'" label="影响的攻击次数" help-text="正就是加多少次数，负就是减多少次数" prop="effectSpeed" :rules="effectSpeedRules">
                        <mu-text-field v-model="validateForm.effectSpeed" type="number" prop="effectSpeed"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item v-if="validateForm.isEffect=='1'" label="影响的卡牌类型" help-text="是否单独对某种类型生效" prop="effectAppoint" :rules="effectAppointRules">
                        <mu-radio v-model="validateForm.effectAppoint" value="0" label="所有类型"></mu-radio>
                        <mu-radio v-model="validateForm.effectAppoint" value="1" label="野兽"></mu-radio>
                    </mu-form-item>
                    <mu-form-item v-if="validateForm.isEffect=='1'" label="影响的随从牌的特殊类型" help-text="添加对应属性，如果已有的不添加" prop="effectSpecialType" :rules="effectSpecialTypeRules">
                        <mu-radio v-model="validateForm.effectSpecialType" value="0" label="无特殊类型"></mu-radio>
                        <mu-radio v-model="validateForm.effectSpecialType" value="1" label="冲锋"></mu-radio>
                        <mu-radio v-model="validateForm.effectSpecialType" value="2" label="嘲讽"></mu-radio>
                        <mu-radio v-model="validateForm.effectSpecialType" value="3" label="圣盾"></mu-radio>
                    </mu-form-item>
                    <mu-form-item v-if="validateForm.isEffect=='1'" label="影响是否突破" help-text="例如:回多少血和加多少血的区别" prop="effectBreach" :rules="effectBreachRules">
                        <mu-radio v-model="validateForm.effectBreach" value="0" label="不突破"></mu-radio>
                        <mu-radio v-model="validateForm.effectBreach" value="1" label="突破"></mu-radio>
                    </mu-form-item>
                    <mu-form-item label="卡牌关键字" help-text="例如:战吼 嘲讽 风怒" prop="keyword">
                        <mu-text-field v-model="validateForm.keyword" prop="keyword"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item label="卡牌介绍" help-text="显示的文字描述(别太长会隐藏的)" prop="introduce">
                        <mu-text-field v-model="validateForm.introduce" prop="introduce"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item>
                    <mu-button color="primary" @click="submit">提交</mu-button>
                    <mu-button @click="clear">重置</mu-button>
                    </mu-form-item>
                </mu-form>
            </mu-paper>
    </div>
</template>

<script>
export default {
    data(){
        return{
            cardNameRules: [
                { validate: (val) => !!val, message: '必须填写卡牌名称'},
                { validate: (val) => val.length >= 3, message: '卡牌名称长度大于3'}
            ],
            cardImgRules: [
                { validate: (val) => !!val, message: '必须填写卡牌图片'}
            ],
            crystalRules: [
                { validate: (val) => !!val, message: '必须填写卡牌水晶耗量'},
                { validate: (val) => val <= 20 && val >= 0, message: '水晶耗量长度错误'}
            ],
            typeRules: [
                { validate: (val) => !!val, message: '必须填写卡牌类型'}
            ],
            lifeRules: [
                { validate: (val) => !!val, message: '必须填写随从生命值'},
                { validate: (val) => val <= 20 && val >= 0, message: '生命值长度错误'}
            ],
            specialTypeRules: [
                { validate: (val) => !!val, message: '必须填写随从特殊类型'}
            ],
            aggRules: [
                { validate: (val) => !!val, message: '必须填写随从攻击力'},
                { validate: (val) => val <= 20 && val >= 0, message: '攻击力长度错误'}
            ],
            speedRules: [
                { validate: (val) => !!val, message: '必须填写随从攻击次数'},
                { validate: (val) => val <= 2 && val >= 1, message: '攻击次数错误'}
            ],
            entTypeRules: [
                { validate: (val) => !!val, message: '必须填写随从牌的类型'}
            ],
            rarityRules: [
                { validate: (val) => !!val, message: '必须填写卡牌的稀有度'}
            ],
            rangesRules: [
                { validate: (val) => !!val, message: '必须填写卡牌的范围'}
            ],
            opporRules: [
                { validate: (val) => !!val, message: '必须填写卡牌的时机'}
            ],
            isEffectRules: [
                { validate: (val) => !!val, message: '必须填写是否有影响'}
            ],
            effectLifeRules: [
                { validate: (val) => !!val, message: '必须填写影响的生命值'}
            ],
            effectAggRules: [
                { validate: (val) => !!val, message: '必须填写影响的攻击力'}
            ],
            effectSpeedRules: [
                { validate: (val) => !!val, message: '必须填写影响的攻击次数'}
            ],
            effectAppointRules: [
                { validate: (val) => !!val, message: '必须填写影响的卡牌类型'}
            ],
            effectBreachRules: [
                { validate: (val) => !!val, message: '必须填写影响是否突破'}
            ],
            effectSpecialTypeRules: [
                { validate: (val) => !!val, message: '必须填写影响随从特殊类型'}
            ],
            validateForm: {
                cardName: '',
                cardImg: '',
                crystal: '',
                type: '0',
                //---随从牌
                life: '0',
                agg: '0',
                speed: '1',
                entType: '0',
                specialType: '0',
                //---
                rarity: '0',
                ranges: '-1',
                oppor: '0',
                isEffect: '0',
                //---影响
                effectLife: '0',
                effectAgg: '0',
                effectAppoint: '0',
                effectSpeed: '0',
                effectBreach: '0',
                effectSpecialType: '0',
                //---
                keyword: '',
                introduce: '',
            }
        }
    },
    activated(){
        
    },
    methods:{
        //提交
        submit () {
            this.$refs.form.validate().then((result) => {
                if(result){
                    this.$http({
                        url: this.$http.adornUrl(`/card/save`),
                        method: "post",
                        data: this.$http.adornData({
                            cardName: this.validateForm.cardName,
                            cardImg: this.validateForm.cardImg,
                            crystal: this.validateForm.crystal,
                            type: this.validateForm.type,
                            life: this.validateForm.life,
                            agg: this.validateForm.agg,
                            speed: this.validateForm.speed,
                            entType: this.validateForm.entType,
                            specialType: this.validateForm.specialType,
                            rarity: this.validateForm.rarity,
                            ranges: this.validateForm.ranges,
                            oppor: this.validateForm.oppor,
                            isEffect: this.validateForm.isEffect,
                            effectLife: this.validateForm.effectLife,
                            effectAgg: this.validateForm.effectAgg,
                            effectSpeed: this.validateForm.effectSpeed,
                            effectAppoint: this.validateForm.effectAppoint,
                            effectBreach: this.validateForm.effectBreach,
                            effectSpecialType: this.validateForm.effectSpecialType,
                            keyword: this.validateForm.keyword,
                            introduce: this.validateForm.introduce,
                        })
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            this.$toast.message("提交成功");
                            this.$refs.form.clear();
                            this.validateForm = {
                                cardName: '',
                                cardImg: '',
                                crystal: '',
                                type: '0',
                                //---随从牌
                                life: '0',
                                agg: '0',
                                speed: '1',
                                entType: '0',
                                specialType: '0',
                                //---
                                rarity: '0',
                                ranges: '-1',
                                oppor: '0',
                                isEffect: '0',
                                //---影响
                                effectLife: '0',
                                effectAgg: '0',
                                effectSpeed: '0',
                                effectAppoint: '0',
                                effectBreach: '0',
                                effectSpecialType: '0',
                                //---
                                keyword: '',
                                introduce: '',
                            };
                        } else {
                            this.$toast.message(data.msg);
                        }
                    });
                }
            });
        },
        clear () {
            this.$refs.form.clear();
            this.validateForm = {
                cardName: '',
                cardImg: '',
                crystal: '',
                type: '0',
                //---随从牌
                life: '0',
                agg: '0',
                speed: '1',
                entType: '0',
                specialType: '0',
                //---
                rarity: '0',
                ranges: '-1',
                oppor: '0',
                isEffect: '0',
                //---影响
                effectLife: '0',
                effectAgg: '0',
                effectSpeed: '0',
                effectAppoint: '0',
                effectBreach: '0',
                effectSpecialType: '0',
                //---
                keyword: '',
                introduce: '',
            };
        },
        openSpells(){
            this.validateForm.life= '0';
            this.validateForm.agg= '0';
            this.validateForm.speed= '0';
            this.validateForm.entType= '0';
            this.validateForm.specialType= '0';
        },
        closeEffect(){
            this.validateForm.effectLife = '0' ;
            this.validateForm.effectAgg = '0';
            this.validateForm.effectSpeed = '0';
            this.validateForm.effectAppoint = '0';
            this.validateForm.effectBreach = '0';
            this.validateForm.effectSpecialType= '0';
        }
    }
}
</script>

<style>

</style>
