<template>
  <div id="default-layout">
    <Navbar :user="user"/>
    <router-view />
  </div>
</template>

<script>
import authService from '@/services/auth.service';
import Navbar from './Navbar.vue';

export default {
    name: "DefaultLayout",
    components: { Navbar },
    data(){
      return{
        user: {}
      }
    },
    async beforeMount(){
      this.user = await authService.getCurrentUser();
    }
}
</script>

<style lang="scss" scoped>
#default-layout{
  padding-top: 70px;
}
</style>