<template>
    <div>
        <div class="login_content">
            <div v-if="state">
                登录
                <mu-form ref="form" :model="validateForm" class="mu-demo-form" label-position="left" label-width="80">
                    <mu-form-item prop="username" label="用户名" :rules="usernameRules">
                        <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item prop="password" label="密码" :rules="passwordRules">
                        <mu-text-field prop="password" v-model="validateForm.password" type="password" label-float></mu-text-field>
                    </mu-form-item>
                    <mu-form-item>
                        <mu-button color="primary" :ripple="true" @click="dataFromSubmit">登录</mu-button>
                        <mu-button color="primary" :ripple="true" @click="state=false">注册</mu-button>
                    </mu-form-item>
                </mu-form>
            </div>
            <div v-if="!state">
                注册
                <mu-form ref="form" :model="validateForm" class="mu-demo-form" label-position="left" label-width="80">
                    <mu-form-item prop="name" label="昵称" :rules="nameRules">
                        <mu-text-field v-model="validateForm.name" prop="name"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item prop="username" label="用户名" :rules="usernameRules">
                        <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item prop="password" label="密码" :rules="passwordRules">
                        <mu-text-field prop="password" v-model="validateForm.password" type="password" label-float></mu-text-field>
                    </mu-form-item>
                    <mu-form-item>
                        <mu-button color="primary" :ripple="true" @click="state=true">登录</mu-button>
                        <mu-button color="primary" :ripple="true" @click="dataFromSubmit">注册</mu-button>
                    </mu-form-item>
                </mu-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            nameRules: [
                { validate: (val) => !!val, message: '必须填写昵称'},
                { validate: (val) => val.length >= 3, message: '昵称长度必须大于3'}
            ],
            usernameRules: [
                { validate: (val) => !!val, message: '必须填写用户名'},
                { validate: (val) => val.length >= 3, message: '用户名长度必须大于3'}
            ],
            passwordRules: [
                { validate: (val) => !!val, message: '必须填写密码'},
                { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
            ],
            validateForm: {
                name: "",
                username:"",
                password: "",
            },
            state: true,
        }
    },
    created(){
        let token = this.$cookie.get('token')
        if (token || /\S/.test(token)) {
            this.$router.replace({ name: "home" });
        }
        this.getCaptcha()
    },
    computed: {
        userName: {
            get() {
                return this.$store.state.user.userName;
            },
            set(val) {
                this.$store.commit("user/updateUserName", val);
            }
        },
        // userId: {
        //     get() {
        //         return this.$store.state.user.userId;
        //     },
        //     set(val) {
        //         this.$store.commit("user/updateUserId", val);
        //     }
        // },
        money: {
            get() {
                return this.$store.state.user.money;
            },
            set(val) {
                this.$store.commit("user/updateMoney", val);
            }
        }
    },
    methods:{
        dataFromSubmit(){
            this.$refs.form.validate().then((result) => {
                if(result){
                    // this.$cookie.set("token", "dadadadadad");
                    // this.$router.replace({ name: "home" });
                    this.$http({
                        url: this.$http.adornUrl(`/user/${this.state?'login':'save'}`),
                        method: "post",
                        data: this.$http.adornData({
                        name: this.validateForm.name,
                        userName: this.validateForm.username,
                        password: this.validateForm.password,
                        })
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            this.$cookie.set("token", data.token);
                            this.$router.replace({ name: "home" });
                            this.userName = data.user.name;
                            // this.userId = data.user.userId;
                            this.money = data.user.money;
                        } else {
                            this.$toast.message(data.msg);
                        }
                    });
                }
            });
            
        },
        // 获取验证码
        getCaptcha() {
        // this.dataForm.uuid = getUUID();
        // this.captchaPath = this.$http.adornUrl(
        //     `/captcha.jpg?uuid=${this.dataForm.uuid}`
        // );
        }
    }
}
</script>

<style>

</style>
