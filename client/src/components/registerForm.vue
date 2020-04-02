<template>
  <div style="width: 30%;margin: auto; margin-top: 10%">
    <h1 style="text-align: center">Register</h1>
    <form>
      <div class="form-group">
        <label for="exampleInputName">Full Name</label>
        <input required v-model="full_name" type="text" class="form-control" id="exampleInputName" />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          required
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
        <input
          required
          v-model="password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button type="submit" class="btn btn-primary" @click="registerForm()">Register</button>
      <span>or</span>
      <a @click.prevent="changeForm()" href>Login</a>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      full_name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    changeForm() {
      this.$router.push("/");
    },
    registerForm() {
      const obj = {
        full_name: this.full_name,
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("register", obj);
    }
  }
};
</script>

<style>
</style>