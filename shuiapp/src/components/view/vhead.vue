<template>
  <el-row class="header clearfix" :gutter="20">
      <div class="left">
          <h2>柯基水站后台管理</h2>
      </div>
    <div class="right">
      <i><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571759663311&di=e2da42d86bed40cf1e9d526175331975&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201603%2F24%2F20160324235216_5RxmA.jpeg" alt=""></i>
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
.right i{
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
}
.right i img{
  width: 50px;
  height: 50px;
  vertical-align: top;
}
.header {
  height: 90px;
  background-color: #409eff;
  padding: 0 20px;
  width: 100%;
  margin-left: 0 !important;
}
</style>