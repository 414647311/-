<template>
<transition name="el-fade-in-linear">
    <div>
        <v-head></v-head>
        <v-side></v-side>
        <transition name="el-fade-in-linear">
        <router-view></router-view>
        </transition>
    </div>
</transition>
</template>
<script>
import API from '../common/js/API';
import vHead from '../components/view/vhead.vue'
import vSide from '../components/view/vside.vue'
export default {
    components:{
        vHead,
        vSide
    }
}
</script>
<style>
</style>