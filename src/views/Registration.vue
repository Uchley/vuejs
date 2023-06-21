<template>
  <div class="form-wrapper">
    <h3>Create new account</h3>
    <form @submit.prevent="register" action="">
      <div v-if="errors" class="errors">
        <p v-for="(error, field) in errors" :key="field">
          {{error[0]}}
        </p>
      </div>
      <input type="text" v-model="form.username" placeholder="username"><br>
      <input type="password" v-model="form.password" placeholder="password"><br>
      <input type="password" v-model="form.password_repeat" placeholder="repeat password"><br>
      <button>Register</button>
      <router-link to="/login" class="link">Already a member ?</router-link>
    </form>
  </div>
</template>

<script>
  import authService from "../services/auth.service";

  export default {
    name: "RegisterPage",
    data() {
      return {
        form: {
          username: '',
          password: '',
          password_repeat: ''
        },
        errors: null
      }
    },
    methods: {
      async register() {
        console.log(this.form);

        const {success, errors} = await authService.register(this.form);
        if (success) {
          this.$router.push({name: 'home'});
        } else {
          this.errors = errors;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>