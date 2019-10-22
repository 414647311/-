<template>
  <el-col class="side" :span="4">
    <el-menu
      
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
          <router-link to="/index/findManage">
            <el-menu-item index="1-1">查看管理员</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu v-if="!type" index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>页面管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">权限</template>
          <router-link to="/index/banner">
            <el-menu-item index="1-1">banner</el-menu-item>
          </router-link>
          <router-link to="/index/teacher">
            <el-menu-item index="1-2">家教管理</el-menu-item>
          </router-link>
          <router-link to="/index/waterstation">
            <el-menu-item index="1-3">水站管理</el-menu-item>
          </router-link>
          <router-link to="/index/repair">
            <el-menu-item index="1-4">维修管理</el-menu-item>
          </router-link>
          <router-link to="/index/Housekeeping">
            <el-menu-item index="1-5">家政管理</el-menu-item>
          </router-link>
          <router-link to="/index/userchange">
            <el-menu-item index="1-6">修改密码</el-menu-item>
          </router-link>
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
  mounted() {
    this.type = sessionStorage.getItem('type') == 0 ? true : false;
  },
  methods: {
    handleOpen(key, keyPath) {
     
    },
    handleClose(key, keyPath) {
    
    }
  }
};
</script>
<style lang="stylus" scope>
.side {
  height: 889px;
  background: #409EFF;
}
.el-menu-item{
  min-width 100 !important
}
.el-submenu__title i {
  color: #DFEFFF;
}
</style>