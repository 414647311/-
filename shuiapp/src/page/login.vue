<template>
  <div class="login-box">
    <h3>后台管理系统</h3>
    <div class="sub-title">管理员</div>
    <el-input v-model="user.name" placeholder="请输入管理员姓名"></el-input>
    <div class="sub-title">密码</div>
    <el-input :span="20" placeholder="请输入密码" v-model="user.pass" show-password></el-input>
    <div class="sub-title">级别</div>
    <el-select v-model="user.type" placeholder="请选择">
      <el-option v-for="item in options" :key="item.prop" :label="item.prop" :value="item.type"></el-option>
    </el-select>
    <el-button @click="login" type="">登录</el-button>
  </div>
</template>
<script>
import API from "../common/js/API";

export default {
    methods: {
        login(){
            this.$axios({
                url:API.login,
                method:'post',
                data:this.qs.stringify(this.user)
            }).then(res=>{
                
                this.$message({
                    message:res.data.info,
                    type:res.data.code==0?'success':'warning'
                });
                this.$router.replace('/index/'+this.user.type)
            }).catch(err=>{
                console.log(err);
                
            })
        }
    },
    data(){
        return {
            user:{
                name:'',
                pass:'',
                type:''
            },
            options:[
                {
                type:0,
                prop:'超级管理员'
            },
            {
                type:1,
                prop:'普通管理员'
            }
            ]
        }
    }
};
</script>
<style lang="stylus">
.login-box 
  width: 300px;
  height 400px
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  margin: auto
  background: #409EFF
  text-align: center
  padding: 0 40px
  border-radius 5px
  .el-button
        width 100px
        margin-top 15px
  .el-input
        width 300px
    .sub-title 
        margin: 10px 0
        text-align: left
</style>