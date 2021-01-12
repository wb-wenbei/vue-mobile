<template>
  <div class="login-content">
    <div class="background"></div>
    <div class="login-form">
      <van-form @submit="onLogin">
        <div style="padding: 8px 0">
          <van-field
            v-model="form.userName"
            label-width="50"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="form.password"
            type="password"
            label-width="50"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </div>

        <div class="form-item">
          <van-checkbox v-model="rememberMe" shape="square">
            自动登录
          </van-checkbox>
        </div>
        <div class="form-item">
          <van-button
            block
            class="default-btn border-radius-4"
            native-type="submit"
            :loading="loading"
            loading-type="spinner"
          >
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from "@/api/auth.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rememberMe: false,
      loading: false
    };
  },
  methods: {
    onLogin() {
      this.loading = true;
      loginAPI(this.form)
        .then(res => {
          this.$store.commit("SET_TOKEN", res.token);
          let customersArr = [];
          for (let prop in res.customers) {
            customersArr = [...customersArr, ...res.customers[prop]];
          }
          res.customers = customersArr;
          res.saveTime = new Date().getTime();
          this.$store.commit("SET_USER_INFO", res);
          this.$store.commit("SET_CUSTOMER_ID", res.rootGroupId);
          this.getPermissions();
          this.setRemember();
        })
        .catch(() => {
          this.$dialog.alert({
            title: "登录失败",
            message: "账号或密码错误，请重新输入!"
          });
          this.loading = false;
        });
    },
    async getPermissions() {
      await this.$store.dispatch("setPermission");
      this.loading = false;
      this.$router.push("/");
    },
    setRemember() {
      if (this.rememberMe) {
        //todo 自动登录逻辑处理
        console.log("自动登录");
      }
    }
  }
};
</script>

<style scoped lang="less">
.login-content {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: url("../../assets/login_bg.png") center / cover no-repeat;
  }

  .login-form {
    width: 100%;
    min-height: 200px;
    z-index: 2;
    background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    margin-bottom: 20%;
    padding: 16px 8px;

    .form-item {
      padding: 8px 16px;
    }
  }
}
</style>
