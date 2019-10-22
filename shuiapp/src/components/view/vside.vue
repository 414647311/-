<template>
  <el-col class="side" :span="4">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu v-if="type" index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>管理员管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">权限</template>
          <el-menu-item index="1-1">
            <router-link to="/index/findManage">查看管理员</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu v-if="!type" index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>页面管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">权限</template>
          <el-menu-item index="1-1">
            <router-link to="/index/banner">banner</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/index/teacher">家教管理</router-link>
          </el-menu-item>
          <el-menu-item index="1-3">
            <router-link to="/index/banner">banner</router-link>
          </el-menu-item>
          <el-menu-item index="1-4">
            <router-link to="/index/banner">banner</router-link>
          </el-menu-item>
          <el-menu-item index="1-5">
            <router-link to="/index/banner">banner</router-link>
          </el-menu-item>
          <el-menu-item index="1-6">
            <router-link to="/index/banner">banner</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>
<script>
import API from "../../common/js/API";
export default {
  data() {
    return {
      type: ""
    };
  },
  mounted(){
      this.type=this.$route.params.type==0?true:false;
  }
  ,
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="stylus" scope>
.side {
  height: 889px;
  background: #409EFF;
}

.el-submenu__title i {
  color: #DFEFFF;
}
</style>