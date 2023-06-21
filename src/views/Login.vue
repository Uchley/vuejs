<template>
  <div class="form-wrapper">
   <h3>Login</h3>
   <form @submit.prevent="login" action="">
     <div v-if="errors" class="errors">
       <p v-for="(error, field) in errors" :key="field">{{ error[0] }}</p>
     </div>
     <input type="text" v-model="form.username" placeholder="username"><br>
     <input type="password" v-model="form.password" placeholder="password"><br>
     <button>Login</button>
     <router-link to="/register" class="link">Don't have account?</router-link>
   </form>
 </div>
 </template>
 
 <script>
 import axios from 'axios';
 import { assertExpressionStatement } from '@babel/types';
 import authService from "../services/auth.service";
 
 export default {
   name: "LoginPage",
   data(){
     return{
       form: {
         username: '',
         password: ''
       },
       errors: null
     }
   },
   methods: {
     async login(){
       console.log("Login", this.form);
       authService.login(this.form);
       const {success, errors} = await authService.login(this.form);
       if(success){
        this.$router.push({name:'home'})
       }else {
        this.errors = errors;
       }
     }
   }
 }
 </script>
 
 <style scoped>
  
 </style>