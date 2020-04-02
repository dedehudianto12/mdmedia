<template>
  <div>
    <LoginForm @changeForm="changePage"></LoginForm>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";
export default {
  name: "Home",
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      login: true
    };
  },
  methods: {
    changePage(value) {
      this.login = value;
    }
  }
};
</script>
