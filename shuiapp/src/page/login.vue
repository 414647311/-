<template>
  <transition name="el-fade-in-linear">
    <div class="bg">
      <h3>柯基后台管理系统</h3>
      <div class="login-box">
        <div class="sub-title">管理员</div>
        <el-input v-model="user.name" placeholder="请输入管理员姓名"></el-input>
        <div class="sub-title">密码</div>
        <el-input :span="20" placeholder="请输入密码" v-model="user.pass" show-password></el-input>
        <div class="sub-title">级别</div>
        <el-select v-model="user.type" placeholder="请选择">
          <el-option v-for="item in options" :key="item.prop" :label="item.prop" :value="item.type"></el-option>
        </el-select>
        <el-button @click="login" type>登录</el-button>
      </div>
    </div>
  </transition>
</template>
<script>
import API from "../common/js/API";

export default {
  methods: {
    login() {
      this.$axios({
        url: API.login,
        method: "post",
        data: this.qs.stringify(this.user)
      })
        .then(res => {
          if (res.data.code == "0") {
            this.$message({
              message: res.data.info,
              type: "success"
            });
            sessionStorage.setItem("name", this.user.name);
            sessionStorage.setItem("type", this.user.type);
            this.$router.replace("/index/" + this.user.type);
          } else {
            this.$message({
              message: res.data.info,
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data() {
    return {
      user: {
        name: "",
        pass: "",
        type: ""
      },
      options: [
        {
          type: 0,
          prop: "超级管理员"
        },
        {
          type: 1,
          prop: "普通管理员"
        }
      ]
    };
  }
};
</script>
<style lang="stylus">
.login-box {
  width: 300px;
  height: 400px;
  position: absolute;
  top: -250px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #00d2ff;
  text-align: center;
  padding: 0 40px;
  border-radius: 15px;

  .el-button {
    width: 100px;
    margin-top: 15px;
  }

  .el-input {
    width: 300px;
  }

  .sub-title {
    margin: 10px 0;
    text-align: left;
  }
}

.bg {
  max-width: 1920px;
  height: 979px;
  background-color: #f5f1f0;
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571758561502&di=f37127395ebb1a6fd1b4e00d70ec4899&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fca3b1d05b545944f2c502e127d7b7c09794a4b8f.jpg'); // timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571758561502&di=f37127395ebb1a6fd1b4e00d70ec4899&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fca3b1d05b545944f2c502e127d7b7c09794a4b8f.jpg)
  background-position: 380px 260px;
  background-repeat: no-repeat;
}

.bg h3 {
  text-align: center;
  color: skyblue;
  font-size: 56px;
}
</style>