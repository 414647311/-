<template>
  <el-col class="main" :span="20">
    <h1>修改密码</h1>
    <el-form :model="form">
      <el-form-item label="名称">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="旧密码">
        <el-input v-model="form.oldpass"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="newpass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.newpass"></el-input>
      </el-form-item>
      <el-button type="primary" plain @click="change">修改</el-button>
    </el-form>
  </el-col>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      form: {
        name: "",
        oldpass: "",
        newpass: ""
      },
      newpass: ""
    };
  },
  mounted() {
    this.form.name = sessionStorage.getItem("name");
  },
  methods: {
    change() {
      this.$axios({
        url: API.changePassManage,
        method: "post",
        data: this.form
      })
        .then(res => {
          this.$message({
            message: res.data.info,
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
</style>
