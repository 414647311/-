<template>
    <div>
        <v-head></v-head>
        <v-side></v-side>
        <router-view></router-view>
    </div>
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