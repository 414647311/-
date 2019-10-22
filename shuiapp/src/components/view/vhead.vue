<template>
  <el-row class="header clearfix" :gutter="20">
      <div class="left">
          <h2>水库后台管理</h2>
      </div>
    <div class="right">
      <span class="login">欢迎你:{{user.name}}</span>
      <el-button @click="back" plain>退出</el-button>
    </div>
  </el-row>
</template>
<script>
import API from "../../common/js/API";
export default {
  mounted(){
    this.user.name= sessionStorage.getItem('name')
  },
  data() {
    return {
      activeIndex2: "1",
      user: {
        name: "admin"
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },back(){
      sessionStorage.clear()
      this.$router.replace('/')
    }
  }
};
</script>
<style>
.left{
    float: left;
    line-height: 90px;
    color: white
}
.right{
    float: right;
    line-height: 90px;
    color: white;
}
.right .login{
    margin-right: 20px;
}
.header {
  height: 90px;
  background-color: #409eff;
  padding: 0 20px;
  width: 100%;
  margin-left: 0 !important;
}
</style>