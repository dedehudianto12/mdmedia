<template>
  <div style="width: 30%;margin: auto; margin-top: 10%">
    <h1 style="text-align: center">Login</h1>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" />
      </div>
      <button @click="loginForm" type="submit" class="btn btn-primary">Login</button>
      <span>or</span>
      <a @click.prevent="changeForm()" href>Register</a>
      <!-- <button type="button" class="btn btn-primary" @click="changeForm()">Register</button> -->
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    changeForm() {
      this.$router.push("/register");
    },
    loginForm() {
      const obj = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", obj);
    }
  }
};
</script>

<style>
</style>